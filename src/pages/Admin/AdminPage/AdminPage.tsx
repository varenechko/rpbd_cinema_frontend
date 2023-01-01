import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const AdminPage = () => {
    const navigate = useNavigate();
    return (
    <>
        <p>Admin page</p>
        <Button onClick={() => navigate('/add-session')} sx={{color: "white"}} variant="contained">добавить сеанс</Button>
        <Button onClick={() => navigate('/top-films')} sx={{color: "white"}} variant="contained">топ фильмов</Button>
    </>
    )
}