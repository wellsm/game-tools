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
    <div className="h-full flex flex-col overflow-hidden">
      <div className="w-full flex-none">
        <NavigationBar
          title="Partida"
          onGoBack={() => navigate("/")}
          confirmation={true}
        />
      </div>

      {/* Saldo dos Usuários — grid 3x2 */}
      <div className="flex-none px-3 pt-3">
        <div className="grid grid-cols-3 gap-2">
          {players
            .sort((a, b) => (a.balance > b.balance ? -1 : 1))
            .map((player, index) => (
              <Card
                key={index}
                className={cn(
                  "border-l-4 shadow-sm bg-background/90",
                  player.active === false && "opacity-40"
                )}
                style={{ borderLeftColor: player.color }}
              >
                <CardContent className="flex flex-col items-center text-xs text-muted-foreground px-2 py-2">
                  <DynamicIcon
                    name={player.icon}
                    size={18}
                    className="mb-1"
                    style={{ color: player.color }}
                  />
                  <p className="font-bold text-foreground text-sm truncate w-full text-center">
                    {player.name}
                  </p>
                  <p className="text-base">R$ {player.balance.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Lista de Transações — ocupa o espaço restante */}
      <div className="flex flex-col flex-1 min-h-0 px-3 pt-4">
        <div className="flex-1 min-h-0">
          <Transactions transactions={transactions} className="h-full" />
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex-none flex justify-center gap-4 py-4 px-3">
        <CreditOrDebit players={players} type="credit" />
        <Transfer players={players} />
        <CreditOrDebit players={players} type="debit" />
      </div>
    </div>
  );
}
