import { FC, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './styles';
import { IconButton } from "@mui/material";

interface SearchBarProps {
    value: string;
    onClick: (text: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({value, onClick}) => {
    const [searchText, setSearchText] = useState<string>(value);

    const handleClick = () => {
      onClick(searchText)
    }
    return (
    <Search>
        {/* <SearchIconWrapper> */}
          <IconButton onClick={handleClick}>
            <SearchIcon />
          </IconButton>
        {/* </SearchIconWrapper> */}
        <StyledInputBase
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
    </Search>)
}