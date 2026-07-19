'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Modal } from '@/shared/components/ui/Modal';
import { Button } from '@/shared/components/ui/Button';
import { Download, Printer } from 'lucide-react';

interface ContractPreviewModalProps {
  open: boolean;
  onClose: () => void;
  contract: any | null;
}

export function ContractPreviewModal({ open, onClose, contract }: ContractPreviewModalProps) {
  if (!contract) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal open={open} onClose={onClose} title={contract.title} size="xl">
      <div className="flex flex-col h-[75vh]">
        {/* Document Viewer Area */}
        <div className="flex-1 overflow-y-auto bg-slate-100 rounded-xl p-4 sm:p-8 custom-scrollbar border border-slate-200">
          <div className="bg-white shadow-sm border border-slate-200 p-8 sm:p-12 mx-auto max-w-3xl min-h-[800px] print-document">
            
            {/* Header / Meta */}
            <div className="border-b border-slate-200 pb-6 mb-8 print:border-black">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-slate-900 print:text-black">{contract.title}</h1>
                  <p className="text-sm text-slate-500 mt-1 print:text-black">Agreement ID: {contract.id}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider print:border print:border-black print:text-black
                    ${contract.status === 'Signed' ? 'bg-green-100 text-green-700' : 
                      contract.status === 'Pending Signature' ? 'bg-orange-100 text-orange-700' : 
                      'bg-slate-100 text-slate-600'}`}>
                    {contract.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Markdown Content */}
            <div className="prose prose-slate prose-sm sm:prose-base max-w-none prose-headings:font-serif print:text-black print:prose-headings:text-black">
              {contract.content ? (
                <ReactMarkdown>{contract.content}</ReactMarkdown>
              ) : (
                <div className="text-center text-slate-400 py-20 italic">
                  No content available for this contract.
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Footer Actions (Hidden during print) */}
        <div className="pt-4 flex justify-between items-center mt-auto border-t border-slate-100 print:hidden">
          <p className="text-xs text-slate-400 font-medium">Use the Download button to save a local PDF copy.</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button onClick={handlePrint} leftIcon={<Download className="w-4 h-4" />}>
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
