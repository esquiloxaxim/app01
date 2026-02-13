import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants';
import { supabase } from '../supabaseClient';

const Identification = () => {
  const navigate = useNavigate();
  const [docId, setDocId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!docId || docId.length < 3) {
      setErrorMsg('Digite um documento válido');
      return;
    }

    setLoading(true);

    try {
      // Busca na tabela 'athletes' pelo CPF
      const { data, error } = await supabase
        .from('athletes')
        .select('*')
        .eq('cpf', docId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 é o código para "nenhum resultado encontrado" no .single()
        console.error('Erro na busca:', error);
        setErrorMsg('Erro ao conectar com o banco de dados.');
      } else if (data) {
        // Atleta encontrado -> Vai para o perfil
        navigate('/profile', { state: { athlete: data } });
      } else {
        // Atleta não encontrado -> Vai para cadastro, passando o CPF digitado
        navigate('/registration', { state: { prefilledCpf: docId } });
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-md mx-auto w-full">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-secondary/10 dark:border-secondary/20">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => navigate(-1)}
            aria-label="Voltar" 
            className="flex items-center justify-center p-2 -ml-2 text-primary dark:text-secondary hover:bg-primary/5 dark:hover:bg-secondary/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
          </button>
          <h1 className="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight text-center flex-1 pr-10">
              Identificação
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 w-full">
        {/* Brand/Icon */}
        <div className="mb-8 p-6 bg-surface-light dark:bg-surface-dark rounded-full shadow-lg border border-secondary/10 dark:border-secondary/20">
          <div 
            className="w-16 h-16 bg-center bg-no-repeat bg-cover rounded-full" 
            style={{ 
                backgroundImage: `url("${IMAGES.kickIcon}")`, 
                filter: 'sepia(100%) hue-rotate(300deg) saturate(200%)' 
            }}
          >
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight">
              Informe seu documento
          </h2>
          <p className="text-secondary dark:text-secondary/80 text-base font-normal">
              Digite seu CPF ou RG para encontrar sua inscrição no circuito.
          </p>
        </div>

        {/* Form Area */}
        <form className="w-full space-y-6" onSubmit={handleSearch}>
          <div className="space-y-2">
            <label className="block text-slate-900 dark:text-slate-100 text-sm font-semibold ml-1" htmlFor="document-id">
                CPF ou RG
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-secondary/60 dark:text-secondary/40 text-[24px]">
                    badge
                </span>
              </div>
              <input 
                id="document-id" 
                type="tel" 
                value={docId}
                onChange={(e) => setDocId(e.target.value)}
                placeholder="000.000.000-00"
                className="block w-full pl-12 pr-12 py-4 bg-surface-light dark:bg-surface-dark border-2 border-secondary/20 dark:border-secondary/30 rounded-xl text-xl font-medium text-slate-900 dark:text-slate-100 placeholder-secondary/40 focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
              />
              {docId && (
                <button 
                  type="button"
                  onClick={() => setDocId('')}
                  aria-label="Limpar campo" 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-secondary/60 hover:text-primary dark:hover:text-slate-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">cancel</span>
                </button>
              )}
            </div>
            {errorMsg && <p className="text-red-500 text-sm ml-1">{errorMsg}</p>}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-primary hover:bg-primary-hover disabled:bg-gray-400 text-white font-bold text-lg rounded-xl shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">refresh</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[24px] group-hover:translate-x-1 transition-transform">search</span>
                Buscar Inscrição
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => navigate('/registration')} className="text-secondary hover:text-primary dark:text-secondary/80 dark:hover:text-slate-100 text-sm font-medium underline underline-offset-4 transition-colors">
              Não tenho cadastro ainda
          </button>
        </div>
      </main>
      
      {/* Decorative footer line */}
      <div className="h-2 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50"></div>
    </div>
  );
};

export default Identification;