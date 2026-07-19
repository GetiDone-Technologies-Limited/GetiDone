'use client';

import { useState } from 'react';
import { Modal } from '@/shared/components/ui/Modal';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { FileSignature, Sparkles, RefreshCcw, Send } from 'lucide-react';

interface ContractGeneratorModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (contractData: any) => void;
}

type Step = 'input' | 'generating' | 'review';

export function ContractGeneratorModal({ open, onClose, onSave }: ContractGeneratorModalProps) {
  const [step, setStep] = useState<Step>('input');
  
  // Input State
  const [project, setProject] = useState('');
  const [freelancer, setFreelancer] = useState('');
  const [amount, setAmount] = useState('');
  const [terms, setTerms] = useState('');

  // Edit State
  const [generatedText, setGeneratedText] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Handlers
  const handleGenerate = () => {
    setStep('generating');
    
    // Simulate initial AI Generation
    setTimeout(() => {
      const mockContract = `## FREELANCE SERVICES AGREEMENT\n\n**Date:** ${new Date().toLocaleDateString()}\n**Client:** GetiDone Corp\n**Freelancer:** ${freelancer || '[Freelancer Name]'}\n**Project:** ${project || '[Project Name]'}\n**Total Compensation:** $${amount || '0.00'}\n\n### 1. Services\nThe Freelancer agrees to perform the services described as follows: ${terms || 'Standard development and design services as agreed upon.'}\n\n### 2. Payment Terms\nPayment will be held in escrow and released upon milestone completion.\n\n### 3. Confidentiality\nThe Freelancer agrees to keep all project materials confidential.\n\n### 4. Revisions\nUp to 2 rounds of revisions are included in this agreement.`;
      
      setGeneratedText(mockContract);
      setStep('review');
    }, 2500);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    // Simulate AI regenerating based on prompt
    setTimeout(() => {
      setGeneratedText((prev) => prev + `\n\n### Additional Term\nAs requested: ${aiPrompt}`);
      setAiPrompt('');
      setIsRegenerating(false);
    }, 2000);
  };

  const handleSave = () => {
    onSave({
      title: project || 'New Project Agreement',
      freelancer: freelancer || 'Pending Assignment',
      project: project || 'TBD',
      amount: parseFloat(amount) || 0,
      status: 'Draft',
      date: new Date().toISOString().split('T')[0],
      content: generatedText,
    });
    // Reset state for next time
    setTimeout(() => {
      setStep('input');
      setProject('');
      setFreelancer('');
      setAmount('');
      setTerms('');
      setGeneratedText('');
    }, 300);
  };

  return (
    <Modal open={open} onClose={onClose} title="AI Contract Generator" size="lg">
      <div className="mt-2">
        {step === 'input' && (
          <div className="space-y-4">
            <p className="text-sm text-slate-500 mb-6">
              Enter the core details of your agreement. Our AI will automatically draft a professional, compliant contract based on your parameters.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Project Name" 
                placeholder="e.g. Mobile App Dev" 
                value={project} 
                onChange={(e) => setProject(e.target.value)} 
              />
              <Input 
                label="Freelancer Name" 
                placeholder="e.g. John Doe" 
                value={freelancer} 
                onChange={(e) => setFreelancer(e.target.value)} 
              />
            </div>
            <Input 
              label="Total Amount (USD)" 
              type="number" 
              placeholder="e.g. 5000" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">Custom Terms & Conditions</label>
              <textarea
                rows={3}
                placeholder="List any specific deliverables, deadlines, or IP requirements..."
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-[#00b259] focus:ring-2 focus:ring-[#00b259]/20 focus:outline-none transition-all"
              />
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleGenerate} leftIcon={<Sparkles className="w-4 h-4" />}>
                Generate Draft
              </Button>
            </div>
          </div>
        )}

        {step === 'generating' && (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-[#00b259]/10 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-8 h-8 text-[#00b259] animate-bounce" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Drafting your contract...</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                Analyzing standard legal clauses, compiling requirements, and formatting the document.
              </p>
            </div>
          </div>
        )}

        {step === 'review' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-3 text-amber-800 text-sm">
              <FileSignature className="w-5 h-5 shrink-0" />
              <p>Please review the generated draft. You can edit the text directly or prompt the AI below to make structural changes.</p>
            </div>

            <textarea
              value={generatedText}
              onChange={(e) => setGeneratedText(e.target.value)}
              className="w-full h-64 font-mono text-xs p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#00b259] focus:ring-2 focus:ring-[#00b259]/20 focus:outline-none transition-all custom-scrollbar"
            />

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Ask AI to Revise</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. Add a clause about intellectual property transfer..."
                  className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00b259] transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && aiPrompt && handleRegenerate()}
                />
                <Button 
                  onClick={handleRegenerate} 
                  loading={isRegenerating}
                  disabled={!aiPrompt}
                  variant="secondary"
                  className="shrink-0"
                >
                  {!isRegenerating && <RefreshCcw className="w-4 h-4 mr-2" />}
                  Revise
                </Button>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button 
                onClick={() => setStep('input')}
                className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Start Over
              </button>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} leftIcon={<Send className="w-4 h-4" />}>
                  Finalize & Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
