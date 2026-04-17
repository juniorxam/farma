// Tipos de dados
export interface Paciente {
  id: number;
  nome: string;
  idade: number;
  condicoes: string;
  contato: string;
}

export interface Medicamento {
  id: number;
  pacienteId: number;
  nome: string;
  dose: string;
  horarios: string[];
}

export interface Registro {
  pacienteId: number;
  medId: number;
  horario: string;
  data: string;
  horaAdministracao: string;
}

export interface Visita {
  id: number;
  data: string;
  situacao: 'Realizada' | 'Planejada';
  objetivo: string;
}

// Inicializar dados padrão
export function initData() {
  if (!localStorage.getItem('pacientes')) {
    const pacientes: Paciente[] = [
      { id: 1, nome: 'João da Silva', idade: 45, contato: '(63) 99999-1111', condicoes: 'Esquizofrenia grau I' },
      { id: 2, nome: 'Maria Oliveira', idade: 38, contato: '(63) 99999-2222', condicoes: 'TEA grau I' },
      { id: 3, nome: 'Carlos Santos', idade: 52, contato: '(63) 99999-3333', condicoes: 'Ansiedade' }
    ];
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }
  
  if (!localStorage.getItem('medicamentos')) {
    const medicamentos: Medicamento[] = [
      { id: 1, pacienteId: 1, nome: 'Risperidona', dose: '2mg', horarios: ['08:00', '20:00'] },
      { id: 2, pacienteId: 1, nome: 'Carbonato de Lítio', dose: '300mg', horarios: ['12:00'] },
      { id: 3, pacienteId: 2, nome: 'Aripiprazol', dose: '5mg', horarios: ['08:00'] },
      { id: 4, pacienteId: 3, nome: 'Sertralina', dose: '50mg', horarios: ['08:00'] }
    ];
    localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
  }
  
  if (!localStorage.getItem('registros')) {
    localStorage.setItem('registros', JSON.stringify({}));
  }

  if (!localStorage.getItem('visitas')) {
    const visitas: Visita[] = [
      { id: 1, data: '10 de março', situacao: 'Realizada', objetivo: 'Conhecimento do local e público alvo' },
      { id: 2, data: '05 de abril', situacao: 'Realizada', objetivo: 'Apresentação do projeto' },
      { id: 3, data: '02 de maio', situacao: 'Planejada', objetivo: 'Apresentação do protótipo do site frormulários, funcionalidades públicas' },
      { id: 4, data: '14 de maio', situacao: 'Planejada', objetivo: 'Simulação dos toteates complementares e administições de' },
      { id: 5, data: 'Início de junho', situacao: 'Planejada', objetivo: 'Avaliação final e coleta de feedback' }
    ];
    localStorage.setItem('visitas', JSON.stringify(visitas));
  }
}

// Pacientes
export function getPacientes(): Paciente[] {
  return JSON.parse(localStorage.getItem('pacientes') || '[]');
}

export function addPaciente(paciente: Omit<Paciente, 'id'>): Paciente {
  const pacientes = getPacientes();
  const novoId = pacientes.length > 0 ? Math.max(...pacientes.map(p => p.id)) + 1 : 1;
  const novoPaciente = { ...paciente, id: novoId };
  pacientes.push(novoPaciente);
  localStorage.setItem('pacientes', JSON.stringify(pacientes));
  return novoPaciente;
}

export function updatePaciente(id: number, updates: Partial<Paciente>): void {
  const pacientes = getPacientes();
  const index = pacientes.findIndex(p => p.id === id);
  if (index !== -1) {
    pacientes[index] = { ...pacientes[index], ...updates };
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }
}

export function deletePaciente(id: number): void {
  const pacientes = getPacientes().filter(p => p.id !== id);
  localStorage.setItem('pacientes', JSON.stringify(pacientes));
  
  // Remover medicamentos associados
  const medicamentos = getMedicamentos().filter(m => m.pacienteId !== id);
  localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
}

// Medicamentos
export function getMedicamentos(): Medicamento[] {
  return JSON.parse(localStorage.getItem('medicamentos') || '[]');
}

export function addMedicamento(medicamento: Omit<Medicamento, 'id'>): Medicamento {
  const medicamentos = getMedicamentos();
  const novoId = medicamentos.length > 0 ? Math.max(...medicamentos.map(m => m.id)) + 1 : 1;
  const novoMedicamento = { ...medicamento, id: novoId };
  medicamentos.push(novoMedicamento);
  localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
  return novoMedicamento;
}

export function updateMedicamento(id: number, updates: Partial<Medicamento>): void {
  const medicamentos = getMedicamentos();
  const index = medicamentos.findIndex(m => m.id === id);
  if (index !== -1) {
    medicamentos[index] = { ...medicamentos[index], ...updates };
    localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
  }
}

export function deleteMedicamento(id: number): void {
  const medicamentos = getMedicamentos().filter(m => m.id !== id);
  localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
}

// Registros
export function getRegistros(): Record<string, Registro> {
  return JSON.parse(localStorage.getItem('registros') || '{}');
}

export function addRegistro(pacienteId: number, medId: number, horario: string): void {
  const hoje = new Date().toISOString().split('T')[0];
  const key = `${pacienteId}_${medId}_${horario}_${hoje}`;
  const registros = getRegistros();
  
  registros[key] = {
    pacienteId,
    medId,
    horario,
    data: hoje,
    horaAdministracao: new Date().toLocaleTimeString()
  };
  
  localStorage.setItem('registros', JSON.stringify(registros));
}

export function getEstatisticas() {
  const pacientes = getPacientes();
  const medicamentos = getMedicamentos();
  const registros = getRegistros();
  const hoje = new Date().toISOString().split('T')[0];
  
  const adminHoje = Object.values(registros).filter(r => r.data === hoje).length;
  
  return {
    totalPacientes: pacientes.length,
    totalMedicamentos: medicamentos.length,
    totalAdmin: Object.keys(registros).length,
    adminHoje
  };
}

// Visitas
export function getVisitas(): Visita[] {
  return JSON.parse(localStorage.getItem('visitas') || '[]');
}
