import { ISeat } from "./seat.interface";
import { ISession } from "./session.interface";
import { IUser } from "./user.interface";

export interface ITicket {
  ticket_id: number;
  profile_id: number;
  user: IUser;
  seat_id: number;
  seat: ISeat;
  session_id: number;
  session: ISession;
}