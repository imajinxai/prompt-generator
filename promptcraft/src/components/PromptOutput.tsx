import { useState } from 'react';
import { ModelOption } from '../types';

interface PromptOutputProps {
  optimizedPrompt: string;
  selectedModel: ModelOption;
  onRegenerate: () => void;
}

export const PromptOutput: React.FC<PromptOutputProps> = ({
  optimizedPrompt,
  selectedModel,
  onRegenerate
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!optimizedPrompt) return;
    navigator.clipboard.writeText(optimizedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = optimizedPrompt.trim() ? optimizedPrompt.trim().split(/\s+/).length : 0;
  const tokenCount = Math.ceil(wordCount * 1.3);

  return (
    <div className="glass-panel rounded-3xl p-8 shadow-glass flex flex-col h-full min-h-[500px] relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#111617] tracking-tight flex items-center gap-2">
          Optimized Prompt
          <span className="material-symbols-outlined text-green-500/80 text-xl">check_circle</span>
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="size-10 flex items-center justify-center rounded-xl bg-white/50 border border-white/60 text-gray-600 hover:text-primary hover:bg-white transition-all" 
            title="Copy"
          >
            <span className="material-symbols-outlined text-xl">{copied ? 'check' : 'content_copy'}</span>
          </button>
          <button 
            onClick={onRegenerate}
            disabled={!optimizedPrompt}
            className="size-10 flex items-center justify-center rounded-xl bg-white/50 border border-white/60 text-gray-600 hover:text-primary hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
            title="Regenerate"
          >
            <span className="material-symbols-outlined text-xl">refresh</span>
          </button>
        </div>
      </div>

      <div className="flex-1 rounded-2xl bg-[#2e3440]/95 shadow-inner border border-white/10 p-1 relative overflow-hidden group/code max-h-[500px]">
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
        </div>
        
        <div className="h-full w-full overflow-y-auto custom-scrollbar p-6 pt-12">
          {optimizedPrompt ? (
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed">
              {optimizedPrompt}
            </pre>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4 opacity-60">
              <span className="material-symbols-outlined text-5xl">terminal</span>
              <p className="text-sm font-mono text-center max-w-[200px]">
                Your optimized, production-ready prompt will appear here...
              </p>
            </div>
          )}
        </div>

        {optimizedPrompt && (
          <div className="absolute bottom-4 right-4 opacity-0 translate-y-2 group-hover/code:opacity-100 group-hover/code:translate-y-0 transition-all duration-300">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-primary/90 hover:bg-primary text-white text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm transition-colors"
            >
              <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500 px-2 h-6">
        <span className="flex items-center gap-1">
          <span className={`w-1.5 h-1.5 rounded-full ${optimizedPrompt ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
          Model: {selectedModel} Optimized
        </span>
        
        {tokenCount > 0 && (
          <div className="flex items-center gap-3 animate-in fade-in duration-500">
             <span className="text-gray-400" title="Word count">
               {wordCount} words
             </span>
             <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50/50 text-blue-600/90 border border-blue-100/50 font-medium shadow-sm" title="Estimated token count (~1.3 tokens/word)">
               <span className="material-symbols-outlined text-[10px]">data_usage</span>
               ~{tokenCount} tokens
             </span>
          </div>
        )}
      </div>
    </div>
  );
};
