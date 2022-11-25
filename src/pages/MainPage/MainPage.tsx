import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box,  Tab } from "@mui/material"
import { useState } from "react";
import { Films } from "./components/Films/Films";
import { TabsStyled } from "./styles";

export const MainPage = () => {
    const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', background: '#14181c url(	https://s.ltrbxd.com/static/img/content-bg.0d9a0f0f.png) 0 -1px repeat-x;' }}>
      <TabContext value={value}>
          <TabsStyled onChange={handleChange} centered>
            <Tab label="Фильмы" value="1" />
            <Tab label="Кинотеатры" value="2" />
            <Tab label="Item Three" value="3" />
          </TabsStyled>
        <TabPanel value="1" ><Films/></TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}