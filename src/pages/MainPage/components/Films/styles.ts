import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const BoxStyled = styled(Box)`
  width: 100%;
  min-height: calc(100% - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ContentWrapper = styled(Box)`
  width: 80%;
  min-height: calc(100% - 200px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.p`
    color: white;
    font-size: 20px;
`;