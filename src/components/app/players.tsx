import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Confirmation } from "./confirmation";
import { IAddPlayer } from "@/stores/game";
import { DynamicIcon } from "lucide-react/dynamic";

type Props = {
  players: IAddPlayer[]
  onRemovePlayer: (index: number) => void
}

export function Players({ players, onRemovePlayer }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {players
        .map(({ name, icon, color }, i) => (
          <div
            key={`player-${i}`}
            className="flex justify-between items-center px-4 py-2 bg-secondary rounded-lg border-l-4"
            style={{ borderLeftColor: color }}
          >
            <div className="flex items-center gap-3">
              <DynamicIcon name={icon} size={20} className="text-foreground"/>
              <span className="text-foreground">{name}</span>
            </div>
            <Confirmation onConfirm={() => onRemovePlayer(i)}>
              <Button size="icon" variant="ghost" className="text-foreground">
                <X className="w-4 h-4" />
              </Button>
            </Confirmation>
          </div>
        ))}
    </div>
  );
}
