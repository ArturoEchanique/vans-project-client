import { useEffect, useState } from "react"
import "./ProfileCard.css"



const ProfileCard = ({ username, imageUrl }) => {
    const [name, setName] = useState({})

    // useEffect(() => {
    //     if(username)
    //   setName( capitalized(username))
    // }, [])
    return (
        <div>
            <h1 className="profile-name">Welcome {username}</h1>
            <img src={imageUrl} />
            <hr />
        </div>
    )
}

export default ProfileCard
