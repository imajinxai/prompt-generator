interface HeaderProps {
  onChangeKey?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onChangeKey }) => {
  const handleChangeKey = async () => {
    if (onChangeKey) {
      onChangeKey();
    } else if (typeof window !== 'undefined' && (window as any).aistudio) {
      try {
        await (window as any).aistudio.openSelectKey();
      } catch (e) {
        console.error("Failed to open key selection", e);
      }
    } else {
      alert("API Key selection is not available in this environment.");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="mx-auto max-w-7xl glass-panel rounded-2xl shadow-sm px-6 py-3 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-3 select-none">
          <div className="size-10 bg-gradient-to-br from-primary to-blue-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-2xl">auto_fix_high</span>
          </div>
          <h1 className="text-[#111617] text-xl font-bold tracking-tight">PromptCraft</h1>
        </div>
        <button 
          className="group flex items-center gap-2 px-5 h-10 bg-white/50 hover:bg-white border border-white/60 hover:border-primary/30 text-sm font-bold text-[#111617] rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
          onClick={handleChangeKey}
          title="Change Google AI Studio API Key"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-primary transition-colors"></span>
          <span>Change API Key</span>
        </button>
      </div>
    </header>
  );
};
