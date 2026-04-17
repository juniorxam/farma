import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { getPacientes, getMedicamentos, getRegistros, addRegistro } from '@/lib/storage';
import { toast } from 'sonner';

export default function Horarios() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [medicamentos, setMedicamentos] = useState<any[]>([]);
  const [registros, setRegistros] = useState<any>({});
  const [pacienteId, setPacienteId] = useState('');
  const [horarios, setHorarios] = useState<any[]>([]);

  useEffect(() => {
    setPacientes(getPacientes());
    setMedicamentos(getMedicamentos());
    setRegistros(getRegistros());
  }, []);

  const handlePacienteChange = (id: string) => {
    setPacienteId(id);
    carregarHorarios(id);
  };

  const carregarHorarios = (id: string) => {
    if (!id) {
      setHorarios([]);
      return;
    }

    const meds = getMedicamentos().filter((m) => m.pacienteId === parseInt(id));
    const regs = getRegistros();
    const hoje = new Date().toISOString().split('T')[0];

    const horariosArray: any[] = [];
    meds.forEach((med) => {
      med.horarios.forEach((horario: string) => {
        const key = `${id}_${med.id}_${horario}_${hoje}`;
        horariosArray.push({
          pacienteId: parseInt(id),
          medId: med.id,
          medicamento: med.nome,
          dose: med.dose,
          horario,
          administrado: !!regs[key],
        });
      });
    });

    setHorarios(horariosArray.sort((a, b) => a.horario.localeCompare(b.horario)));
  };

  const handleAdministrar = (pacienteId: number, medId: number, horario: string) => {
    addRegistro(pacienteId, medId, horario);
    toast.success('Medicamento registrado como administrado!');
    carregarHorarios(pacienteId.toString());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="horarios" />

      <div className="container mx-auto px-4 py-8">
        <div className="unigrande-card">
          <h2 className="text-2xl font-bold text-[#003D7A] mb-6 flex items-center gap-2">
            <span>⏰</span> Acompanhar Administração
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
              <h3 className="text-lg font-bold text-[#003D7A] mb-4">Medicamentos de Hoje</h3>
              {horarios.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Nenhum medicamento cadastrado para este paciente</p>
              ) : (
                <div className="space-y-3">
                  {horarios.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <div className="font-bold text-gray-800">{item.medicamento}</div>
                        <div className="text-sm text-gray-600">
                          Dose: {item.dose} | Horário: <span className="font-medium">{item.horario}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAdministrar(item.pacienteId, item.medId, item.horario)}
                        disabled={item.administrado}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                          item.administrado
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'unigrande-btn-success hover:bg-green-600'
                        }`}
                      >
                        {item.administrado ? '✓ Administrado' : 'Marcar como Administrado'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
