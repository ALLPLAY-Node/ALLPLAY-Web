import { useState } from "react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon
} from "../ui/input-group";
import { Search as SearchIcon } from "lucide-react";

interface SpotSearchProps {
  onSearch: (value: string) => void;
}

const SpotSearch = ({ onSearch }: SpotSearchProps) => {
  const [value, setValue] = useState("");

  return (
    <InputGroup>
      <InputGroupInput
        className="text-sm placeholder:text-[16px]"
        placeholder="검색어를 입력하세요"
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          setValue(v);
          onSearch(v);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(value);
          }
        }}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SpotSearch;
