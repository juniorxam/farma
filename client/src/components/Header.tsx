import { Link } from 'wouter';

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  const navItems = [
    { href: '/', label: '🏠 Início', id: 'inicio' },
    { href: '/pacientes', label: '👥 Pacientes', id: 'pacientes' },
    { href: '/medicamentos', label: '💊 Medicamentos', id: 'medicamentos' },
    { href: '/horarios', label: '⏰ Horários', id: 'horarios' },
    { href: '/historico', label: '📋 Histórico', id: 'historico' },
    { href: '/orientacoes', label: '📚 Orientações', id: 'orientacoes' },
    { href: '/cronograma', label: '📅 Cronograma', id: 'cronograma' },
  ];

  return (
    <div className="unigrande-header sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Logo e Título */}
        <div className="py-4 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-2">
            {/* Logo UNIGRANDE */}
            <img 
              src="/manus-storage/LOGO CENTRO UNIVERSITARIO_92690dfa.jpeg" 
              alt="UNIGRANDE" 
              className="h-12 object-contain"
            />
            
            {/* Logo FARMA+VIDA */}
            <img 
              src="/manus-storage/FARMA VIDA_f3203c33.jpeg" 
              alt="FARMA+VIDA DIGITAL" 
              className="h-12 object-contain"
            />
          </div>
          <p className="text-sm text-gray-600 ml-0">Sistema de Acompanhamento Medicamentoso - Pequeno Cotolengo de Palmas</p>
        </div>

        {/* Navegação */}
        <nav className="flex flex-wrap gap-1 overflow-x-auto py-2">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <a
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors ${
                  currentPage === item.id
                    ? 'text-[#003D7A] bg-blue-50 border-b-2 border-[#003D7A]'
                    : 'text-gray-700 hover:text-[#003D7A] hover:bg-gray-50'
                }`}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
