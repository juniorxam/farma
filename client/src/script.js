// Inicializar dados padrão
function initData() {
    if (!localStorage.getItem('pacientes')) {
        const pacientes = [
            { id: 1, nome: 'João da Silva', idade: 45, contato: '(63) 99999-1111', condicoes: 'Esquizofrenia grau I' },
            { id: 2, nome: 'Maria Oliveira', idade: 38, contato: '(63) 99999-2222', condicoes: 'TEA grau I' },
            { id: 3, nome: 'Carlos Santos', idade: 52, contato: '(63) 99999-3333', condicoes: 'Ansiedade' }
        ];
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
    }
    
    if (!localStorage.getItem('medicamentos')) {
        const medicamentos = [
            { id: 1, pacienteId: 1, nome: 'Risperidona', dose: '2mg', horarios: ['08:00', '20:00'] },
            { id: 2, pacienteId: 1, nome: 'Carbonato de Lítio', dose: '300mg', horarios: ['12:00'] },
            { id: 3, pacienteId: 2, nome: 'Aripiprazol', dose: '5mg', horarios: ['08:00'] },
            { id: 4, pacienteId: 3, nome: 'Sertralina', dose: '50mg', horarios: ['08:00'] }
        ];
        localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
    }
    
    if (!localStorage.getItem('registros')) {
        const hoje = new Date().toISOString().split('T')[0];
        localStorage.setItem('registros', JSON.stringify({}));
    }
}

// Carregar pacientes para selects
function carregarPacientesSelect(selectId) {
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const select = document.getElementById(selectId);
    if (select) {
        select.innerHTML = '<option value="">Selecione um paciente</option>';
        pacientes.forEach(p => {
            select.innerHTML += `<option value="${p.id}">${p.nome}</option>`;
        });
    }
}

