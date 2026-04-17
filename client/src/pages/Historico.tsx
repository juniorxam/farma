import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { getPacientes, getMedicamentos, getRegistros } from '@/lib/storage';

export default function Historico() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [medicamentos, setMedicamentos] = useState<any[]>([]);
  const [pacienteId, setPacienteId] = useState('');
  const [registros, setRegistros] = useState<any[]>([]);

  useEffect(() => {
    setPacientes(getPacientes());
    setMedicamentos(getMedicamentos());
  }, []);

  const handlePacienteChange = (id: string) => {
    setPacienteId(id);
    carregarHistorico(id);
  };

  const carregarHistorico = (id: string) => {
    if (!id) {
      setRegistros([]);
      return;
    }

    const regs = getRegistros();
    const registrosPaciente = Object.values(regs)
      .filter((r: any) => r.pacienteId === parseInt(id))
      .sort((a: any, b: any) => b.data.localeCompare(a.data));

    setRegistros(registrosPaciente as any[]);
  };

  const getPacienteNome = (id: number) => {
    return pacientes.find((p) => p.id === id)?.nome || 'N/A';
  };

  const getMedicamentoInfo = (medId: number) => {
    const med = medicamentos.find((m) => m.id === medId);
    return med ? `${med.nome} ${med.dose}` : 'N/A';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="historico" />

      <div className="container mx-auto px-4 py-8">
        <div className="unigrande-card">
          <h2 className="text-2xl font-bold text-[#003D7A] mb-6 flex items-center gap-2">
            <span>📋</span> Histórico Medicamentoso
          </h2>

          <div className="mb-6">
            <label className="unigrande-form-label">Selecione um paciente</label>
            <select
              className="unigrande-form-input"
              value={pacienteId}
              onChange={(e) => handlePacienteChange(e.target.value)}
            >
              <option value="">Selecione um paciente</option>
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          {pacienteId && (
            <div>
              <h3 className="text-lg font-bold text-[#003D7A] mb-4">
                Histórico de {getPacienteNome(parseInt(pacienteId))}
              </h3>
              {registros.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Nenhum registro de administração encontrado</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="unigrande-table">
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Medicamento</th>
                        <th>Horário Previsto</th>
                        <th>Administrado às</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registros.map((reg: any, idx) => (
                        <tr key={idx}>
                          <td>{reg.data}</td>
                          <td>{getMedicamentoInfo(reg.medId)}</td>
                          <td>{reg.horario}</td>
                          <td>{reg.horaAdministracao || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
