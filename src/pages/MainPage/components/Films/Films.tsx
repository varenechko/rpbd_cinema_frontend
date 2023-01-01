import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxiosGet } from "../../../../axios/useAxiosGet";
import { SearchBar } from "../../../../components/Search/Search";
import { Sort } from "../../../../shared/enums";
import { IFilm } from "../../../../shared/interfaces/film.interface";
import { BoxStyled, ContentWrapper, Title } from "./styles";

export const Films = () => {
    const [films, setFilms] = useState<IFilm[]>([]);
    const { getRequest, error, isLoading } = useAxiosGet();
    const [searchValue, setSearchValue] = useState('');
    const [sortBy ,setSortBy] = useState<Sort>(Sort.asc);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await getRequest('film');
            setFilms(res?.data as IFilm[]);
        })()
    }, [])

    const handleSearchClick = async (text: string) => {
        const res = await getRequest(`film/search/${text || '*'}`);
        setFilms(res?.data as IFilm[]);
    }

    const handleSortClick = async () => {
        setSortBy(prev => prev === Sort.asc ? Sort.decs : Sort.asc)
        const res = await getRequest(`film/sort/${sortBy === Sort.asc ? Sort.decs : Sort.asc}`);
        setFilms(res?.data as IFilm[]);
    }

    const handleFilmClick = (filmId: number) => {
        navigate(`/film/${filmId}`);
    }

    return(
            <>
            <IconButton onClick={handleSortClick} sx={{color: '#D5D5D5'}}>
                { sortBy === Sort.asc ? <ArrowUpward/> : <ArrowDownward/>}
            </IconButton>
            <SearchBar value={searchValue} onClick={handleSearchClick} />
            <BoxStyled>
            <ContentWrapper>
                {films.map((film, index) => {
                    // const poster = require(film.poster);
                    return (
                        <Box key={film.film_id} 
                            onClick={() => handleFilmClick(film.film_id)} sx={{
                            cursor: 'pointer',
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
                    );
                })}
            </ContentWrapper>
        </BoxStyled>
        </>
    );
}