
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface GameSettingsProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  isGerman: boolean;
  setIsGerman: (value: boolean) => void;
}

const GameSettings = ({
  isDarkMode,
  setIsDarkMode,
  isGerman,
  setIsGerman,
}: GameSettingsProps) => {
  return (
    <div className="flex gap-8 mb-6">
      <div className="space-y-2">
        <Label>Theme</Label>
        <RadioGroup
          defaultValue={isDarkMode ? "dark" : "light"}
          onValueChange={(value) => setIsDarkMode(value === "dark")}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light">Light</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark" />
            <Label htmlFor="dark">Dark</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Language</Label>
        <RadioGroup
          defaultValue={isGerman ? "de" : "en"}
          onValueChange={(value) => setIsGerman(value === "de")}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="en" id="english" />
            <Label htmlFor="english">English</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="de" id="german" />
            <Label htmlFor="german">Deutsch</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default GameSettings;
