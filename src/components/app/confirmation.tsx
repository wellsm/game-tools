import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onConfirm: () => void;
};

export function Confirmation({ children, onConfirm }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não poderá ser desfeita. 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-foreground">Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
