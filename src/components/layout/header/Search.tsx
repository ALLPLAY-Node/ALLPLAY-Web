import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "@/components/ui/input-group";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="w-full self-center">
      <InputGroup className="mx-w-[304px] h-[31px]">
        <InputGroupInput
          className="text-sm placeholder:text-sm"
          placeholder="지역,종목으로 찾기"
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default Search;
