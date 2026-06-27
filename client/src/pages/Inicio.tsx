import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import spaceBg from "@/imgs/fundo.png";

interface OrbitalItem {
  id: string;
  label: string;
  count: string;
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
    {
      id: "client",
      label: "Clientes",
      count: "128",
      aro: 2,
      angle: 220,
      path: "/client-area",
      icon: "👥",
      color: "#59E7FF",
    },
    {
      id: "projects",
      label: "Projetos",
      count: "24",
      aro: 1,
      angle: 310,
      path: "/projects",
      icon: "📁",
      color: "#D76BFF",
    },
    {
      id: "contracts",
      label: "Contratos",
      count: "18",
      aro: 1,
      angle: 40,
      path: "/contracts",
      icon: "📄",
      color: "#9B5CFF",
    },
    {
      id: "budgets",
      label: "Orçamentos",
      count: "37",
      aro: 2,
      angle: 80,
      path: "/budgets",
      icon: "💲",
      color: "#3FFFD6",
    },
    {
      id: "briefing",
      label: "Briefings",
      count: "12",
      aro: 2,
      angle: 150,
      path: "/briefing",
      icon: "📋",
      color: "#FFCB6B",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
  className="absolute inset-0 bg-cover bg-no-repeat"
  style={{
    backgroundImage: `url(${spaceBg})`,
    backgroundPosition: "40% 50%",
  }}
/>

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      {/* Header */}
      <div className="absolute top-6 left-8 z-20">
        <h1 className="text-3xl font-bold text-white">
          Bem-vinda, {user?.name || "Letícia"} ✨
        </h1>

        <p className="text-gray-300">
          O seu universo de gestão inteligente
        </p>
      </div>

      {/* Órbita */}
      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <svg
          width="1000"
          height="800"
          viewBox="0 0 1000 800"
        >
          {/* Órbitas */}
          <circle
            cx="500"
            cy="400"
            r="180"
            fill="none"
            stroke="rgba(200,100,255,.35)"
            strokeWidth="2"
          />

          <circle
            cx="500"
            cy="400"
            r="320"
            fill="none"
            stroke="rgba(100,255,255,.25)"
            strokeWidth="2"
          />

          {/* Centro */}
          <circle
            cx="500"
            cy="400"
            r="95"
            fill="rgba(0,0,0,.8)"
            stroke="#8EE8CB"
            strokeWidth="2"
            style={{
              filter:
                "drop-shadow(0 0 50px #8EE8CB)",
            }}
          />

          <text
            x="500"
            y="410"
            textAnchor="middle"
            fill="#8EE8CB"
            fontSize="28"
            letterSpacing="8"
          >
            ORBITA
          </text>

          {orbitalItems.map((item) => {
            const radius =
              item.aro === 1 ? 180 : 320;

            const rad =
              (item.angle * Math.PI) / 180;

            const x =
              500 + radius * Math.cos(rad);

            const y =
              400 + radius * Math.sin(rad);

            return (
              <g
                key={item.id}
                onClick={() =>
                  setLocation(item.path)
                }
                style={{
                  cursor: "pointer",
                }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r="55"
                  fill="rgba(10,10,25,.9)"
                  stroke={item.color}
                  strokeWidth="2"
                  style={{
                    filter: `drop-shadow(0 0 20px ${item.color})`,
                  }}
                />

                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  fill={item.color}
                  fontSize="24"
                >
                  {item.icon}
                </text>

                <text
                  x={x}
                  y={y + 15}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                >
                  {item.label}
                </text>

                <text
                  x={x}
                  y={y + 32}
                  textAnchor="middle"
                  fill="#9ca3af"
                  fontSize="10"
                >
                  {item.count}
                </text>
              </g>
            );
          })}
        </svg>
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