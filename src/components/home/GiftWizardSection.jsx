import { Calendar, User, Wallet, Diamond, Gift } from "lucide-react";

export default function GiftWizardSection() {
  const steps = [
    { num: "1", label: "OCCASION", icon: <Calendar className="h-5 w-5 mb-2 text-[#b58c49]" /> },
    { num: "2", label: "FOR WHOM", icon: <User className="h-5 w-5 mb-2 text-[#b58c49]" /> },
    { num: "3", label: "BUDGET", icon: <Wallet className="h-5 w-5 mb-2 text-[#b58c49]" /> },
    { num: "4", label: "STYLE", icon: <Diamond className="h-5 w-5 mb-2 text-[#b58c49]" /> },
  ];

  return (
    <div className="bg-[#fcfaf7] border border-gray-200 rounded-lg p-8 sm:p-10 shadow-sm h-full flex flex-col justify-between">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl tracking-widest text-[#2c2c2c] mb-2 uppercase">Find the Perfect Gift</h2>
        <p className="text-gray-600 text-sm">Answer a few simple questions and we'll help you find the ideal gift.</p>
      </div>

      <div className="flex justify-between items-center mb-10 w-full max-w-md mx-auto">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center w-full">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white border border-[#eaeaea] rounded-lg flex flex-col items-center justify-center shadow-sm relative mb-2">
                <span className="absolute top-1 left-2 text-[8px] text-gray-400 font-bold">{step.num}</span>
                {step.icon}
              </div>
              <span className="text-[10px] font-semibold text-gray-700 tracking-wider uppercase">{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className="flex-grow flex items-center justify-center -mt-6">
                <div className="w-4 h-px bg-gray-300"></div>
                <div className="w-1.5 h-1.5 border-t border-r border-gray-300 rotate-45"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-auto">
        <button className="inline-flex items-center gap-2 bg-black text-white px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors">
          <Gift className="h-4 w-4 text-[#b58c49]" />
          Find My Gift
        </button>
      </div>
    </div>
  );
}
