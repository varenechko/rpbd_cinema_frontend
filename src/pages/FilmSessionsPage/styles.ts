import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ContentWrapper = styled.div`
  width: 100%;
  min-height: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: left;
  justify-content: left;
  padding: 30px 80px 0 80px;
  box-sizing: border-box;
`;

export const FilmInfo = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    height: 300px;
    padding-top: 15px;
    padding-bottom: 30px;
`;

export const Poster = styled(Box)`
    height: 100%;
`;

export const Description = styled(Box)`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
`;

export const Session = styled.div`
    width: 300px;
    height: 200px;
    padding-left: 25px;
    padding-right: 25px;
    background-color: #456;
    border-radius: 10px;
    color: #def;
    box-sizing: border-box;
    cursor: pointer;
`;