import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";

interface OrbitalItem {
  id: string;
  label: string;
  aro: number;
  angle: number;
  path: string;
  icon: string;
  color: string;
}

function InicioContent() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const orbitalItems: OrbitalItem[] = [
    { id: "dashboard", label: "Dashboard", aro: 1, angle: 0, path: "/dashboard", icon: "📊", color: "#8EE8CB" },
    { id: "briefing", label: "Briefing", aro: 1, angle: 60, path: "/briefing", icon: "📋", color: "#7EA2A4" },
    { id: "projects", label: "Projetos", aro: 1, angle: 120, path: "/projects", icon: "🎯", color: "#8B8DA7" },
    { id: "budgets", label: "Orçamentos", aro: 2, angle: 30, path: "/budgets", icon: "💰", color: "#9C7A97" },
    { id: "contracts", label: "Contratos", aro: 2, angle: 90, path: "/contracts", icon: "📄", color: "#FFF2B2" },
    { id: "client", label: "Cliente", aro: 2, angle: 150, path: "/client-area", icon: "👥", color: "#8EE8CB" },
  ];

  const handleItemClick = (path: string) => {
    setLocation(path);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center overflow-hidden relative p-4">
      {/* Fundo com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8EE8CB]/5 via-transparent to-[#9C7A97]/5 pointer-events-none" />

      {/* Container da órbita */}
      <div className="relative w-full max-w-2xl aspect-square">
        {/* SVG com órbitas */}
        <svg
          className="w-full h-full"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 0 30px rgba(142, 232, 203, 0.1))" }}
        >
          {/* Órbitas estáticas */}
          <circle cx="400" cy="400" r="150" fill="none" stroke="rgba(142, 232, 203, 0.15)" strokeWidth="1" />
          <circle cx="400" cy="400" r="250" fill="none" stroke="rgba(126, 162, 164, 0.1)" strokeWidth="1" />

          {/* Itens em órbita */}
          {orbitalItems.map((item) => {
            const radius = item.aro === 1 ? 150 : 250;
            const rad = (item.angle * Math.PI) / 180;
            const x = 400 + radius * Math.cos(rad);
            const y = 400 + radius * Math.sin(rad);

            return (
              <g key={item.id} onClick={() => handleItemClick(item.path)} style={{ cursor: "pointer" }}>
                {/* Linha conectando ao centro */}
                <line
                  x1="400"
                  y1="400"
                  x2={x}
                  y2={y}
                  stroke={`${item.color}40`}
                  strokeWidth="1"
                />
                {/* Bola */}
                <circle
                  cx={x}
                  cy={y}
                  r="40"
                  fill="rgba(15, 15, 15, 0.9)"
                  stroke={item.color}
                  strokeWidth="2"
                  className="hover:stroke-4 transition-all"
                />
                {/* Ícone */}
                <text
                  x={x}
                  y={y - 5}
                  textAnchor="middle"
                  fill={item.color}
                  fontSize="24"
                  fontFamily="'Space Grotesk', sans-serif"
                  className="pointer-events-none"
                >
                  {item.icon}
                </text>
                {/* Label */}
                <text
                  x={x}
                  y={y + 18}
                  textAnchor="middle"
                  fill="#f5f5f5"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="'Inter', sans-serif"
                  className="pointer-events-none"
                >
                  {item.label}
                </text>
              </g>
            );
          })}

          {/* Centro - Logo */}
          <circle cx="400" cy="400" r="80" fill="rgba(142, 232, 203, 0.05)" stroke="rgba(142, 232, 203, 0.6)" strokeWidth="3" />
          <circle cx="400" cy="400" r="75" fill="rgba(142, 232, 203, 0.02)" stroke="rgba(142, 232, 203, 0.3)" strokeWidth="1" />

          {/* Logo Orbita */}
          <text
            x="400"
            y="380"
            textAnchor="middle"
            fill="#8EE8CB"
            fontSize="48"
            fontWeight="700"
            fontFamily="'Space Grotesk', sans-serif"
          >
            Orbita
          </text>

          {/* Nome do usuário */}
          <text
            x="400"
            y="440"
            textAnchor="middle"
            fill="#a0a0a0"
            fontSize="12"
            fontFamily="'Inter', sans-serif"
          >
            Bem-vindo, {user?.name || "Designer"}
          </text>
        </svg>
      </div>

      {/* Instruções */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-gray-400">Clique em qualquer círculo para navegar</p>
      </div>
    </div>
  );
}

export default function Inicio() {
  return (
    <DashboardLayout>
      <InicioContent />
    </DashboardLayout>
  );
}
