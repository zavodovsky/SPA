import { Language } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSwitcherProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
}

export function LanguageSwitcher({ currentLang, setLang }: LanguageSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/20 hover:text-primary transition-colors">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[120px] bg-white/90 backdrop-blur-md border-primary/20">
        <DropdownMenuItem 
          onClick={() => setLang('de')}
          className={`cursor-pointer ${currentLang === 'de' ? 'font-bold text-primary' : ''}`}
        >
          🇩🇪 Deutsch
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLang('en')}
          className={`cursor-pointer ${currentLang === 'en' ? 'font-bold text-primary' : ''}`}
        >
          🇬🇧 English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLang('ru')}
          className={`cursor-pointer ${currentLang === 'ru' ? 'font-bold text-primary' : ''}`}
        >
          🇷🇺 Русский
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
