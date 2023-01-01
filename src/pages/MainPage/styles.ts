import styled from "@emotion/styled";
import { Tabs } from "@mui/material";

export const TabsStyled = styled(Tabs)({
  // backgroundColor: '#14181c',
  // borderBottom: '1px solid #e8e8e8',
  '& .MuiButtonBase-root': {
    color: '#D5D5D5',
  },
  '& .MuiButtonBase-root-MuiTab-root .Mui-selected': {
    color: '#00b021', //green
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#00b020',
  },
  });