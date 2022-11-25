import { useContext } from "react"
import { UserContext } from "../../shared/contexts/UserContext/UserContext"

export const AdminPage = () => {
    const { user } = useContext(UserContext)
    return <p>Admin page</p>
}