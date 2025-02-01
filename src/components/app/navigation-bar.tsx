import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router";
import { ThemeToggle } from "./theme-toggle";
import { Confirmation } from "./confirmation";

type Props = {
  title: string;
  onGoBack?: () => void;
  confirmation?: boolean;
};

export function NavigationBar({
  title,
  onGoBack,
  confirmation = false,
}: Props) {
  const navigate = useNavigate();

  const goBack = () => {
    if (onGoBack) {
      return onGoBack();
    }

    navigate(-1);
  };

  return (
    <nav className="flex items-center justify-between w-full p-4 bg-background shadow-lg text-white">
      {/* Botão Voltar */}
      {confirmation ? (
        <Confirmation onConfirm={() => goBack()}>
          <Button size="icon" variant="ghost" className="text-foreground">
            <X className="w-4 h-4" />
          </Button>
        </Confirmation>
      ) : (
        <Button
          size="icon"
          variant="ghost"
          className="flex items-center gap-2 text-white [&_svg]:size-5"
          onClick={() => goBack()}
        >
          <ArrowLeft className="w-16 h-16  text-foreground" />
        </Button>
      )}

      {/* Título */}
      <h1 className="text-lg font-bold text-foreground">{title}</h1>

      <ThemeToggle />
    </nav>
  );
}
