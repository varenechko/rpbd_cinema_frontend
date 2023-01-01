import styled from "@emotion/styled";
import Checkbox from '@mui/material/Checkbox';
import { Box } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

export const PageWrapper = styled(Box)`
  width: 100%;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
`;

export const Screen = styled.div`
    background-color: gray;
    height: 4px;
    width: 400px;
    margin-top: 100px;
`;

export const SeatsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  width: 140px;
`;

export const Seat = styled(Checkbox)`
    margin: 10px;
    color: #00b020;
    .MuiSvgIcon-root {border-radius: 40px;}
`;

export const ChosenSeat = styled(CircleIcon)`
    color: gray;
    border: 2px solid #00b020;
`;