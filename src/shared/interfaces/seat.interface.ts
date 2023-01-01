import { ICinemaHall } from "./hall.interface";

export interface ISeat {
    seat_id: number;
    hall_id: number;
    hall: ICinemaHall;
    row: number;
    seat_number: number;
  }