import { useLocation } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";

export default function Inicio() {
  const [, setLocation] = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: "📊", path: "/dashboard", color: "#8EE8CB" },
    { label: "Briefing", icon: "📋", path: "/briefing", color: "#7EA2A4" },
    { label: "Projetos", icon: "🎯", path: "/projects", color: "#8B8DA7" },
    { label: "Orçamentos", icon: "💰", path: "/budgets", color: "#9C7A97" },
    { label: "Contratos", icon: "📄", path: "/contracts", color: "#FFF2B2" },
    { label: "Área do Cliente", icon: "👥", path: "/client-area", color: "#8EE8CB" },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#8EE8CB] mb-4">Orbita</h1>
          <p className="text-gray-400 mb-12 text-lg">Bem-vindo à sua plataforma de gestão criativa</p>

          {/* Grid de opções */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => setLocation(item.path)}
                className="group relative p-6 rounded-lg border-2 border-gray-700 hover:border-[#8EE8CB] bg-gray-900/50 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"

              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-sm font-semibold text-gray-300 group-hover:text-[#8EE8CB] transition-colors">
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
