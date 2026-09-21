import { BellIcon, ChevronLeftIcon, HelpIcon, LogOutIcon, SettingsIcon } from "../components/icons";

function Row({ Icon, label }: { Icon: typeof BellIcon; label: string }) {
  return (
    <button className="flex items-center gap-3 border-b border-linha py-4 text-left last:border-none">
      <Icon width={18} height={18} className="text-areia" />
      <span className="flex-1 text-[0.9375rem] text-marfim">{label}</span>
      <ChevronLeftIcon width={16} height={16} className="rotate-180 text-areia-dim" />
    </button>
  );
}

export function Profile() {
  return (
    <div className="flex flex-col gap-6 px-5 pb-8 pt-5">
      <h1 className="font-display text-[1.5rem] font-semibold text-marfim">Perfil</h1>

      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ambar font-display text-[1.375rem] font-semibold text-breu">
          M
        </div>
        <div className="flex flex-col">
          <span className="text-[1rem] font-medium text-marfim">Mariana</span>
          <span className="text-[0.8125rem] text-areia">mariana@email.com</span>
        </div>
      </div>

      <div className="flex flex-col">
        <Row Icon={BellIcon} label="Notificações" />
        <Row Icon={SettingsIcon} label="Configurações da conta" />
        <Row Icon={HelpIcon} label="Central de ajuda" />
        <Row Icon={LogOutIcon} label="Sair" />
      </div>
    </div>
  );
}
