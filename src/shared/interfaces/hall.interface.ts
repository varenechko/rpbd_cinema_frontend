import { ICinema } from "./cinema.interface";

export interface ICinemaHall {
    hall_id: number,
    cinema_id: number,
    cinema: ICinema,
    hall_number: number,
    rows_number: number,
  }