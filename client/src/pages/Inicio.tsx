import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface OrbitalItem {
  id: string;
  label: string;
  count: string;
  aro: number;
  angle: number;
  speed: number;
  path: string;
  icon: string;
  color: string;
}

function InicioContent() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const [time, setTime] = useState(0);

  useEffect(() => {
    let frame: number;

    const animate = () => {
      setTime(performance.now() / 1000);
      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  const orbitalItems: OrbitalItem[] = [
    {
      id: "client",
      label: "Clientes",
      count: "128",
      aro: 2,
      angle: 310,
      speed: 12,
      path: "/client-area",
      icon: "👥",
      color: "#59E7FF",
    },
    {
      id: "projects",
      label: "Projetos",
      count: "24",
      aro: 1,
      angle: 200,
      speed: 12,
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
      speed: -6,
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
      speed: -6,
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
      speed: -6,
      path: "/briefing",
      icon: "📋",
      color: "#FFCB6B",
    },
  ];

  return (
    <div className="space-y-6 rounded-3xl bg-[#0B0F17] p-6">
      <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-[#181A2E] via-[#111827] to-[#08232B] p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <Badge className="mb-4 bg-cyan-500/10 text-cyan-300 border border-cyan-400/40">
              Dashboard Orbita
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-white font-['Space_Grotesk']">
              Bem-vinda, {user?.name || "Letícia"} ✨
            </h1>

            <p className="text-slate-300 mt-3">
              O seu universo de gestão inteligente.
            </p>
          </div>

          <div className="hidden lg:flex gap-4">
            {orbitalItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => setLocation(item.path)}
                className="cursor-pointer rounded-xl bg-[#111620] border border-border/70 px-5 py-3 hover:border-[#8EE6D2]/50 transition-all"
              >
                <p className="text-xs text-slate-400">{item.label}</p>
                <h3 className="text-2xl font-bold text-white">{item.count}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card className="rounded-2xl border border-border/70 bg-[#111620] p-8 overflow-hidden">
        <div className="flex items-center justify-center h-[720px]">
          <svg width="1000" height="720" viewBox="0 0 1000 800">
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

            <circle
              cx="500"
              cy="400"
              r="95"
              fill="rgba(0,0,0,.8)"
              stroke="#8EE8CB"
              strokeWidth="2"
              style={{
                filter: "drop-shadow(0 0 50px #8EE8CB)",
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
              const radius = item.aro === 1 ? 180 : 320;
              const angle = item.angle + time * item.speed;
              const rad = (angle * Math.PI) / 180;
              const x = 500 + radius * Math.cos(rad);
              const y = 400 + radius * Math.sin(rad);

              return (
                <g
                  key={item.id}
                  onClick={() => setLocation(item.path)}
                  style={{ cursor: "pointer" }}
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
      </Card>
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