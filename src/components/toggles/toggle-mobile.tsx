import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";

import { useLongPress } from "@/hooks/use-long-press";
import { Button } from "@components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/theme-context";

const ToggleMobile = () => {
  const { showMenu, setShowMenu } = useLongPress();
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setShowMenu(false);
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Dialog open={showMenu}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set the theme</DialogTitle>
          <DialogDescription>
            <Button variant="outline" size="icon" onClick={handleThemeChange}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ToggleMobile;
