import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Pacientes from "./pages/Pacientes";
import Medicamentos from "./pages/Medicamentos";
import Horarios from "./pages/Horarios";
import Historico from "./pages/Historico";
import Orientacoes from "./pages/Orientacoes";
import Cronograma from "./pages/Cronograma";
import { useEffect } from "react";
import { initData } from "./lib/storage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/pacientes"} component={Pacientes} />
      <Route path={"/medicamentos"} component={Medicamentos} />
      <Route path={"/horarios"} component={Horarios} />
      <Route path={"/historico"} component={Historico} />
      <Route path={"/orientacoes"} component={Orientacoes} />
      <Route path={"/cronograma"} component={Cronograma} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    initData();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
