import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuth } from "@/_core/hooks/useAuth";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProjectsManagement from "./pages/ProjectsManagement";
import BriefingCreator from "./pages/BriefingCreator";
import ContractsManagement from "./pages/ContractsManagement";
import ClientArea from "./pages/ClientArea";
import BudgetsManagement from "./pages/BudgetsManagement";
import Inicio from "./pages/Inicio";

function Router() {
  const isAuthenticated = true;
  const loading = false;
  const error = null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }
  // Login sempre acessível
  if (!isAuthenticated || error) {
    return (
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route component={Login} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" component={Inicio} />
      <Route path="/dashboard" component={Home} />
      <Route path="/projects" component={ProjectsManagement} />
      <Route
        path="/briefing"
        component={() => <BriefingCreator projectId={1} />}
      />
      <Route path="/contracts" component={ContractsManagement} />
      <Route path="/client-area" component={ClientArea} />
      <Route path="/budgets" component={BudgetsManagement} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook


function App() {
  return (
    <ThemeProvider defaultTheme="dark" switchable>
      <Login />
    </ThemeProvider>
  );
}


export default App;