// Listar pacientes na tabela
function listarPacientes() {
    const tbody = document.getElementById('listaPacientes');
    if (!tbody) return;
    
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    tbody.innerHTML = '';
    pacientes.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>${p.idade}</td>
                <td>${p.condicoes}</td>
                <td>${p.contato}</td>
            </tr>
        `;
    });
    
    const total = document.getElementById('totalPacientes');
    if (total) total.textContent = pacientes.length;
}

// Cadastrar paciente
function cadastrarPaciente(event) {
    event.preventDefault();
    
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const novoId = pacientes.length > 0 ? Math.max(...pacientes.map(p => p.id)) + 1 : 1;
    
    const paciente = {
        id: novoId,
        nome: document.getElementById('nomePaciente').value,
        idade: parseInt(document.getElementById('idadePaciente').value),
        condicoes: document.getElementById('condicoes').value,
        contato: document.getElementById('contatoPaciente').value
    };
    
    pacientes.push(paciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    
    alert('Paciente cadastrado com sucesso!');
    event.target.reset();
    listarPacientes();
    carregarPacientesSelect('pacienteMedicamento');
    carregarPacientesSelect('pacienteHistorico');
    carregarPacientesSelect('pacienteHorario');
}

// Cadastrar medicamento
function cadastrarMedicamento(event) {
    event.preventDefault();
    
    const medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];
    const novoId = medicamentos.length > 0 ? Math.max(...medicamentos.map(m => m.id)) + 1 : 1;
    
    const horariosStr = document.getElementById('horarios').value;
    const horarios = horariosStr.split(',').map(h => h.trim());
    
    const medicamento = {
        id: novoId,
        pacienteId: parseInt(document.getElementById('pacienteMedicamento').value),
        nome: document.getElementById('nomeMedicamento').value,
        dose: document.getElementById('dose').value,
        horarios: horarios
    };
    
    medicamentos.push(medicamento);
    localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
    
    alert('Medicamento cadastrado com sucesso!');
    event.target.reset();
    carregarHorarios();
}

// Carregar horários do dia
function carregarHorarios() {
    const container = document.getElementById('horariosContainer');
    if (!container) return;
    
    const pacienteId = document.getElementById('pacienteHorario')?.value;
    if (!pacienteId) {
        container.innerHTML = '<p>Selecione um paciente para ver os horários</p>';
        return;
    }
    
    const medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];
    const medicamentosPaciente = medicamentos.filter(m => m.pacienteId == pacienteId);
    const registros = JSON.parse(localStorage.getItem('registros')) || {};
    const hoje = new Date().toISOString().split('T')[0];
    
    if (medicamentosPaciente.length === 0) {
        container.innerHTML = '<p>Nenhum medicamento cadastrado para este paciente</p>';
        return;
    }
    
    let html = '<h3>Medicamentos e Horários de Hoje</h3>';
    
    medicamentosPaciente.forEach(med => {
        med.horarios.forEach(horario => {
            const key = `${pacienteId}_${med.id}_${horario}_${hoje}`;
            const administrado = registros[key];
            
            html += `
                <div class="horario-item">
                    <div class="horario-info">
                        <strong>${med.nome}</strong> - ${med.dose}<br>
                        Horário: ${horario}
                    </div>
                    <button onclick="administrarMedicamento(${pacienteId}, ${med.id}, '${horario}')" 
                            class="btn-admin" ${administrado ? 'disabled' : ''}>
                        ${administrado ? '✓ Administrado' : 'Marcar como Administrado'}
                    </button>
                </div>
            `;
        });
    });
    
    container.innerHTML = html;
}

// Administrar medicamento
function administrarMedicamento(pacienteId, medId, horario) {
    const hoje = new Date().toISOString().split('T')[0];
    const key = `${pacienteId}_${medId}_${horario}_${hoje}`;
    const registros = JSON.parse(localStorage.getItem('registros')) || {};
    
    registros[key] = {
        pacienteId: pacienteId,
        medId: medId,
        horario: horario,
        data: hoje,
        horaAdministracao: new Date().toLocaleTimeString()
    };
    
    localStorage.setItem('registros', JSON.stringify(registros));
    alert('Medicamento registrado como administrado!');
    carregarHorarios();
}

// Carregar histórico
function carregarHistorico() {
    const pacienteId = document.getElementById('pacienteHistorico')?.value;
    const container = document.getElementById('historicoContainer');
    
    if (!container || !pacienteId) return;
    
    const registros = JSON.parse(localStorage.getItem('registros')) || {};
    const medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const paciente = pacientes.find(p => p.id == pacienteId);
    
    if (!paciente) {
        container.innerHTML = '<p>Paciente não encontrado</p>';
        return;
    }
    
    const registrosPaciente = Object.values(registros).filter(r => r.pacienteId == pacienteId);
    
    if (registrosPaciente.length === 0) {
        container.innerHTML = '<p>Nenhum registro de administração encontrado</p>';
        return;
    }
    
    let html = `<h3>Histórico de ${paciente.nome}</h3>`;
    html += '<table><thead><tr><th>Data</th><th>Medicamento</th><th>Horário</th><th>Administrado às</th></tr></thead><tbody>';
    
    registrosPaciente.sort((a,b) => b.data.localeCompare(a.data)).forEach(reg => {
        const med = medicamentos.find(m => m.id == reg.medId);
        html += `
            <tr>
                <td>${reg.data}</td>
                <td>${med ? med.nome : 'N/A'} ${med ? med.dose : ''}</td>
                <td>${reg.horario}</td>
                <td>${reg.horaAdministracao || '-'}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Atualizar estatísticas na home
function atualizarHome() {
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];
    const registros = JSON.parse(localStorage.getItem('registros')) || {};
    
    document.getElementById('totalPacientesHome').textContent = pacientes.length;
    document.getElementById('totalMedicamentosHome').textContent = medicamentos.length;
    document.getElementById('totalAdminHome').textContent = Object.keys(registros).length;
    
    const hoje = new Date().toISOString().split('T')[0];
    const adminHoje = Object.values(registros).filter(r => r.data === hoje).length;
    document.getElementById('adminHojeHome').textContent = adminHoje;
}

// Inicializar
initData();