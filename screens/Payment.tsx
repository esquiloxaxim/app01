import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants';

const Payment = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/profile');
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-input-border/50 dark:border-input-border-dark/50">
        <div 
          onClick={() => navigate(-1)}
          className="text-primary dark:text-slate-100 flex size-10 shrink-0 items-center justify-center rounded-full active:bg-primary/10 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Pagamento</h2>
      </header>

      {/* Main Content Scroll Area */}
      <main className="flex flex-col gap-6 p-4">
        {/* Context Card */}
        <section aria-label="Resumo da Inscrição">
          <div className="flex items-stretch justify-between gap-4 rounded-xl bg-surface-light dark:bg-surface-dark p-4 shadow-sm border border-input-border dark:border-input-border-dark">
            <div className="flex flex-col justify-center gap-1 flex-[2_2_0px]">
              <p className="text-primary dark:text-red-300 text-xs font-medium uppercase tracking-wider">Inscrição Confirmada</p>
              <p className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">Etapa Curitiba</p>
              <p className="text-secondary dark:text-orange-200 text-sm font-normal leading-relaxed mt-1">
                  Atleta: <span className="font-medium text-slate-900 dark:text-slate-100">João Silva</span><br/>
                  Categoria: <span className="font-medium text-slate-900 dark:text-slate-100">Adulto Graduado</span>
              </p>
            </div>
            <div 
              className="w-24 shrink-0 bg-center bg-no-repeat bg-cover rounded-lg aspect-square shadow-inner" 
              style={{ backgroundImage: `url("${IMAGES.paymentAbstract}")` }}
            >
            </div>
          </div>
        </section>

        {/* Pix Payment Details */}
        <section aria-label="Dados do Pix">
          <div className="flex items-center gap-2 mb-3 px-1">
            <span className="material-symbols-outlined text-primary dark:text-red-300">photos</span>
            <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">Pagamento via Pix</h3>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-input-border dark:border-input-border-dark overflow-hidden">
            {/* QR Code and Value */}
            <div className="flex flex-col items-center justify-center py-6 border-b border-input-border dark:border-input-border-dark bg-gradient-to-b from-transparent to-primary/5">
              <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
                <img 
                  alt="QR Code Pix" 
                  className="w-40 h-40 mix-blend-multiply opacity-90" 
                  src={IMAGES.pixQr}
                />
              </div>
              <p className="text-secondary dark:text-orange-200 text-sm mb-1">Valor Total</p>
              <p className="text-primary dark:text-white text-3xl font-bold tracking-tight">R$ 100,00</p>
            </div>
            {/* Beneficiary Info List */}
            <div className="p-4 grid grid-cols-[30%_1fr] gap-y-4 text-sm">
              <p className="text-secondary dark:text-orange-200 font-normal">Beneficiário</p>
              <p className="text-slate-900 dark:text-slate-100 font-medium text-right">ADMJ Associação Deixa O Menino Jogar</p>
              <div className="col-span-2 h-px bg-input-border dark:bg-input-border-dark"></div>
              <p className="text-secondary dark:text-orange-200 font-normal">CNPJ</p>
              <p className="text-slate-900 dark:text-slate-100 font-medium text-right">12.345.678/0001-90</p>
            </div>
            {/* Copy Paste Key */}
            <div className="p-4 pt-0">
              <label className="flex flex-col w-full">
                <span className="text-slate-900 dark:text-slate-100 text-sm font-medium pb-2">Copia e Cola</span>
                <div className="flex w-full items-stretch rounded-lg shadow-sm">
                  <input 
                    className="flex w-full min-w-0 flex-1 rounded-l-lg border border-r-0 border-input-border dark:border-input-border-dark bg-background-light dark:bg-background-dark text-secondary dark:text-orange-200 h-12 px-4 text-sm font-mono truncate focus:outline-none focus:ring-1 focus:ring-primary/50" 
                    readOnly 
                    value="00020126580014BR.GOV.BCB.PIX0136..."
                  />
                  <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 rounded-r-lg font-medium text-sm transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    Copiar
                  </button>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* Upload Receipt Section */}
        <section aria-label="Enviar Comprovante">
          <div className="flex items-center gap-2 mb-3 px-1 mt-2">
            <span className="material-symbols-outlined text-primary dark:text-red-300">upload_file</span>
            <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">Comprovante</h3>
          </div>
          <div className="relative group cursor-pointer">
            <input accept="image/*,.pdf" className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" type="file" />
            <div className="border-2 border-dashed border-input-border dark:border-input-border-dark group-hover:border-primary/50 dark:group-hover:border-primary/50 bg-surface-light dark:bg-surface-dark rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 group-hover:bg-primary/5">
              <div className="bg-primary/10 dark:bg-white/5 p-3 rounded-full mb-3 text-primary dark:text-red-300 group-hover:scale-110 transition-transform duration-200">
                <span className="material-symbols-outlined text-3xl">cloud_upload</span>
              </div>
              <p className="text-slate-900 dark:text-slate-100 font-medium text-base mb-1">Toque para enviar o comprovante</p>
              <p className="text-secondary dark:text-orange-200 text-sm">JPG, PNG ou PDF (Max. 5MB)</p>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-200">
            <span className="material-symbols-outlined text-base mt-0.5 shrink-0">info</span>
            <p>Após o envio, a organização validará seu pagamento em até 24h.</p>
          </div>
        </section>
      </main>

      {/* Sticky Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-input-border dark:border-input-border-dark z-40 safe-area-bottom">
        <div className="max-w-md mx-auto">
          <button 
            onClick={handleFinish}
            className="w-full bg-primary hover:bg-primary/90 active:bg-primary/95 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
          >
            <span>Enviar e Finalizar</span>
            <span className="material-symbols-outlined">check_circle</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;