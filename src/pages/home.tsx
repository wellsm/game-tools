import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useAppStore from "@/stores/game";
import { Info } from "lucide-react";
import { Link } from "react-router";

export function Home() {
  const { transactions } = useAppStore();

  return (
    <div className="h-full max-w-sm px-4 mx-auto flex flex-col gap-2 items-center justify-center">
      <Button className="w-full text-lg" size="lg">
        <Link to="/new-game">Novo Jogo</Link>
      </Button>
      {transactions.length !== 0 && (
        <>
          <Alert className="mt-8">
            <Info className="h-4 w-4" />
            <AlertTitle>Jogo em aberto</AlertTitle>
            <AlertDescription>
              Você possui um jogo em aberto, deseja continuar?
            </AlertDescription>
          </Alert>
          <Button className="w-full text-lg" size="lg">
            <Link to="/game">Voltar ao Jogo Anterior</Link>
          </Button>
        </>
      )}
    </div>
  );
}
