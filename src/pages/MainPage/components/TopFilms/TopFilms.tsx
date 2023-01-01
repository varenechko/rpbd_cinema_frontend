import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAxiosGet } from "../../../../axios/useAxiosGet";
import { IFilm } from "../../../../shared/interfaces/film.interface";
import userStore from "../../../../store/UserStore";

interface ITopFilms {
    title: string,
    count: number,
}

export const TopFilms = observer(() => {
    const [topFilms, setTopFilms] = useState<ITopFilms[]>([]);
    const { getRequest, error, isLoading } = useAxiosGet();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await getRequest('ticket/top-films');
            setTopFilms(res?.data as ITopFilms[]);
        })()
    }, [])

    return (
        <>
        {topFilms.map((film, index) => (
            userStore.user?.isAdmin ? <p>{`${index+1}. ${film.title} - ${film.count} шт`}</p> : <p>{`${index+1}. ${film.title}`}</p>
        ))}
    </>)
})