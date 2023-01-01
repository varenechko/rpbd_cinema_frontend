import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAxiosGet } from "../../axios/useAxiosGet";
import { ISeat } from "../../shared/interfaces/seat.interface";
import { ITicket } from "../../shared/interfaces/ticket.interface";
import { ChosenSeat, PageWrapper, Screen, Seat, SeatsWrapper } from "./styles";
import CircleIcon from '@mui/icons-material/Circle';
import { useAxiosPost } from "../../axios/useAxiosPost";
import { Button } from "@mui/material";
import { AxiosInstance } from "../../axios/axios";
import { ISession } from "../../shared/interfaces/session.interface";
import userStore from "../../store/UserStore";
import { observer } from "mobx-react-lite";

export const SessionPage = observer(() => {
    const { id } = useParams();
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [seats, setSeats] = useState<ISeat[]>([]);
    const [session, setSession] = useState<ISession>();
    const [seatsToBuy, setSeatsToBuy] = useState<ISeat[]>([]);
    const { getRequest } = useAxiosGet();
    // const { postRequest } = useAxiosPost();
    const navigate = useNavigate();
    // const session = useRef<ISession | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const res = await getRequest(`ticket/bySession/${id}`);
            setTickets(res.data as ITicket[]);
            const result = await getRequest(`session/${id}`);
            setSession(result.data as ISession);
            // console.log(session);
            
        })()
    }, [id])

    useEffect(() =>{
        (async() => {
            if(session?.hall_id) {
                const res = await getRequest(`seat/byHall/${session.hall_id}`)
                // const res = await getRequest(`seat/byHall/${tickets[0].seat?.hall_id}`)
                setSeats(res.data as ISeat[])
            }
        })()
    }, [session])

    const handleSeatClick = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (e.target.checked)
        setSeatsToBuy((prev) => [...prev, ...seats.filter((elem) => elem?.seat_id === id)])
        else setSeatsToBuy((prev) => prev.filter((elem) => elem?.seat_id !== id));
    }

    const handleBuyClick = async () => {
        if(!userStore.user) navigate('/login');
        const body = seatsToBuy.map((seat) => ({
            profile_id: userStore.user?.id,
            seat_id: seat.seat_id,
            session_id: id,
        }))
        try {
            const res = await AxiosInstance.post('ticket', body);
            navigate('/');
        } catch (error) {
            alert('что-то пошло не так, попробуйте позже')
        }
        
    }

    return (
        <PageWrapper>
            <Screen/>
            <SeatsWrapper>
                {seats && seats.map((seat) => {
                    return (
                    <Seat
                    key={seat?.seat_id}
                    onChange={(e) => handleSeatClick(e, seat?.seat_id)}
                    checkedIcon={<ChosenSeat fontSize="small" />}
                    // icon={
                    //     <CircleIcon fontSize="medium"/>
                    //     }
                    icon={tickets.find((elem) => elem?.seat_id === seat?.seat_id) ? 
                        <CircleIcon fontSize="small" sx={{color: 'grey'}}/> 
                        : 
                        <CircleIcon fontSize="medium"/>
                        }
                    disabled={tickets.find((elem) => elem?.seat_id === seat?.seat_id) !== undefined}
                    />
                )})}
            </SeatsWrapper>
            {seatsToBuy.map((seat) => {
                return (
                    <p key={seat.seat_id}>{`ряд ${seat.row}, место ${seat.seat_number}`}</p>
                );
            })}
            {seatsToBuy.length > 0 && <p>{`кол-во билетов: ${seatsToBuy.length}, стоимость: ${seatsToBuy.length * session!.price}`}</p>}
            <Button onClick={handleBuyClick} sx={{color: 'white', backgroundColor: 'gray'}}>купить</Button>
        </PageWrapper>
    );
});