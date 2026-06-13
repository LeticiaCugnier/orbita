import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface OrbitalItem {
  id: string;
  label: string;
  angle: number;
  path: string;
  icon: string;
}

const orbitalItems: OrbitalItem[] = [
  { id: "dashboard", label: "Dashboard", angle: 0, path: "/", icon: "📊" },
  { id: "projects", label: "Projetos", angle: 60, path: "/projects", icon: "📁" },
  { id: "briefing", label: "Briefing", angle: 120, path: "/briefing", icon: "✍️" },
  { id: "budgets", label: "Orçamentos", angle: 180, path: "/budgets", icon: "💰" },
  { id: "contracts", label: "Contratos", angle: 240, path: "/contracts", icon: "📜" },
  { id: "client-area", label: "Área do Cliente", angle: 300, path: "/client-area", icon: "👥" },
];

const ORBIT_RADIUS = 200;
const CENTER_SIZE = 120;
const ITEM_SIZE = 80;

export default function Landing() {
  const { user, isAuthenticated, logout } = useAuth();
  const [, navigate] = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Auto-redirect to dashboard after login
      setTimeout(() => navigate("/"), 500);
    }
  }, [isAuthenticated, navigate]);

  const handleItemClick = (item: OrbitalItem) => {
    if (isAuthenticated) {
      navigate(item.path);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const calculatePosition = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * ORBIT_RADIUS;
    const y = Math.sin(rad) * ORBIT_RADIUS;
    return { x, y };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#303633] via-[#1a1d1b] to-[#0f1110] flex items-center justify-center p-4 overflow-hidden">
      {/* Background orbital animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[#8EE8CB] rounded-full animate-spin" style={{ animationDuration: "20s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-[#7EA2A4] rounded-full animate-spin" style={{ animationDuration: "30s", animationDirection: "reverse" }}></div>
      </div>

      {/* Main orbital container */}
      <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">
        {/* Orbital rings */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600">
          {/* Outer rings */}
          <circle cx="300" cy="300" r="250" fill="none" stroke="#8EE8CB" strokeWidth="1" opacity="0.2" />
          <circle cx="300" cy="300" r="220" fill="none" stroke="#7EA2A4" strokeWidth="1" opacity="0.15" />
          <circle cx="300" cy="300" r="190" fill="none" stroke="#9C7A97" strokeWidth="1" opacity="0.1" />

          {/* Connection lines from center to orbital items */}
          {orbitalItems.map((item) => {
            const pos = calculatePosition(item.angle);
            const x = 300 + (pos.x / ORBIT_RADIUS) * 200;
            const y = 300 + (pos.y / ORBIT_RADIUS) * 200;
            return (
              <line
                key={`line-${item.id}`}
                x1="300"
                y1="300"
                x2={x}
                y2={y}
                stroke={isAuthenticated ? "#8EE8CB" : "#7EA2A4"}
                strokeWidth="1"
                opacity={isAuthenticated ? "0.4" : "0.2"}
              />
            );
          })}
        </svg>

        {/* Orbital items */}
        {orbitalItems.map((item) => {
          const pos = calculatePosition(item.angle);
          const isDisabled = !isAuthenticated;
          const isHovered = hoveredItem === item.id;

          return (
            <div
              key={item.id}
              className="absolute transition-all duration-300"
              style={{
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
              }}
            >
              <button
                onClick={() => handleItemClick(item)}
                disabled={isDisabled}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300 ${
                  isDisabled
                    ? "bg-[#7EA2A4]/20 border-2 border-[#7EA2A4]/40 cursor-not-allowed opacity-50"
                    : isHovered
                      ? "bg-[#8EE8CB] border-2 border-[#8EE8CB] shadow-lg shadow-[#8EE8CB]/50 scale-110"
                      : "bg-[#9C7A97]/30 border-2 border-[#8EE8CB] hover:border-[#8EE8CB] shadow-lg shadow-[#9C7A97]/20"
                }`}
                onMouseEnter={() => !isDisabled && setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                title={item.label}
              >
                {item.icon}
              </button>

              {/* Label */}
              <div className="absolute top-full mt-3 whitespace-nowrap text-center pointer-events-none">
                <p className={`text-xs font-medium transition-colors ${isDisabled ? "text-[#7EA2A4]/50" : "text-[#8EE8CB]"}`}>
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}

        {/* Center circle - Login/Welcome */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div
            className={`relative w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${
              isAuthenticated
                ? "bg-gradient-to-br from-[#8EE8CB] to-[#7EA2A4] shadow-2xl shadow-[#8EE8CB]/50"
                : "bg-gradient-to-br from-[#9C7A97] to-[#8B8DA7] shadow-2xl shadow-[#9C7A97]/50 hover:shadow-2xl hover:shadow-[#8EE8CB]/50"
            }`}
          >
            {/* Animated border */}
            <div className="absolute inset-0 rounded-full border-2 border-[#FFF2B2] opacity-30 animate-pulse"></div>

            {/* Content */}
            <div className="text-center z-10">
              {isAuthenticated ? (
                <>
                  <p className="text-[#303633] font-bold text-lg">Bem-vindo!</p>
                  <p className="text-[#303633] text-sm font-semibold mt-1">{user?.name || "Designer"}</p>
                  <p className="text-[#303633]/70 text-xs mt-2">Clique em qualquer órbita</p>
                </>
              ) : (
                <>
                  <p className="text-[#303633] font-bold text-xl">Orbita</p>
                  <p className="text-[#303633]/80 text-xs mt-2">Gestão para Criativos</p>
                </>
              )}
            </div>
          </div>

          {/* Action button */}
          <div className="mt-8">
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="gap-2 border-[#8EE8CB] text-[#8EE8CB] hover:bg-[#8EE8CB]/10"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            ) : (
              <a href={getLoginUrl()}>
                <Button className="gap-2 bg-[#8EE8CB] text-[#303633] hover:bg-[#7EA2A4] font-bold px-8">
                  Entrar / Cadastrar
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Branding */}
      <div className="absolute bottom-8 left-8 right-8 text-center">
        <p className="text-[#8EE8CB]/60 text-sm">
          A plataforma de gestão inteligente para profissionais criativos
        </p>
      </div>
    </div>
  );
}
