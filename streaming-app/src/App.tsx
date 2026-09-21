import { AppProvider, useApp } from "./context/AppContext";
import { BottomNav } from "./components/BottomNav";
import { Home } from "./screens/Home";
import { Search } from "./screens/Search";
import { MyList } from "./screens/MyList";
import { Profile } from "./screens/Profile";
import { Detail } from "./screens/Detail";

function Screen() {
  const { route } = useApp();

  if (route.screen === "detalhe") {
    return <Detail id={route.id} />;
  }

  switch (route.tab) {
    case "inicio":
      return <Home />;
    case "buscar":
      return <Search />;
    case "lista":
      return <MyList />;
    case "perfil":
      return <Profile />;
  }
}

function Shell() {
  return (
    <div className="relative flex h-screen w-full max-w-[430px] flex-col overflow-hidden bg-breu sm:h-[860px] sm:rounded-[2.75rem] sm:border sm:border-white/5 sm:shadow-[0_40px_90px_rgba(0,0,0,0.65)]">
      <main className="flex-1 overflow-y-auto">
        <Screen />
      </main>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="flex min-h-screen w-full justify-center bg-[#050302] sm:py-6">
        <Shell />
      </div>
    </AppProvider>
  );
}

export default App;
