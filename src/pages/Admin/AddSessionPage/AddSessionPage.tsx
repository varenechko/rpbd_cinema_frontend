import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAxiosGet } from "../../../axios/useAxiosGet";
import { ICinema } from "../../../shared/interfaces/cinema.interface";
import { IFilm } from "../../../shared/interfaces/film.interface";
import { ICinemaHall } from "../../../shared/interfaces/hall.interface";
import TextField from '@mui/material/TextField';
import { PageWrapper } from "../../SessionPage/styles";
import { AddSessionPageWrapper, DateTimePickerStyled, SelectStyled } from "./styles";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useAxiosPost } from "../../../axios/useAxiosPost";

interface newSession {
    film_id: number,
    cinema_id: number,
    hall_id: number,
    price: number,
    date: Date,
}

export const AddSessionPage = () => {
    const navigate = useNavigate();
    const [films, setFilms] = useState<IFilm[]>([]);
    const [halls, setHalls] = useState<ICinemaHall[]>([]);
    const [cinemas, setCinemas] = useState<ICinema[]>([]);
    const [film, setFilm] = useState<IFilm>();
    const [hall, setHall] = useState<ICinemaHall>();
    const [cinema, setCinema] = useState<ICinema>();
    const [session, setSession] = useState<newSession | undefined>(undefined);
    const { getRequest, error, isLoading } = useAxiosGet();
    const { postRequest } = useAxiosPost();

    const [date, setDate] = useState<Date | null>(null);
  
    const handleDateChange = (newValue: Date | null) => {
      setDate(newValue);
    };

    useEffect(() => {
        (async () => {
            const res = await getRequest('film');
            const cinemaRes = await getRequest('cinema');
            setFilms(res?.data as IFilm[]);
            setCinemas(cinemaRes.data as ICinema[]);
        })()
    }, [])

    useEffect(() => {
        (async () => {
          const res = await getRequest(`cinema-hall/byCinema/${cinema?.cinema_id}`);
          setHalls(res.data as ICinemaHall[]);
        })()
    }, [cinema])



    const handleFilmChange = (event: SelectChangeEvent<unknown>) => {
        setFilm(films.find((elem) => elem.film_id.toString() === event.target.value))
      };
    const handleCinemaChange = async (event: SelectChangeEvent<unknown>) => {
      const newCinema = cinemas.find((elem) => elem.cinema_id.toString() === event.target.value);
        setCinema(newCinema);
      };
    const handleHallChange = (event: SelectChangeEvent<unknown>) => {
        setHall(halls.find((elem) => elem.hall_id.toString() === event.target.value))
      };
    const handleAddClick = () => {
        const res = postRequest('session', {
          film_id: film?.film_id,
          hall_id: hall?.hall_id,
          price: 200,
          date: date,
        })
        setFilm(undefined);
        setCinema(undefined);
        setHall(undefined);
        setDate(null);
    }

    return (
    <AddSessionPageWrapper>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small" sx={{color:'#D5D5D5'}}>фильм</InputLabel>
        <SelectStyled
          value={(films.find((elem) => elem.film_id === film?.film_id)?.film_id || '').toString()}
          onChange={handleFilmChange}
          label='Название фильма'
          input={<OutlinedInput label="Name" />}
        >
          {films && films.map((film) => (
            <MenuItem
              key={film.film_id}
              value={film.film_id}
            >
              {film.title}
            </MenuItem>
          ))}
        </SelectStyled>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small" sx={{color:'#D5D5D5'}}>кинотеатр</InputLabel>
        <SelectStyled
          value={(cinemas.find((elem) => elem.cinema_id === cinema?.cinema_id)?.cinema_id || '').toString()}
          onChange={handleCinemaChange}
          input={<OutlinedInput label="Name" />}
        >
          {cinemas && cinemas.map((cinema) => (
            <MenuItem
              key={cinema.cinema_id}
              value={cinema.cinema_id}
            >
              {cinema.name}
            </MenuItem>
          ))}
        </SelectStyled>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small" sx={{color:'#D5D5D5'}}>номер зала</InputLabel>
        <SelectStyled
          value={(halls.find((elem) => elem.hall_id === hall?.hall_id)?.hall_id || '').toString()}
          onChange={handleHallChange}
          input={<OutlinedInput label="Name" />}
        >
          {halls && halls.map((hall) => (
            <MenuItem
              key={hall.hall_id}
              value={hall.hall_id}
            >
              {hall.hall_number}
            </MenuItem>
          ))}
        </SelectStyled>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          label="Date&Time picker"
          value={date}
          disablePast={true}
          onChange={handleDateChange}
          renderInput={(params) => <TextField sx={{color: '#D5D5D5'}} {...params} className='myDatePicker'/>}
        />
        </LocalizationProvider>
        <Button disabled={!film || !cinema || !hall || !date} variant='contained' sx={{color: '#D5D5D5', backgroundColor: '#00b021'}} onClick={handleAddClick}>Добавить сеанс</Button>
    </AddSessionPageWrapper>
    )
}