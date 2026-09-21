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
    <div className="relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-breu sm:h-[860px] sm:rounded-[2.75rem] sm:border sm:border-white/5 sm:shadow-[0_40px_90px_rgba(0,0,0,0.65)]">
      <main className="nova-screen min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain">
        <Screen />
      </main>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="flex min-h-dvh w-full justify-center bg-[#05060a] sm:py-6">
        <Shell />
      </div>
    </AppProvider>
  );
}

export default App;
