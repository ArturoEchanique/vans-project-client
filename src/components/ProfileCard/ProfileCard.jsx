import { useEffect, useState } from "react"
import "./ProfileCard.css"



const ProfileCard = ({ username, imageUrl }) => {
    const [name, setName] = useState({})

    // useEffect(() => {
    //     if(username)
    //   setName( capitalized(username))
    // }, [])
    return (
        <div >
            <h3 className="profile-name">{username}</h3>
            <figure className="profile-entry ">
                <img className="img-profile" src={imageUrl} />
            </figure>

            <hr />
        </div>
    )
}

export default ProfileCard
