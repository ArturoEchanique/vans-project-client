

const ProfileCard = ({ username, imageUrl }) => {
    return (
        <div>
            <h1>{username}</h1>
            <img src={imageUrl} />
            <hr />
        </div>
    )
}

export default ProfileCard
