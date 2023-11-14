import { Theme } from "@/contexts/theme-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";

import { DO_DIALOG } from "@/actions";
import { useLongPress } from "@/hooks/use-long-press";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@components/ui/button";
import { useEffect, useState } from "react";
const ToggleMobile = () => {
  const { doAction, setDoAction } = useLongPress();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { theme, setTheme, themes, themeIcons } = useTheme();

  useEffect(() => {
    setIsDialogOpen(doAction === DO_DIALOG);
  }, [doAction]);

  const handleThemeChange = (theme: Theme) => {
    setIsDialogOpen(false);
    setDoAction("");
    setTheme(theme);
  };

  const handleOpenChange = () => {
    setIsDialogOpen(false);
    setDoAction("");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
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
