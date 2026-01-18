import { useState, useRef, useEffect } from 'react';
import { ModelOption } from '../types';

interface ModelSelectorProps {
  selectedModel: ModelOption;
  onSelect: (model: ModelOption) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredModels = Object.values(ModelOption).filter(model =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 bg-white/70 hover:bg-white backdrop-blur-md border rounded-full shadow-sm text-sm font-bold text-[#111617] transition-all group ${isOpen ? 'border-primary ring-2 ring-primary/20' : 'border-white/80'}`}
        type="button"
      >
        <span className="text-primary material-symbols-outlined text-lg">psychology</span>
        <span>{selectedModel}</span>
        <span className={`material-symbols-outlined text-gray-400 group-hover:text-gray-600 transition-transform duration-200 text-lg ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-3 w-72 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200 z-50 origin-bottom-right">
          <div className="p-3 border-b border-gray-100/50 bg-white/50">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60 material-symbols-outlined text-lg">search</span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 text-gray-700"
              />
            </div>
          </div>
          <div className="max-h-[125px] overflow-y-auto custom-scrollbar p-1.5 space-y-0.5">
            {filteredModels.length > 0 ? (
              filteredModels.map((model) => (
                <button
                  key={model}
                  onClick={() => {
                    onSelect(model);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                    selectedModel === model
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="truncate">{model}</span>
                  {selectedModel === model && (
                    <span className="material-symbols-outlined text-lg">check</span>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center flex flex-col items-center gap-2 text-gray-400">
                <span className="material-symbols-outlined text-2xl opacity-50">search_off</span>
                <span className="text-xs">No models found</span>
              </div>
            )}
          </div>
          <div className="px-3 py-2 bg-gray-50/50 border-t border-gray-100/50 text-[10px] text-gray-400 font-medium text-center">
            Select target architecture
          </div>
        </div>
      )}
    </div>
  );
};
