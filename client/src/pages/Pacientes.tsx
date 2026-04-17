import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Paciente, getPacientes, addPaciente, deletePaciente, updatePaciente } from '@/lib/storage';
import { toast } from 'sonner';

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [formData, setFormData] = useState({ nome: '', idade: '', condicoes: '', contato: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    carregarPacientes();
  }, []);

  const carregarPacientes = () => {
    setPacientes(getPacientes());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.idade) {
      toast.error('Nome e idade são obrigatórios');
      return;
    }

    if (editingId) {
      updatePaciente(editingId, {
        nome: formData.nome,
        idade: parseInt(formData.idade),
        condicoes: formData.condicoes,
        contato: formData.contato,
      });
      toast.success('Paciente atualizado com sucesso!');
      setEditingId(null);
    } else {
      addPaciente({
        nome: formData.nome,
        idade: parseInt(formData.idade),
        condicoes: formData.condicoes,
        contato: formData.contato,
      });
      toast.success('Paciente cadastrado com sucesso!');
    }

    setFormData({ nome: '', idade: '', condicoes: '', contato: '' });
    carregarPacientes();
  };

  const handleEdit = (paciente: Paciente) => {
    setFormData({
      nome: paciente.nome,
      idade: paciente.idade.toString(),
      condicoes: paciente.condicoes,
      contato: paciente.contato,
    });
    setEditingId(paciente.id);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja deletar este paciente?')) {
      deletePaciente(id);
      toast.success('Paciente deletado com sucesso!');
      carregarPacientes();
    }
  };

  const handleCancel = () => {
    setFormData({ nome: '', idade: '', condicoes: '', contato: '' });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="pacientes" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulário */}
          <div className="unigrande-card">
            <h2 className="text-2xl font-bold text-[#003D7A] mb-6 flex items-center gap-2">
              <span>➕</span> {editingId ? 'Editar Paciente' : 'Novo Paciente'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="unigrande-form-group">
                <label className="unigrande-form-label">Nome completo *</label>
                <input
                  type="text"
                  className="unigrande-form-input"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              <div className="unigrande-form-group">
                <label className="unigrande-form-label">Idade *</label>
                <input
                  type="number"
                  className="unigrande-form-input"
                  value={formData.idade}
                  onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                  required
                />
              </div>
              <div className="unigrande-form-group">
                <label className="unigrande-form-label">Condições clínicas</label>
                <textarea
                  className="unigrande-form-input"
                  rows={2}
                  placeholder="Ex: Esquizofrenia grau I, TEA..."
                  value={formData.condicoes}
                  onChange={(e) => setFormData({ ...formData, condicoes: e.target.value })}
                />
              </div>
              <div className="unigrande-form-group">
                <label className="unigrande-form-label">Contato (responsável)</label>
                <input
                  type="text"
                  className="unigrande-form-input"
                  placeholder="Telefone"
                  value={formData.contato}
                  onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="unigrande-btn-primary flex-1">
                  ✅ {editingId ? 'Atualizar' : 'Cadastrar'} Paciente
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="unigrande-btn-danger flex-1"
                  >
                    ✕ Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Lista */}
          <div className="unigrande-card">
            <h2 className="text-2xl font-bold text-[#003D7A] mb-6 flex items-center gap-2">
              <span>📋</span> Lista de Pacientes
            </h2>
            <div className="mb-4 p-3 bg-blue-50 rounded text-sm text-gray-700">
              <strong>Total:</strong> {pacientes.length} paciente{pacientes.length !== 1 ? 's' : ''}
            </div>
            <div className="overflow-x-auto">
              <table className="unigrande-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pacientes.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4 text-gray-500">
                        Nenhum paciente cadastrado
                      </td>
                    </tr>
                  ) : (
                    pacientes.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div className="font-medium">{p.nome}</div>
                          <div className="text-xs text-gray-500">{p.condicoes}</div>
                        </td>
                        <td>{p.idade} anos</td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(p)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              ✏️ Editar
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              🗑️ Deletar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
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
