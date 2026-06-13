import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { Zap, Users, FileText, Clock, Lock, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">O</span>
            </div>
            <span className="text-xl font-bold font-['Space_Grotesk']">Orbita</span>
          </div>
          <Button asChild>
            <a href={getLoginUrl()}>Entrar</a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-block">
            <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm font-medium text-accent">
              ✨ A plataforma para profissionais criativos
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold font-['Space_Grotesk'] mb-6 leading-tight">
            Organize o caos criativo com{" "}
            <span className="bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent">
              Orbita
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A plataforma SaaS moderna que centraliza gestão de projetos, briefings, contratos e aprovações. 
            Tudo em um único lugar para designers, ilustradores e profissionais criativos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" asChild>
              <a href={getLoginUrl()}>Começar Agora</a>
            </Button>
            <Button size="lg" variant="outline">
              Conhecer Recursos
            </Button>
          </div>

          {/* Decorative Element */}
          <div className="relative h-64 flex items-center justify-center opacity-30">
            <div className="absolute w-48 h-48 rounded-full border border-accent/50"></div>
            <div className="absolute w-32 h-32 rounded-full border border-secondary/50 orbit-animation"></div>
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-accent to-secondary"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-['Space_Grotesk'] mb-4">Funcionalidades Principais</h2>
            <p className="text-lg text-muted-foreground">Tudo que você precisa para gerenciar seus projetos criativos</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border/50 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <CardTitle>Dashboard Inteligente</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Visão geral completa de seus projetos em andamento, pendências, próximas entregas e status dos jobs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <FileText className="w-5 h-5 text-secondary" />
                  </div>
                  <CardTitle>Criador de Briefings com IA</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Fluxo guiado com IA que gera automaticamente briefings profissionais formatados.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <CardTitle>Gestão de Etapas</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Organize projetos em etapas com visualização Kanban ou Timeline. De briefing até entrega.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <CardTitle>Área do Cliente</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Compartilhe peças, receba aprovações e gerencie comentários com seus clientes em um único espaço.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Lock className="w-5 h-5 text-accent" />
                  </div>
                  <CardTitle>Gestão de Contratos</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Modelos prontos, personalização rápida e histórico completo de documentos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Sparkles className="w-5 h-5 text-secondary" />
                  </div>
                  <CardTitle>Upload Seguro</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Armazenamento seguro de arquivos com acesso controlado por link para imagens, PDFs e mockups.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-['Space_Grotesk'] mb-6">
            Pronto para transformar sua gestão criativa?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Junte-se a centenas de profissionais criativos que já usam Orbita para organizar seus projetos.
          </p>
          <Button size="lg" asChild className="text-lg">
            <a href={getLoginUrl()}>Começar Gratuitamente</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-xs">O</span>
            </div>
            <span className="font-bold font-['Space_Grotesk']">Orbita</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Orbita. Gestão inteligente para profissionais criativos.
          </p>
        </div>
      </footer>
    </div>
  );
}
