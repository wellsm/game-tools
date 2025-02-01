import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type IOption = {
  value: string | number;
  label: string;
};

type Props = {
  options: IOption[];
  onSelectChange: (option?: IOption) => void;
  useResponsive?: boolean
};

export default function ResponsiveSelect({ options, onSelectChange, useResponsive = true }: Props) {
  const [value, setValue] = useState<string>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const onChangeValue = (value: string) => {
    onSelectChange(options.find((o) => o.value.toString() === value));
    setValue(value);
  };

  if (isMobile && useResponsive) {
    return (
      <select
        className="w-full mt-1 p-2 border text-lg border-gray-300 rounded-md shadow-sm focus:outline-none"
        onChange={({ target }) => onChangeValue(target.value.toString())}
      >
        {value === undefined && <option>Selecione</option>}
        {options.map((option, i) => (
          <option key={`option-${i}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <Select
      onValueChange={(value) => onChangeValue(value.toString())}
    >
      <SelectTrigger className="w-full text-foreground text-lg h-12">
        <SelectValue placeholder="Escolha uma opção" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, i) => (
          <SelectItem key={`option-${i}`} value={option.value.toString()} className="h-10">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
