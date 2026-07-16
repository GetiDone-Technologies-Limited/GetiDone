import { Injectable } from '@nestjs/common';

@Injectable()
export class PaystackService {
  /**
   * Mock Paystack transaction initialization API.
   */
  async initializePayment(email: string, amount: number): Promise<{
    status: boolean;
    message: string;
    data: { authorization_url: string; reference: string };
  }> {
    const reference = `pstk_${Math.random().toString(36).substring(2, 11)}`;
    return {
      status: true,
      message: 'Authorization URL created',
      data: {
        authorization_url: `https://checkout.paystack.com/${reference}`,
        reference,
      },
    };
  }

  /**
   * Mock Paystack verify transaction API.
   */
  async verifyTransaction(reference: string): Promise<boolean> {
    return true;
  }
}
