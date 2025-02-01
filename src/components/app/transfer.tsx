import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowLeftRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import ResponsiveSelect from "@/components/app/responsive-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAppStore, { IPlayer, TRANSFER } from "@/stores/game";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";

type Props = {
  players: IPlayer[];
};

const formSchema = z.object({
  balance: z.coerce.number().positive(),
  from: z.string(),
  to: z.string(),
});

export function Transfer({ players }: Props) {
  const { addTransaction, updatePlayer } = useAppStore();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      balance: 0,
    },
  });

  const onSubmit = ({ from, to, balance }: z.infer<typeof formSchema>) => {
    const sender: IPlayer = players
      .filter((p) => p.active)
      .find((p) => p.id === from) as IPlayer;

    const receiver: IPlayer = players
      .filter((p) => p.active)
      .find((p) => p.id === to) as IPlayer;

    updatePlayer({
      ...sender,
      balance: sender.balance - balance,
    });

    updatePlayer({
      ...receiver,
      balance: receiver.balance + balance,
    });

    const value = Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(balance);

    addTransaction({
      type: TRANSFER,
      message: `Transferência de ${value} de ${sender.name} para ${receiver.name}`,
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
          className="flex items-center gap-2 p-6 [&_svg]:size-6"
          size="icon"
        >
          <ArrowLeftRight className="w-16 h-16" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <SheetHeader>
              <SheetTitle className="flex items-center justify-center gap-4">
                <ArrowLeftRight className="text-yellow-500" />
                Transferência
              </SheetTitle>
              <SheetDescription>
                Transferir valor de um jogador para outro
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
              <div className="flex flex-col gap-1 disabled">
                <Controller
                  name="from"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-foreground">De:</Label>
                      <ResponsiveSelect
                        options={players
                          .filter((p) => p.active)
                          .map((player) => ({
                            label: player.name,
                            value: player.id,
                          }))}
                        onSelectChange={(option) => {
                          field.onChange(
                            players
                              .find(
                                (p) =>
                                  p.id.toString() === option?.value.toString()
                              )
                              ?.id.toString()
                          );

                          form.reset({ ...form.getValues(), to: undefined });
                        }}
                        useResponsive={false}
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Controller
                  name="to"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem
                      className={cn(
                        form.getValues("from") === undefined
                          ? "opacity-50 pointer-events-none"
                          : ""
                      )}
                    >
                      <Label className="text-foreground">Para:</Label>
                      <ResponsiveSelect
                        options={players
                          .filter(
                            (player) =>
                              player.id.toString() !==
                              form.getValues("from")?.toString()
                          )
                          .map((player) => ({
                            label: player.name,
                            value: player.id,
                          }))}
                        onSelectChange={(option) =>
                          field.onChange(
                            players
                              .find(
                                (p) =>
                                  p.id.toString() === option?.value.toString()
                              )
                              ?.id?.toString()
                          )
                        }
                        useResponsive={false}
                      />
                    </FormItem>
                  )}
                />
              </div>
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
