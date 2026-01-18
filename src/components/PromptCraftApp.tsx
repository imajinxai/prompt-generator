import { useState } from 'react';
import { Header } from './Header';
import { PromptInput } from './PromptInput';
import { PromptOutput } from './PromptOutput';
import { ModelOption } from '../types';
import { generateOptimizedPrompt } from '../services/geminiService';

export const PromptCraftApp: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [selectedModel, setSelectedModel] = useState<ModelOption>(ModelOption.GPT4o);
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!goal.trim()) return;

    setIsGenerating(true);
    try {
      // Get API key from environment or window object
      let apiKey = '';
      if (typeof window !== 'undefined' && (window as any).aistudio?.getApiKey) {
        apiKey = await (window as any).aistudio.getApiKey();
      } else {
        apiKey = import.meta.env.PUBLIC_GEMINI_API_KEY || '';
      }
      
      if (!apiKey) {
        setOptimizedPrompt('Error: No API key configured. Please set your Gemini API key.');
        return;
      }
      
      const result = await generateOptimizedPrompt(goal, selectedModel, apiKey);
      setOptimizedPrompt(result);
    } catch (error) {
      console.error(error);
      setOptimizedPrompt('Error generating prompt. Please ensure your API key is correctly configured.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-display text-[#3B4654] relative overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="ambient-blob w-[500px] h-[500px] bg-primary/10 top-[-100px] left-[-100px] rounded-full mix-blend-multiply"></div>
        <div className="ambient-blob w-[400px] h-[400px] bg-purple-300/10 bottom-[-50px] right-[-50px] rounded-full mix-blend-multiply animation-delay-2000"></div>
        <div className="ambient-blob w-[300px] h-[300px] bg-teal-200/20 top-[40%] left-[40%] rounded-full mix-blend-multiply animation-delay-4000"></div>
      </div>
      
      <Header />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <PromptInput
            goal={goal}
            setGoal={setGoal}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
          <PromptOutput
            optimizedPrompt={optimizedPrompt}
            selectedModel={selectedModel}
            onRegenerate={handleGenerate}
          />
        </div>
      </main>

      <footer className="w-full py-6 text-center text-gray-400 text-sm font-medium">
        <p>
          © 2024 PromptCraft. Powered by{' '}
          <a 
            href="https://imajinx.co" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary transition-colors duration-200"
          >
            ImajinX
          </a>.
        </p>
      </footer>
    </div>
  );
};
