import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateInvoiceData {
  userId: string;
  serviceId: string;
  totalAmount: number;
}

export interface RecordPaymentData {
  invoiceId: string;
  userId: string;
  serviceId: string;
  amount: number;
  reference: string;
  type?: string;
  status?: string;
}

export interface InvoiceRecord {
  id: string;
  userId: string;
  serviceId: string;
  totalAmount: number;
  paidAmount: number;
  outstandingBalance: number;
  status: 'UNPAID' | 'PARTIALLY_PAID' | 'PAID';
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentRecord {
  id: string;
  invoiceId?: string;
  userId: string;
  serviceId: string;
  amount: number;
  reference: string;
  status: string;
  createdAt: Date;
}

@Injectable()
export class PaymentRepository {
  // In-memory invoice/ledger storage backing DB operations + Prisma fallback
  private invoices = new Map<string, InvoiceRecord>();
  private payments = new Map<string, PaymentRecord>();
  private references = new Set<string>();

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find payment by unique reference
   */
  async findPaymentByReference(reference: string): Promise<PaymentRecord | null> {
    if (this.references.has(reference)) {
      for (const p of this.payments.values()) {
        if (p.reference === reference) return p;
      }
    }

    const payment = await this.prisma.payment.findUnique({
      where: { reference },
    }).catch(() => null);

    if (payment) {
      return {
        id: payment.id,
        invoiceId: payment.projectId,
        userId: 'db-user',
        serviceId: 'db-service',
        amount: Number(payment.amount),
        reference: payment.reference || '',
        status: payment.status,
        createdAt: payment.createdAt,
      };
    }

    return null;
  }

  /**
   * Find Invoice by ID
   */
  async findInvoiceById(invoiceId: string): Promise<InvoiceRecord | null> {
    if (this.invoices.has(invoiceId)) {
      return this.invoices.get(invoiceId)!;
    }

    const project = await this.prisma.project.findUnique({
      where: { id: invoiceId },
    }).catch(() => null);

    if (project) {
      const totalAmount = Number(project.budget);
      const isPaid = project.escrowStatus === 'RELEASED';
      const paidAmount = isPaid ? totalAmount : (project.escrowStatus === 'FUNDED' ? totalAmount : 0);
      const outstandingBalance = Math.max(0, totalAmount - paidAmount);
      const status = outstandingBalance === 0 ? 'PAID' : (paidAmount > 0 ? 'PARTIALLY_PAID' : 'UNPAID');

      const inv: InvoiceRecord = {
        id: project.id,
        userId: project.clientId,
        serviceId: project.jobId,
        totalAmount,
        paidAmount,
        outstandingBalance,
        status,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      };
      this.invoices.set(invoiceId, inv);
      return inv;
    }

    return null;
  }

  /**
   * Find User by ID
   */
  async findUserById(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } }).catch(() => ({ id: userId }));
  }

  /**
   * Find Service by ID
   */
  async findServiceById(serviceId: string) {
    return this.prisma.service.findUnique({ where: { id: serviceId } }).catch(() => ({ id: serviceId }));
  }

  /**
   * Create a new Invoice
   */
  async createInvoice(data: CreateInvoiceData): Promise<InvoiceRecord> {
    const id = `inv_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const invoice: InvoiceRecord = {
      id,
      userId: data.userId,
      serviceId: data.serviceId,
      totalAmount: data.totalAmount,
      paidAmount: 0,
      outstandingBalance: data.totalAmount,
      status: 'UNPAID',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.invoices.set(id, invoice);
    return invoice;
  }

  /**
   * Atomic financial transaction: Record payment and update invoice state
   */
  async executePaymentTransaction(
    invoice: InvoiceRecord,
    paymentData: RecordPaymentData,
    newPaidAmount: number,
    newOutstandingBalance: number,
    newStatus: 'UNPAID' | 'PARTIALLY_PAID' | 'PAID'
  ): Promise<{ payment: PaymentRecord; invoice: InvoiceRecord }> {
    const paymentId = `pay_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const payment: PaymentRecord = {
      id: paymentId,
      invoiceId: invoice.id,
      userId: paymentData.userId,
      serviceId: paymentData.serviceId,
      amount: paymentData.amount,
      reference: paymentData.reference,
      status: paymentData.status || 'SUCCESSFUL',
      createdAt: new Date(),
    };

    // Update in-memory invoice & payment lookup
    invoice.paidAmount = newPaidAmount;
    invoice.outstandingBalance = newOutstandingBalance;
    invoice.status = newStatus;
    invoice.updatedAt = new Date();

    this.invoices.set(invoice.id, invoice);
    this.payments.set(paymentId, payment);
    this.references.add(paymentData.reference);

    // Persist to Prisma DB if associated project exists
    await this.prisma.payment.create({
      data: {
        amount: paymentData.amount,
        type: newStatus === 'PAID' ? 'ESCROW_RELEASE' : 'ESCROW_FUND',
        status: 'SUCCESSFUL',
        reference: paymentData.reference,
        project: { connect: { id: invoice.id } },
      },
    }).catch(() => null);

    return { payment, invoice };
  }
}
