import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { getEstatisticas } from '@/lib/storage';

interface Stats {
  totalPacientes: number;
  totalMedicamentos: number;
  totalAdmin: number;
  adminHoje: number;
}

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    totalPacientes: 0,
    totalMedicamentos: 0,
    totalAdmin: 0,
    adminHoje: 0,
  });

  useEffect(() => {
    setStats(getEstatisticas());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="inicio" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="unigrande-stat-card">
            <div className="unigrande-stat-number">{stats.totalPacientes}</div>
            <div className="unigrande-stat-label">Pacientes Atendidos</div>
          </div>
          <div className="unigrande-stat-card">
            <div className="unigrande-stat-number">{stats.totalMedicamentos}</div>
            <div className="unigrande-stat-label">Medicamentos Cadastrados</div>
          </div>
          <div className="unigrande-stat-card">
            <div className="unigrande-stat-number">{stats.totalAdmin}</div>
            <div className="unigrande-stat-label">Total de Administrações</div>
          </div>
          <div className="unigrande-stat-card">
            <div className="unigrande-stat-number">{stats.adminHoje}</div>
            <div className="unigrande-stat-label">Administrações Hoje</div>
          </div>
        </div>

        {/* Cards de Informação */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="unigrande-card">
            <h2 className="text-2xl font-bold text-[#003D7A] mb-4 flex items-center gap-2">
              <span>📌</span> Sobre o Projeto
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>FARMA+VIDA DIGITAL</strong> é um site educativo e interativo desenvolvido para apoiar a adesão medicamentosa dos assistidos da instituição Pequeno Cotolengo de Palmas.
            </p>
            <p className="text-gray-700 mb-4 font-medium">Com esta ferramenta, familiares e cuidadores podem:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✅</span> Cadastrar pacientes e seus medicamentos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✅</span> Organizar horários de administração
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✅</span> Registrar cada dose administrada
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✅</span> Acompanhar o histórico terapêutico
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✅</span> Acessar orientações sobre uso correto de medicamentos
              </li>
            </ul>
          </div>

          <div className="unigrande-card">
            <h2 className="text-2xl font-bold text-[#003D7A] mb-4 flex items-center gap-2">
              <span>🏥</span> Instituição Parceira
            </h2>
            <p className="text-gray-700 mb-4 font-bold">
              Pequeno Cotolengo de Palmas - Obras de Dom Orione
            </p>
            <p className="text-gray-700 mb-4">
              Atende atualmente 15 assistidos, todos do sexo masculino, com idades entre 18 e 60 anos, apresentando condições como esquizofrenia, TEA, ansiedade e deficiência intelectual.
            </p>
            <div className="bg-blue-50 border-l-4 border-[#003D7A] p-4 rounded">
              <p className="text-sm text-gray-700 space-y-1">
                <div><strong>Telefone:</strong> (63) 98122-3889</div>
                <div><strong>Horário:</strong> 08:00 - 17:30</div>
                <div><strong>Endereço:</strong> ESQUINA COM A - ARSE 91, AV. LO, AV.NS 4, 21 - AL 09, Palmas - TO, 77023-350</div>
              </p>
            </div>
          </div>
        </div>

        {/* Seção de Bem-vindo */}
        <div className="unigrande-card mt-6 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-[#003D7A]">
          <h3 className="text-xl font-bold text-[#003D7A] mb-2">Bem-vindo ao FARMA+VIDA DIGITAL</h3>
          <p className="text-gray-700">
            Auxiliar de familiares e cuidados no acompanhamento dos medicamentos. Utilize o menu acima para navegar entre as funcionalidades do sistema.
          </p>
        </div>
      </div>
    </div>
  );
}
