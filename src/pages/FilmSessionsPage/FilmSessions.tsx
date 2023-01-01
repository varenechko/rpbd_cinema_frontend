import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useAxiosGet } from "../../axios/useAxiosGet";
import { ISession } from "../../shared/interfaces/session.interface";
import { ContentWrapper, Description, FilmInfo, Poster, Session } from "./styles";
import 'moment/locale/ru'  // without this line it didn't work
import { observer } from "mobx-react-lite";
import userStore from "../../store/UserStore";
import { Button } from "@mui/material";
import { AxiosInstance } from "../../axios/axios";
moment.locale('ru')

export const FilmSessionsPage = () => {
    const { id } = useParams();
    const [sessions, setSessions] = useState<ISession[] | undefined>([]);
    const { getRequest, error, isLoading } = useAxiosGet();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await getRequest(`session/byFilm/${id}`);
            setSessions(res.data as ISession[]);
        })()
    }, [id])

    const handleDeleteClick = async () => {
        const res = await AxiosInstance.delete(`film/${id}`)
    }

    if(sessions?.length === 0 || !sessions) return(
        <>
        <p>Нет доступных сеансов</p>
        {userStore.user?.isAdmin && <Button onClick={handleDeleteClick} variant="contained">удалить фильм</Button>}
        </>
    )

    return (
        <ContentWrapper>
            <FilmInfo>
                <Poster sx={{
                    height: '100%',
                    width: 228,
                    background: `center/cover no-repeat  url(http://127.0.0.1:8887/${sessions[0]?.film?.poster?.slice(16)})`
                    }}/>
                <Description>
                    <b>{sessions[0]?.film?.title}</b>
                    <p>возрастное ограничение: {sessions[0]?.film?.age}+</p>
                </Description>
            </FilmInfo>
                {sessions.map((session) => (
                    <Session key={session.session_id} onClick={() => navigate(`/session/${session.session_id}`)}>
                        <p>{moment(session.date).format('LLL') }</p>
                        <p>цена:{session.price}</p>
                        <p>{session.hall.cinema.name}</p>
                        <p>{session.hall.cinema.address}</p>
                    </Session>
                ))}
        </ContentWrapper>
    )
};