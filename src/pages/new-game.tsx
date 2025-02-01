import { AddPlayer } from "@/components/app/add-player";
import { NavigationBar } from "@/components/app/navigation-bar";
import { Players } from "@/components/app/players";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAppStore, { IAddPlayer } from "@/stores/game";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const formSchema = z.object({
  balance: z.coerce.number(),
});

export function NewGame() {
  const [newPlayers, setNewPlayers] = useState<IAddPlayer[]>([]);
  const { setPlayers, setTransactions, addTransaction } = useAppStore();

  const submitRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      balance: 15000,
    },
  });

  const onSubmit = ({ balance }: z.infer<typeof formSchema>) => {
    console.log("chegou");

    setPlayers(
      newPlayers.map((newPlayer) => ({
        id: uuidv4(),
        ...newPlayer,
        balance,
        active: true,
      }))
    );

    setTransactions([]);

    for (const { name } of newPlayers) {
      addTransaction({
        type: "credit",
        message: `Crédito inicial de ${Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          maximumFractionDigits: 0,
        }).format(balance)} para ${name}`,
      });
    }

    navigate("/game");
  };

  return (
    <div className="h-full mx-auto flex flex-col gap-2 items-center justify-between">
      <div className="w-full flex-none">
        <NavigationBar title="Novo Jogo" />
      </div>
      <h2 className="text-lg text-center text-foreground font-bold m-4">
        Lista de Jogadores
      </h2>
      <div className="h-full w-full flex flex-col shrink p-4">
        <div className="flex flex-col shrink h-full">
          <Players
            players={newPlayers}
            onRemovePlayer={(i) => setNewPlayers(newPlayers.splice(i, 1))}
          />
        </div>

        {/* Botões */}
        <div className="flex flex-col items-center justify-between mt-6 w-full flex-none">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="w-full text-center py-6 flex flex-col gap-4">
                <span className="text-foreground text-lg uppercase font-bold">
                  Valor Inicial
                </span>
                <FormField
                  control={form.control}
                  name="balance"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-2 mb-4 relative">
                          <span className="absolute left-2 text-lg font-bold p-1">
                            R$
                          </span>
                          <Input
                            type="number"
                            className="bg-background dark:bg-foreground text-lg text-center p-6"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Hidden Submit Button */}
              <button type="submit" ref={submitRef} className="hidden"></button>
            </form>
          </Form>

          <div className="flex w-full items-center justify-between">
            <AddPlayer
              players={newPlayers}
              onAddPlayer={(newPlayer) =>
                setNewPlayers([...newPlayers, newPlayer])
              }
            />

            <Button
              className="font-bold px-6 py-2 rounded-lg text-lg"
              size="lg"
              disabled={newPlayers.length <= 1}
              onClick={() => submitRef?.current?.click()}
            >
              Iniciar Jogo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
