import { ThemeSwitcher } from "../theme/theme-switcher";
import { NavMenu } from "./navmenu";

export function Navbar() {
  return (
    <div className="flex justify-end m-4 items-center space-x-4">
      <NavMenu />
      <ThemeSwitcher />
    </div>
  );
}
