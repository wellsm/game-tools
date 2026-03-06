import { IconName } from "lucide-react/dynamic";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const PLAYER_COLORS = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#a855f7",
  "#f97316",
];

export type IAddPlayer = {
  name: string;
  icon: IconName;
  color: string;
};

export type IPlayer = {
  id: string | number;
  name: string;
  icon: IconName;
  color: string;
  balance: number;
  active: boolean;
};

export const CREDIT = "credit";
export const DEBIT = "debit";
export const TRANSFER = "transfer";

export type ITransaction = {
  type: typeof CREDIT | typeof DEBIT | typeof TRANSFER;
  message: string;
};

type AppStore = {
  players: IPlayer[];
  setPlayers: (players: IPlayer[]) => void;
  addPlayer: (player: IPlayer) => void;
  updatePlayer: (player: IPlayer) => void;
  removePlayer: (player: IPlayer) => void;
  transactions: ITransaction[];
  setTransactions: (transactions: ITransaction[]) => void;
  addTransaction: (transaction: ITransaction) => void;
};

const useAppStore = create(
  persist<AppStore>(
    (set) => ({
      players: [],
      setPlayers: (players) => set({ players }),
      addPlayer: (player) =>
        set((state) => ({ players: [...state.players, player] })),
      updatePlayer: (player) =>
        set((state) => ({
          players: state.players.map((p) =>
            p.id === player.id ? { ...player, active: player.balance > 0 } : p
          ),
        })),
      removePlayer: (player) =>
        set((state) => ({
          players: state.players.filter((p) => p.id !== player.id),
        })),
      transactions: [],
      setTransactions: (transactions) => set({ transactions }),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),
    }),
    {
      name: "game-tools",
    }
  )
);

export default useAppStore;
