import { ArrowLeftRight, TrendingDown, TrendingUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Transaction = {
  type: string;
  message: string;
};

type Props = {
  transactions: Transaction[];
  className?: string;
};

export function Transactions({ transactions, className }: Props) {
  return (
    <ScrollArea className={className ?? "h-[28rem]"}>
      <ul className="space-y-2">
        {transactions.map((transaction, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 bg-background/90 rounded-lg shadow-md"
          >
            <span className="text-foreground/90 text-xs font-mono w-[90%]">
              {transaction.message}
            </span>
            {transaction.type === "credit" ? (
              <TrendingUp className="text-green-500 w-4 h-4" />
            ) : transaction.type === "transfer" ? (
              <ArrowLeftRight className="text-yellow-500 w-4 h-4" />
            ) : (
              <TrendingDown className="text-red-500 w-4 h-4" />
            )}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
