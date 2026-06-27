import { Moon, Sun, Mail, Lock, EyeOff } from "lucide-react";
import logo from "../imgs/logo.png";
import bg from "../imgs/fundo.png";
import { useTheme } from "@/contexts/ThemeContext";

export default function Login() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`
    relative min-h-screen overflow-hidden transition-colors duration-500
    ${theme === "dark"
          ? "bg-black text-white"
          : "bg-white text-slate-900"}
  `}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div
        className={`
    absolute inset-0 backdrop-blur-[1px]
    ${theme === "dark"
            ? "bg-black/40"
            : "bg-white/40"}
  `}
      />

      {/* Toggle */}
      {/* Toggle */}
      <div className="fixed top-4 right-6 z-50 md:top-6 md:right-10">
        <button
          onClick={toggleTheme}
          className={`
      flex items-center gap-3
      rounded-full
      px-4 py-3
      backdrop-blur-xl
      transition-all
      hover:scale-105

      ${theme === "dark"
              ? "bg-black/40 border border-white/20 text-white"
              : "bg-white/80 border border-slate-300 text-slate-900"}
    `}
        >
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}

          <span className="hidden sm:block">
            {theme === "dark" ? "Modo escuro" : "Modo claro"}
          </span>

          <div
            className={`h-3 w-3 rounded-full ${theme === "dark" ? "bg-cyan-400" : "bg-yellow-400"
              }`}
          />
        </button>
      </div>

      <div
        className="
    relative z-10
    mx-auto
    flex
    min-h-[100svh]
    max-w-7xl
    flex-col
    items-center
    justify-center
    gap-12
    px-6
    py-10
    lg:flex-row
    lg:justify-between
    lg:px-12
  "
      >
        {/* Left Side */}
        <div
          className="
    flex
    w-full
    max-w-3xl
    flex-col
    items-center
    justify-center
  "
        >
          <img
            src={logo}
            alt="Órbita"
            className="
w-[70%]
max-w-[650px]
object-contain
sm:w-[60%]
lg:w-full
"
          />

          <div
            className="
    hidden
    lg:grid
    mt-8
    w-full
    grid-cols-4
    gap-6
  "
          >
            <Feature
              title="CONECTE"
              desc="toda a operação"
              theme={theme}
            />
            <Feature
              title="ORGANIZE"
              desc="projetos e clientes"
              theme={theme}
            />

            <Feature
              title="AUTOMATIZE"
              desc="contratos e tarefas"
              theme={theme}
            />

            <Feature
              title="EVOLUA"
              desc="com IA"
              theme={theme}
            />
          </div>
        </div>

        {/* Login Card */}
        <div
          className={`
    w-full max-w-[600px]
    rounded-[32px]
    border
    p-6
    backdrop-blur-xl
    transition-all
    sm:p-8
    md:p-10
    lg:p-14

    ${theme === "dark"
              ? "bg-black/40 border-cyan-400/20 shadow-[0_0_50px_rgba(0,255,255,0.15)]"
              : "bg-white/70 border-slate-300 shadow-xl"}
  `}
        >
          <p className="mb-4 text-lg text-purple-300">
            Bem-vindo de volta! 👋
          </p>

          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Acesse sua conta
          </h1>

          <p className="mb-10 text-gray-400">
            Entre para continuar gerenciando sua operação
            de forma inteligente.
          </p>

          {/* Email */}
          <div
            className={`
    mb-5 flex items-center gap-3 rounded-xl px-5 py-4 transition

    ${theme === "dark"
                ? "border border-white/10"
                : "border border-slate-300 bg-white/60"}

    focus-within:border-cyan-400/60
  `}
          >
            <Mail size={20} />
            <input
              type="email"
              placeholder="E-mail"
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Password */}
          {/* Password */}
          <div
            className={`
    mb-3
    flex items-center gap-3
    rounded-xl
    px-5 py-4
    transition
    focus-within:border-cyan-400/60

    ${theme === "dark"
                ? "border border-white/10"
                : "border border-slate-300 bg-white/60"}
  `}
          >
            <Lock size={20} />

            <input
              type="password"
              placeholder="Senha"
              className="w-full bg-transparent outline-none"
            />

            <EyeOff size={20} />
          </div>

          <div className="mb-8 text-right">
            <a
              href="#"
              className="text-cyan-400 hover:text-cyan-300"
            >
              Esqueci minha senha
            </a>
          </div>

          {/* Login Button */}
          <button
            className="
              mb-10
              w-full
              rounded-xl
              py-5
              text-xl
              font-semibold
              bg-gradient-to-r
              from-cyan-400
              via-blue-400
              to-purple-500
              transition
              hover:scale-[1.02]
            "
          >
            Entrar
          </button>

          {/* Divider */}
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-gray-400">
              ou continue com
            </span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          {/* Social */}
          <div className="mb-5 grid grid-cols-2 gap-4">
            <button className="rounded-xl border border-white/15 py-4">
              Google
            </button>

            <button className="rounded-xl border border-white/15 py-4">
              Microsoft
            </button>
          </div>

          <button className="mb-10 w-full rounded-xl border border-white/15 py-4">
            Órbita ID (SSO)
          </button>

          <p className="text-center text-gray-400">
            Não tem uma conta?{" "}
            <a href="#" className="text-cyan-400">
              Fale com um administrador.
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
    relative
    z-10
    mt-8
    pb-8
    flex
flex-col
items-center
gap-3
md:flex-row
md:justify-center
md:gap-10
    px-6
    text-center
    text-sm
    text-gray-400
    md:gap-10
  "
      >
        <span>🔒 Segurança de nível empresarial</span>
        <span>🛡️ Seus dados protegidos</span>
        <span>✔ Conformidade LGPD</span>
      </div>
    </div >
  );
}

interface FeatureProps {
  title: string;
  desc: string;
  theme: "light" | "dark";
}

function Feature({ title, desc, theme }: FeatureProps){
return (
  <div className="text-center">
    <div
      className={`
    mx-auto mb-4 flex h-14 w-14
    items-center justify-center
    rounded-full border

    ${theme === "dark"
          ? "border-cyan-400/40 bg-black/30"
          : "border-cyan-500/30 bg-white/70"
        }
  `}
    >
      ✦
    </div>

    <h3 className="font-semibold tracking-wider">
      {title}
    </h3>

    <p
      className={`text-sm ${theme === "dark"
          ? "text-gray-400"
          : "text-slate-600"
        }`}
    >
      {desc}
    </p>
  </div>
);
}