import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { getVisitas } from '@/lib/storage';

interface Visita {
  id: number;
  data: string;
  situacao: 'Realizada' | 'Planejada';
  objetivo: string;
}

export default function Cronograma() {
  const [visitas, setVisitas] = useState<Visita[]>([]);

  useEffect(() => {
    setVisitas(getVisitas());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="cronograma" />

      <div className="container mx-auto px-4 py-8">
        <div className="unigrande-card">
          <h2 className="text-2xl font-bold text-[#003D7A] mb-2 flex items-center gap-2">
            <span>📅</span> Cronograma Atualizado
          </h2>
          <p className="text-gray-600 mb-6">
            <strong>Projeto:</strong> FARMA+VIDA DIGITAL<br/>
            <strong>Período:</strong> Março a Junho<br/>
            <strong>Local:</strong> Pequeno Cotolengo de Palmas – TO
          </p>

          <div className="overflow-x-auto">
            <table className="unigrande-table">
              <thead>
                <tr>
                  <th>Visita</th>
                  <th>Data</th>
                  <th>Situação</th>
                  <th>Objetivo</th>
                </tr>
              </thead>
              <tbody>
                {visitas.map((visita) => (
                  <tr key={visita.id}>
                    <td>
                      <span className="font-bold text-[#003D7A]">Visita {visita.id}</span>
                    </td>
                    <td className="font-medium">{visita.data}</td>
                    <td>
                      <span
                        className={`unigrande-badge ${
                          visita.situacao === 'Realizada'
                            ? 'unigrande-badge-success'
                            : 'unigrande-badge-warning'
                        }`}
                      >
                        {visita.situacao === 'Realizada' ? '✓' : '○'} {visita.situacao}
                      </span>
                    </td>
                    <td className="text-gray-700">{visita.objetivo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Timeline Visual */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-[#003D7A] mb-6">Timeline do Projeto</h3>
            <div className="space-y-4">
              {visitas.map((visita, idx) => (
                <div key={visita.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        visita.situacao === 'Realizada'
                          ? 'bg-[#28a745]'
                          : 'bg-[#FF9500]'
                      }`}
                    />
                    {idx < visitas.length - 1 && (
                      <div className="w-1 h-12 bg-gray-300 my-2" />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="font-bold text-gray-800">{visita.data}</div>
                    <div
                      className={`text-sm font-medium ${
                        visita.situacao === 'Realizada'
                          ? 'text-[#28a745]'
                          : 'text-[#FF9500]'
                      }`}
                    >
                      {visita.situacao}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{visita.objetivo}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
