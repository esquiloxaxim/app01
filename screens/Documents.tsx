import React from 'react';
import { useNavigate } from 'react-router-dom';

const Documents = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 w-full max-w-md mx-auto px-4 py-6 flex flex-col gap-6">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-primary/5 dark:border-white/5 -mx-4 px-4 pb-2 pt-2">
        <div className="flex items-center justify-between h-14 w-full">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-primary dark:text-white"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-primary dark:text-white tracking-tight flex-1 text-center pr-10">Documentos</h1>
        </div>
      </header>

      {/* Stage Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-primary/80 dark:text-white/70 ml-1" htmlFor="stage-select">Selecione a Etapa</label>
        <div className="relative">
          <select 
            id="stage-select"
            className="w-full appearance-none bg-white dark:bg-white/5 border border-primary/20 dark:border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-base text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-white/50 transition-shadow cursor-pointer"
          >
            <option value="curitiba">Etapa Curitiba (Atual)</option>
            <option value="londrina">Etapa Londrina</option>
            <option value="maringa">Etapa Maringá</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-primary dark:text-white">
            <span className="material-symbols-outlined">expand_more</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-primary/5 dark:bg-white/5 rounded-xl p-4 border border-primary/10 dark:border-white/5">
        <p className="text-primary/90 dark:text-gray-200 text-sm leading-relaxed">
            Baixe, preencha e assine os documentos necessários para validar sua inscrição no circuito.
        </p>
      </div>

      {/* Download Buttons List */}
      <div className="flex flex-col gap-4 mt-2">
        <DownloadButton 
          icon="bed" 
          title="Termo de Hospedagem" 
          meta="PDF • 1.2 MB" 
        />
        <DownloadButton 
          icon="photo_camera" 
          title="Autorização de Imagem" 
          meta="PDF • 850 KB" 
        />
        <DownloadButton 
          icon="assignment" 
          title="Termo de Consentimento" 
          meta="PDF • 2.4 MB" 
        />
      </div>

      {/* Footer Note */}
      <footer className="p-6 text-center w-full mt-auto">
        <p className="text-xs text-primary/50 dark:text-white/40">
            Dúvidas? <a className="font-medium underline decoration-secondary text-primary dark:text-white hover:text-secondary dark:hover:text-secondary transition-colors" href="#">Entre em contato com a organização</a>
        </p>
        <div className="h-6"></div>
      </footer>
    </div>
  );
};

const DownloadButton = ({ icon, title, meta }: { icon: string, title: string, meta: string }) => (
  <button className="group relative w-full bg-primary hover:bg-primary-hover dark:bg-primary dark:hover:bg-primary-hover text-white rounded-xl p-4 flex items-center gap-4 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 text-secondary group-hover:bg-white/20 transition-colors">
      <span className="material-symbols-outlined text-[28px]">{icon}</span>
    </div>
    <div className="flex-1 text-left">
      <h3 className="font-bold text-lg leading-tight">{title}</h3>
      <p className="text-white/60 text-xs mt-0.5 font-light">{meta}</p>
    </div>
    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white group-hover:bg-white/10 transition-colors">
      <span className="material-symbols-outlined">download</span>
    </div>
  </button>
);

export default Documents;