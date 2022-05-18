import { useContext } from "react"
import VanCard from "../VanCard/VanCard"
import { useEffect, useState } from "react"
import vanService from "../../services/van.service"
import { AuthContext } from "../../context/auth.context"

const UserVans = () => {
    const { user } = useContext(AuthContext)

    const [userVans, setUserVans] = useState([])

    const getUserVans = () => {
        vanService
            .getUserVans(user._id)
            .then(({ data }) => {
                setUserVans(data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getUserVans()
    }, [])

    const vansList = userVans.map((van) => {
        return <VanCard {...van} key={van._id} />
    })

    return <>{vansList}</>
}

export default UserVans
