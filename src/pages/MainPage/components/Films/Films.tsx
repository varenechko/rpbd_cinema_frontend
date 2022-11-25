import { Box, Stack } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from "react";
import { useAxiosGet } from "../../../../axios/useAxiosGet";
import { BoxStyled, ContentWrapper, Title } from "./styles";

interface IFilm {
    film_id: number;
    title: string;
    age: number;
    poster: string;
} 

export const Films = () => {
    const [films, setFilms] = useState<IFilm[]>([]);
    const { getRequest, error, isLoading } = useAxiosGet(); 

    useEffect(() => {
        (async () => {
            const res = await getRequest('film');
            setFilms(res.data as IFilm[]);
        })()
    }, [])

    return(
        <BoxStyled>
            <ContentWrapper>
            {films.map((film, index) => {
                // const poster = require(film.poster);
                console.log(film.poster);
                return (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: 400,
                    width: 228,
                    backgroundColor: '#000',
                    background: `center/cover no-repeat  url(http://127.0.0.1:8887/${film?.poster?.slice(16)})`,
                    margin: '10px',
                    opacity: '1',
                    }}>
                    {/* <img className="profile-photo" src={`http://127.0.0.1:8887/${film?.poster?.slice(16)}`} alt={"Carlie Anglemire"}/> */}
                    {/* <Title>{film.title}</Title>
                    <p>{film.age}</p> */}
                </Box>
                )
            })} 
            </ContentWrapper>
       </BoxStyled>
    );
}