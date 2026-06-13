import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center glow-animation">
              <span className="text-accent-foreground font-bold text-lg">O</span>
            </div>
            <span className="text-2xl font-bold font-['Space_Grotesk']">Orbita</span>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-center">Bem-vindo à Orbita</CardTitle>
            <CardDescription className="text-center">
              A plataforma de gestão para profissionais criativos
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-lg bg-accent/10">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-sm">Organize seus projetos</p>
                  <p className="text-xs text-muted-foreground">Dashboard inteligente com visão completa</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-lg bg-secondary/10">
                  <Sparkles className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Briefings com IA</p>
                  <p className="text-xs text-muted-foreground">Geração automática de documentos profissionais</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-lg bg-accent/10">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-sm">Contratos e aprovações</p>
                  <p className="text-xs text-muted-foreground">Gestão completa com seus clientes</p>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <Button asChild size="lg" className="w-full group">
              <a href={getLoginUrl()}>
                Entrar com Manus
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-card text-muted-foreground">Autenticação segura</span>
              </div>
            </div>

            {/* Info Text */}
            <p className="text-xs text-muted-foreground text-center">
              Ao entrar, você concorda com nossos Termos de Serviço e Política de Privacidade.
            </p>
          </CardContent>
        </Card>

        {/* Footer Text */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Primeira vez aqui?{" "}
          <span className="text-accent font-medium">Crie sua conta gratuitamente</span>
        </p>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-10 right-10 w-20 h-20 rounded-full border border-accent/20 float-animation opacity-50"></div>
      <div className="fixed top-1/4 left-10 w-12 h-12 rounded-full bg-secondary/10 float-animation opacity-30" style={{ animationDelay: "1s" }}></div>
    </div>
  );
}
