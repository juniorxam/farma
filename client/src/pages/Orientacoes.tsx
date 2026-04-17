import Header from '@/components/Header';

export default function Orientacoes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="orientacoes" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dicas para Adesão */}
          <div className="unigrande-card">
            <h2 className="text-2xl font-bold text-[#003D7A] mb-6 flex items-center gap-2">
              <span>💡</span> Dicas para Adesão ao Tratamento
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-[#FF9500] font-bold">✓</span>
                <span>
                  <strong>Estabeleça uma rotina:</strong> Tome os medicamentos sempre nos mesmos horários
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF9500] font-bold">✓</span>
                <span>
                  <strong>Use alarmes:</strong> Configure lembretes no celular para não esquecer os horários
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF9500] font-bold">✓</span>
                <span>
                  <strong>Organize os medicamentos:</strong> Use caixas organizadoras por dia da semana
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF9500] font-bold">✓</span>
                <span>
                  <strong>Comunique-se com o médico:</strong> Reporte qualquer efeito colateral ou dúvida
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF9500] font-bold">✓</span>
                <span>
                  <strong>Não interrompa o tratamento:</strong> Mesmo sentindo-se bem, continue conforme prescrito
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF9500] font-bold">✓</span>
                <span>
                  <strong>Armazene corretamente:</strong> Guarde em local fresco, seco e longe da luz solar
                </span>
              </li>
            </ul>
          </div>

          {/* Cuidados Importantes */}
          <div className="unigrande-card">
            <h2 className="text-2xl font-bold text-[#003D7A] mb-6 flex items-center gap-2">
              <span>⚠️</span> Cuidados Importantes
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">⚠</span>
                <span>
                  <strong>Não compartilhe medicamentos:</strong> Cada paciente deve usar apenas sua prescrição
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">⚠</span>
                <span>
                  <strong>Verifique a validade:</strong> Não use medicamentos vencidos
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">⚠</span>
                <span>
                  <strong>Interações medicamentosas:</strong> Informe ao médico sobre outros medicamentos em uso
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">⚠</span>
                <span>
                  <strong>Reações alérgicas:</strong> Procure atendimento médico imediatamente em caso de reação
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">⚠</span>
                <span>
                  <strong>Bebidas alcoólicas:</strong> Evite consumir álcool durante o tratamento
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">⚠</span>
                <span>
                  <strong>Gravidez e amamentação:</strong> Comunique ao médico se estiver grávida ou amamentando
                </span>
              </li>
            </ul>
          </div>

          {/* Contatos de Emergência */}
          <div className="unigrande-card lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#003D7A] mb-6 flex items-center gap-2">
              <span>📞</span> Contatos de Emergência
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-[#003D7A]">
                <h3 className="font-bold text-[#003D7A] mb-2">Pequeno Cotolengo</h3>
                <p className="text-sm text-gray-700 space-y-1">
                  <div><strong>Telefone:</strong> (63) 98122-3889</div>
                  <div><strong>Horário:</strong> 08:00 - 17:30</div>
                  <div><strong>Endereço:</strong> ESQUINA COM A - ARSE 91, AV. LO, AV.NS 4, 21 - AL 09, Palmas - TO, 77023-350</div>
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-[#003D7A]">
                <h3 className="font-bold text-[#003D7A] mb-2">Responsável Técnico</h3>
                <p className="text-sm text-gray-700">
                  <strong>Disponível:</strong> Durante horário comercial
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
                <h3 className="font-bold text-red-600 mb-2">Emergência Médica</h3>
                <p className="text-sm text-gray-700">
                  <strong>SAMU:</strong> 192
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
