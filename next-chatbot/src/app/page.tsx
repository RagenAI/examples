import { Assistant } from "@/components/assistant/assistant";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <ThemeSwitcher />
      <Assistant />
    </div>
  );
}
