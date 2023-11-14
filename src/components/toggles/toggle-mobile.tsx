import { Theme } from "@/contexts/theme-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";

import { useLongPress } from "@/hooks/use-long-press";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@components/ui/button";

const ToggleMobile = () => {
  const { showMenu, setShowMenu } = useLongPress();
  const { theme, setTheme, themes, themeIcons } = useTheme();

  const handleThemeChange = (theme: Theme) => {
    setShowMenu(false);
    setTheme(theme);
  };

  return (
    <Dialog open={showMenu} onOpenChange={setShowMenu}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set the theme</DialogTitle>
          <DialogDescription>
            <span className="block mb-4">{`Currently set to ${theme}.`}</span>
            {themes.map((theme) => {
              const Icon = themeIcons[theme];
              return (
                <Button
                  key={theme}
                  variant="outline"
                  onClick={() => handleThemeChange(theme)}
                  className="ml-2"
                >
                  <Icon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                  <span className="sr-only">Set theme to {theme}</span>
                </Button>
              );
            })}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ToggleMobile;
