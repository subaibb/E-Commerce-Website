


export default function ProfileButton({id}): JSX.Element {
    const handleSubmit = () => {
        console.log(id);
    }

    return (
                <button onClick={handleSubmit} className="Profile-Buttons mr-auto mt-auto mb-auto bg-[#96C7FF] text-default hover:bg-[#7FADE4] transition duration-150">View Profile</button>
    )
}