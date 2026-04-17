import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Medicamento, getPacientes, getMedicamentos, addMedicamento, deleteMedicamento } from '@/lib/storage';
import { toast } from 'sonner';

export default function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    pacienteId: '',
    nome: '',
    dose: '',
    horarios: '',
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    setMedicamentos(getMedicamentos());
    setPacientes(getPacientes());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.pacienteId || !formData.nome || !formData.dose || !formData.horarios) {
      toast.error('Todos os campos são obrigatórios');
      return;
    }

    const horarios = formData.horarios.split(',').map((h) => h.trim());

    addMedicamento({
      pacienteId: parseInt(formData.pacienteId),
      nome: formData.nome,
      dose: formData.dose,
      horarios,
    });

    toast.success('Medicamento cadastrado com sucesso!');
    setFormData({ pacienteId: '', nome: '', dose: '', horarios: '' });
    carregarDados();
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja deletar este medicamento?')) {
      deleteMedicamento(id);
      toast.success('Medicamento deletado com sucesso!');
      carregarDados();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="medicamentos" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulário */}
          <div className="unigrande-card">
            <h2 className="text-2xl font-bold text-[#003D7A] mb-6 flex items-center gap-2">
              <span>➕</span> Novo Medicamento
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="unigrande-form-group">
                <label className="unigrande-form-label">Paciente *</label>
                <select
                  className="unigrande-form-input"
                  value={formData.pacienteId}
                  onChange={(e) => setFormData({ ...formData, pacienteId: e.target.value })}
                  required
                >
                  <option value="">Selecione um paciente</option>
                  {pacientes.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="unigrande-form-group">
                <label className="unigrande-form-label">Nome do Medicamento *</label>
                <input
                  type="text"
                  className="unigrande-form-input"
                  placeholder="Ex: Risperidona"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              <div className="unigrande-form-group">
                <label className="unigrande-form-label">Dose *</label>
                <input
                  type="text"
                  className="unigrande-form-input"
                  placeholder="Ex: 2mg, 5ml"
                  value={formData.dose}
                  onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
                  required
                />
              </div>
              <div className="unigrande-form-group">
                <label className="unigrande-form-label">Horários (separados por vírgula) *</label>
                <input
                  type="text"
                  className="unigrande-form-input"
                  placeholder="Ex: 08:00, 12:00, 20:00"
                  value={formData.horarios}
                  onChange={(e) => setFormData({ ...formData, horarios: e.target.value })}
                  required
                />
                <small className="text-gray-600 block mt-1">Digite os horários no formato 24h, separados por vírgula</small>
              </div>
              <button type="submit" className="unigrande-btn-primary w-full">
                ✅ Cadastrar Medicamento
              </button>
            </form>
          </div>

          {/* Lista */}
          <div className="unigrande-card">
            <h2 className="text-2xl font-bold text-[#003D7A] mb-6 flex items-center gap-2">
              <span>📋</span> Medicamentos Cadastrados
            </h2>
            <div className="overflow-x-auto">
              <table className="unigrande-table">
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Medicamento</th>
                    <th>Dose</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {medicamentos.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-gray-500">
                        Nenhum medicamento cadastrado
                      </td>
                    </tr>
                  ) : (
                    medicamentos.map((m) => {
                      const paciente = pacientes.find((p) => p.id === m.pacienteId);
                      return (
                        <tr key={m.id}>
                          <td>{paciente?.nome || 'N/A'}</td>
                          <td>{m.nome}</td>
                          <td>{m.dose}</td>
                          <td>
                            <button
                              onClick={() => handleDelete(m.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              🗑️ Deletar
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
