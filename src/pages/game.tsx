import { NavigationBar } from "@/components/app/navigation-bar";
import { CreditOrDebit } from "@/components/app/credit-or-debit";
import { Transfer } from "@/components/app/transfer";
import { Card, CardContent } from "@/components/ui/card";
import { Transactions } from "@/components/app/transactions";
import useAppStore from "@/stores/game";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { DynamicIcon } from "lucide-react/dynamic";

export function Game() {
  const { players, transactions } = useAppStore();

  //const winner = 

  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col">
      <div className="w-full flex-none">
        <NavigationBar
          title="Partida"
          onGoBack={() => navigate("/")}
          confirmation={true}
        />
      </div>

      <div className="h-full flex flex-col shrink justify-around px-4">
        {/* Lista de Transações */}
        <div className="flex flex-col">
          <h2 className="text-lg text-center text-foreground font-bold mb-4">
            Últimas Transações
          </h2>
          <Transactions transactions={transactions} />
        </div>

        {/* Saldo dos Usuários */}
        <div className="flex gap-3 overflow-x-auto scrollbar-none">
          {players
            .sort((a, b) => (a.balance > b.balance ? -1 : 1))
            .map((player, index) => (
              <Card
                key={index}
                className={cn(
                  "min-w-[130px] shadow-sm shadow-background bg-background/90",
                  player.active === false && "opacity-50"
                )}
              >
                <CardContent className="flex flex-col items-center text-xs text-muted-foreground px-4 py-4">
                  <DynamicIcon name={player.icon} size={24} className="text-foreground mb-2"/>
                  <p className="font-bold text-foreground text-sm">
                    {player.name}
                  </p>
                  <p>R$ {player.balance.toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-center gap-4 my-4">
          <CreditOrDebit players={players} type="credit" />
          <Transfer players={players} />
          <CreditOrDebit players={players} type="debit" />
        </div>
      </div>
    </div>
  );
}
