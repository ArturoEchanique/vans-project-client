import { useEffect, useState } from "react"
import capitalized from "../utils/capitalized"





const ProfileCard = ({ username, imageUrl }) => {
    const [name, setName] = useState({})

    // useEffect(() => {
    //     if(username)
    //   setName( capitalized(username))
    // }, [])
    return (
        <div>
            <h1>{username}</h1>
            <img src={imageUrl} />
            <hr />
        </div>
    )
}

export default ProfileCard
