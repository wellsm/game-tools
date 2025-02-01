import { UserPlus2, Plus } from "lucide-react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { IAddPlayer } from "@/stores/game";
import { useState } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2).max(12),
  icon: z.string(),
});

type Props = {
  players: IAddPlayer[];
  onAddPlayer: (player: IAddPlayer) => void;
};

export function AddPlayer({ players, onAddPlayer }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit({ name, icon }: z.infer<typeof formSchema>) {
    onAddPlayer({ name, icon: icon as IconName });

    form.reset();

    setOpen(false);
  }

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
          className="flex items-center gap-2 text-lg"
          size="lg"
          variant="secondary"
          disabled={players.length === 6}
        >
          <UserPlus2 size={20} />
          Adicionar
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <SheetHeader>
              <SheetTitle>Nome do Jogador</SheetTitle>
              <SheetDescription>Qual o nome do tabacudo(a)?</SheetDescription>
            </SheetHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-center text-lg text-foreground h-12"
                      maxLength={12}
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              name="icon"
              control={form.control}
              render={({ field }) => (
                <RadioGroup
                  defaultValue={field.value}
                  className="grid grid-cols-3"
                  onValueChange={field.onChange}
                >
                  {[
                    "circle-dollar-sign",
                    "coins",
                    "wallet",
                    "banknote",
                    "landmark",
                    "piggy-bank",
                  ].map((icon) => (
                    <Label
                      htmlFor={`icon-radio-${icon}`}
                      key={`label-icon-radio-${icon}`}
                      className={cn(
                        players.filter((p) => p.icon === icon).length !== 0 &&
                          "opacity-50 pointer-events-none"
                      )}
                    >
                      <div className="flex items-center space-x-5 border p-5">
                        <RadioGroupItem
                          id={`icon-radio-${icon}`}
                          value={icon}
                        />
                        <DynamicIcon
                          name={icon as IconName}
                          size={20}
                          className="text-foreground"
                        />
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              )}
            />

            <SheetFooter>
              <Button
                type="submit"
                className="text-lg"
                disabled={!form.formState.isValid}
              >
                <Plus size={20} />
                Adicionar
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
