import { Minus, Plus, TrendingDown, TrendingUp } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import useAppStore, { CREDIT, DEBIT, IPlayer } from "@/stores/game";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useState } from "react";

type Props = {
  players: IPlayer[];
  type: typeof CREDIT | typeof DEBIT;
};

const formSchema = z.object({
  player: z.string(),
  balance: z.coerce.number().positive(),
});

export function CreditOrDebit({ players, type }: Props) {
  const { addTransaction, updatePlayer } = useAppStore();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      balance: 0,
    },
  });

  const onSubmit = ({ player: id, balance }: z.infer<typeof formSchema>) => {
    const player: IPlayer = players
      .find((p) => p.id === id) as IPlayer;

    updatePlayer({
      ...player,
      balance:
        type === CREDIT ? player.balance + balance : player.balance - balance,
    });

    const value = Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(balance);

    addTransaction({
      type,
      message:
        type === CREDIT
          ? `Crédito de ${value} para ${player.name}`
          : `Débito de ${value} da conta de ${player.name}`,
    });

    setOpen(false);
  };

  const onOpenChange = (open: boolean) => {
    if (open === false) {
      form.reset();
    }

    setOpen(open);
  };

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetTrigger asChild>
        <Button
          className="flex items-center gap-4 p-6 [&_svg]:size-6"
          size="icon"
        >
          {type === CREDIT ? (
            <Plus className="w-16 h-16" />
          ) : (
            <Minus className="w-16 h-16" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <SheetHeader>
              <SheetTitle className="flex items-center justify-center gap-2">
                {type === CREDIT ? (
                  <TrendingUp className="text-green-500" />
                ) : (
                  <TrendingDown className="text-red-500" />
                )}
                Valor a {type === CREDIT ? "creditar" : "debitar"}
              </SheetTitle>
              <SheetDescription>
                {type === CREDIT
                  ? "Creditar valor do banco para o jogador"
                  : "Transferir valor do jogador para o banco"}
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-2 my-4">
              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2 relative">
                        <span className="absolute left-2 text-lg font-bold p-1">
                          R$
                        </span>
                        <Input
                          type="number"
                          className="bg-background dark:bg-foreground text-lg text-center p-6"
                          autoFocus
                          onChange={({ target }) => {
                            let { value } = target;

                            if (value.startsWith("0") && value.length > 1) {
                              value = value.replace(/ ^0+/, "");
                            }

                            field.onChange(Number(value));
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                name="player"
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    defaultValue={field.value}
                    className="grid grid-cols-2"
                    onValueChange={field.onChange}
                  >
                    {players
                      .filter((p) => (type === DEBIT ? p.active : true))
                      .map((player) => (
                        <Label
                          htmlFor={`player-radio-${player.id}`}
                          key={`label-player-radio-${player.id}`}
                        >
                          <div className="flex items-center space-x-3 border p-5">
                            <RadioGroupItem
                              id={`player-radio-${player.id}`}
                              value={player.id.toString()}
                            />
                            <span className="text-foreground">
                              {player.name}
                            </span>
                          </div>
                        </Label>
                      ))}
                  </RadioGroup>
                )}
              />
            </div>

            <SheetFooter>
              <Button
                type="submit"
                size="lg"
                className="text-lg"
                disabled={!form.formState.isValid}
              >
                Confirmar
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
