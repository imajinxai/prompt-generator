import { ModelOption } from '../types';
import { ModelSelector } from './ModelSelector';

interface PromptInputProps {
  goal: string;
  setGoal: (value: string) => void;
  selectedModel: ModelOption;
  setSelectedModel: (model: ModelOption) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const QUICK_ACTIONS = [
  { label: 'Draft Email', text: 'Write a professional email to a client negotiating project timelines.' },
  { label: 'Code Helper', text: 'Create a React component for a responsive navigation bar with Tailwind CSS.' },
  { label: 'Blog Outline', text: 'Generate a comprehensive blog post outline about the future of AI agents.' }
];

export const PromptInput: React.FC<PromptInputProps> = ({
  goal,
  setGoal,
  selectedModel,
  setSelectedModel,
  onGenerate,
  isGenerating
}) => {
  const handleQuickAction = (text: string) => {
    setGoal(text);
  };

  return (
    <div className="glass-panel rounded-3xl p-8 shadow-glass flex flex-col h-full min-h-[500px] relative group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-50 rounded-t-3xl"></div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#111617] tracking-tight mb-2 flex items-center gap-2">
          Your Goal
          <span className="material-symbols-outlined text-primary/60 text-xl">edit_note</span>
        </h2>
        <p className="text-gray-500 text-base font-normal leading-relaxed">
          Describe what you need the AI to do in plain English. Be specific about the context and desired outcome.
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-4 relative z-10">
        <label className="flex-1 flex flex-col group/input relative">
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="glass-input form-textarea flex-1 w-full resize-none rounded-2xl text-[#111617] placeholder:text-gray-400 p-6 pb-16 text-lg font-normal leading-relaxed transition-all outline-none ring-0 focus:ring-0"
            placeholder="e.g., Write a confident email negotiating a salary increase for a senior developer role. Include 3 key achievements from the past year..."
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-end pointer-events-none">
            <div className="pointer-events-auto">
              <ModelSelector 
                selectedModel={selectedModel}
                onSelect={setSelectedModel}
              />
            </div>
          </div>
        </label>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar opacity-60 hover:opacity-100 transition-opacity">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              onClick={() => handleQuickAction(action.text)}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white/40 border border-white/60 text-xs font-medium hover:bg-white/80 transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200/50">
        <button
          onClick={onGenerate}
          disabled={!goal.trim() || isGenerating}
          className="relative w-full overflow-hidden rounded-xl h-14 bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-lg font-bold tracking-wide shadow-lg shadow-primary/25 transition-all active:scale-[0.98] group/btn"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out"></span>
          <div className="flex items-center justify-center gap-2">
            {isGenerating ? (
               <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
               <span className="material-symbols-outlined">auto_awesome</span>
            )}
            <span>{isGenerating ? 'Generating...' : 'Generate Prompt'}</span>
          </div>
        </button>
      </div>
    </div>
  );
};
