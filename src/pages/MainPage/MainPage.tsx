import { Box,  Tab } from "@mui/material"
import { useState } from "react";
import { Films } from "./components/Films/Films";
import { TopFilms } from "./components/TopFilms/TopFilms";
import { TabsStyled } from "./styles";

export const MainPage = () => {
    const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function TabPanel(props: any) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1'}}>
      {/* <TabContext value={value}> */}
          <TabsStyled value={value} onChange={handleChange} centered>
            <Tab label="Фильмы" />
            <Tab label="Топ фильмов" />
            <Tab label="Item Three" />
          </TabsStyled>
        <TabPanel value={value} index={0}><Films/></TabPanel>
        <TabPanel value={value} index={1}><TopFilms/></TabPanel>
        <TabPanel value={value} index={2}>Item Three</TabPanel>
      {/* </TabContext> */}
    </Box>
  );
}