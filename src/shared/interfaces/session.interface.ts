import { IFilm } from "./film.interface";
import { ICinemaHall } from "./hall.interface";

export interface ISession {
    session_id: number,
    film_id: number,
    film: IFilm,
    hall_id: number,
    hall: ICinemaHall,
    price: number,
    date: Date,
}