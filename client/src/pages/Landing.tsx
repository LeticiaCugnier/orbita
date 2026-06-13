import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";

interface MenuItem {
  id: string;
  label: string;
  angle: number;
  path: string;
  icon: string;
}

export default function Landing() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const menuItems: MenuItem[] = [
    { id: "briefing", label: "Criador de Briefing", angle: 45, path: "/briefing", icon: "📋" },
    { id: "dashboard", label: "Dashboard", angle: 135, path: "/", icon: "📊" },
    { id: "budget", label: "Orçamento", angle: 225, path: "/budgets", icon: "💰" },
    { id: "contracts", label: "Contratos", angle: 315, path: "/contracts", icon: "📄" },
    { id: "projects", label: "Gestão de Projetos", angle: 0, path: "/projects", icon: "🎯" },
    { id: "client", label: "Área do Cliente", angle: 270, path: "/client-area", icon: "👥" },
  ];

  const handleItemClick = (path: string) => {
    if (isAuthenticated) {
      setLocation(path);
    }
  };

  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center overflow-hidden relative">
      {/* Fundo com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8EE8CB]/5 via-transparent to-[#9C7A97]/5 pointer-events-none" />

      {/* SVG com órbitas */}
      <svg
        className="absolute w-full h-full max-w-4xl max-h-4xl"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Órbitas estáticas */}
        <circle cx="400" cy="400" r="120" fill="none" stroke="rgba(142, 232, 203, 0.15)" strokeWidth="1" />
        <circle cx="400" cy="400" r="200" fill="none" stroke="rgba(126, 162, 164, 0.1)" strokeWidth="1" />
        <circle cx="400" cy="400" r="280" fill="none" stroke="rgba(139, 141, 167, 0.08)" strokeWidth="1" />

        {/* Grupo de itens em órbita */}
        <g className="animate-orbit">
          {menuItems.map((item) => {
            const rad = (item.angle * Math.PI) / 180;
            const x = 400 + 280 * Math.cos(rad);
            const y = 400 + 280 * Math.sin(rad);

            return (
              <g key={item.id}>
                {/* Linha conectando ao centro */}
                <line
                  x1="400"
                  y1="400"
                  x2={x}
                  y2={y}
                  stroke="rgba(142, 232, 203, 0.1)"
                  strokeWidth="1"
                />
                {/* Item */}
                <g
                  onClick={() => handleItemClick(item.path)}
                  style={{ cursor: isAuthenticated ? "pointer" : "default" }}
                  className="hover:opacity-100 transition-opacity"
                  opacity={isAuthenticated ? 1 : 0.5}
                >
                  <rect
                    x={x - 60}
                    y={y - 25}
                    width="120"
                    height="50"
                    rx="25"
                    fill="rgba(15, 15, 15, 0.8)"
                    stroke={isAuthenticated ? "rgba(142, 232, 203, 0.6)" : "rgba(139, 141, 167, 0.3)"}
                    strokeWidth="2"
                    className="hover:stroke-[#8EE8CB] hover:stroke-[3px] transition-all"
                  />
                  <text
                    x={x}
                    y={y + 8}
                    textAnchor="middle"
                    fill={isAuthenticated ? "#f5f5f5" : "#a0a0a0"}
                    fontSize="12"
                    fontWeight="600"
                    fontFamily="'Space Grotesk', sans-serif"
                    className="pointer-events-none"
                  >
                    {item.label}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        {/* Centro - Logo e botão */}
        <circle cx="400" cy="400" r="100" fill="rgba(142, 232, 203, 0.05)" stroke="rgba(142, 232, 203, 0.6)" strokeWidth="3" />
        <circle cx="400" cy="400" r="95" fill="rgba(142, 232, 203, 0.02)" stroke="rgba(142, 232, 203, 0.3)" strokeWidth="1" />

        {/* Logo */}
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

        {/* Texto ou botão no centro */}
        {isAuthenticated ? (
          <>
            <text
              x="400"
              y="420"
              textAnchor="middle"
              fill="#a0a0a0"
              fontSize="12"
              fontFamily="'Inter', sans-serif"
            >
              Bem-vindo,
            </text>
            <text
              x="400"
              y="440"
              textAnchor="middle"
              fill="#f5f5f5"
              fontSize="14"
              fontWeight="600"
              fontFamily="'Space Grotesk', sans-serif"
            >
              {user?.name || "Designer"}
            </text>
          </>
        ) : (
          <g onClick={handleLogin} style={{ cursor: "pointer" }}>
            <rect
              x="330"
              y="410"
              width="140"
              height="40"
              rx="20"
              fill="#FFF2B2"
              className="hover:shadow-lg transition-all"
            />
            <text
              x="400"
              y="437"
              textAnchor="middle"
              fill="#0f0f0f"
              fontSize="14"
              fontWeight="700"
              fontFamily="'Space Grotesk', sans-serif"
              className="pointer-events-none"
            >
              Criar Briefing
            </text>
          </g>
        )}
      </svg>

      {/* Estilos de animação */}
      <style>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-orbit {
          animation: orbit 30s linear infinite;
          transform-origin: 400px 400px;
        }

        svg {
          filter: drop-shadow(0 0 30px rgba(142, 232, 203, 0.1));
        }
      `}</style>
    </div>
  );
}
