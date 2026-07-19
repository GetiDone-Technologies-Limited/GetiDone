'use client';

import { useState } from 'react';
import { Modal } from '@/shared/components/ui/Modal';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { useAuthStore } from '@/store/auth.store';
import { FileSignature, Sparkles, RefreshCcw, Send } from 'lucide-react';

interface ContractGeneratorModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (contractData: any) => void;
}

type Step = 'input' | 'generating' | 'review';

export function ContractGeneratorModal({ open, onClose, onSave }: ContractGeneratorModalProps) {
  const { user } = useAuthStore();
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
      const clientName = user?.name || '[Client Name]';
      const mockContract = `## MASTER INDEPENDENT CONTRACTOR AGREEMENT

This Master Independent Contractor Agreement (the "Agreement") is entered into as of ${new Date().toLocaleDateString()} (the "Effective Date") by and between **${clientName}** (the "Client") and **${freelancer || '[Freelancer Name]'}** (the "Contractor").

### 1. ENGAGEMENT OF SERVICES
The Client hereby engages the Contractor, and the Contractor accepts such engagement, to provide the following professional services (the "Services") in connection with the project titled **${project || '[Project Name]'}**:
${terms || 'The Contractor shall perform design, development, and advisory services as mutually agreed upon by the parties, adhering to the highest industry standards of professional excellence.'}

### 2. COMPENSATION AND PAYMENT TERMS
In full consideration for the Services rendered, the Client shall pay the Contractor a total fee of **$${amount || '0.00'} USD**. 
All payments shall be held securely in escrow by the GetiDone Platform and released to the Contractor subject to the Client's approval of the corresponding deliverables or milestones.

### 3. INDEPENDENT CONTRACTOR RELATIONSHIP
The Contractor's relationship with the Client is that of an independent contractor, and nothing in this Agreement is intended to, or should be construed to, create a partnership, agency, joint venture, or employment relationship.

### 4. INTELLECTUAL PROPERTY RIGHTS
Upon receipt of full payment by the Contractor, all right, title, and interest in and to all deliverables, work product, and intellectual property created by the Contractor pursuant to this Agreement (the "Work Product") shall automatically vest in and become the sole property of the Client.

### 5. CONFIDENTIALITY AND NON-DISCLOSURE
The Contractor acknowledges that in the course of performing the Services, they may acquire access to confidential information of the Client. The Contractor agrees to maintain all such information in strict confidence and shall not disclose it to any third party without prior written consent.

### 6. WARRANTIES AND REPRESENTATIONS
The Contractor represents and warrants that all Work Product will be original, will not infringe upon the intellectual property rights of any third party, and will be performed in a diligent, professional, and workmanlike manner.

### 7. GOVERNING LAW AND DISPUTE RESOLUTION
This Agreement shall be governed by and construed in accordance with the laws of the applicable jurisdiction, without regard to its conflict of law principles. Any dispute arising out of this Agreement shall be resolved through binding arbitration administered by the GetiDone Arbitration Protocol.

**IN WITNESS WHEREOF**, the parties hereto have caused this Agreement to be executed as of the Effective Date.

**CLIENT:** ${clientName}
**CONTRACTOR:** ${freelancer || '[Freelancer Name]'}`;
      
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
