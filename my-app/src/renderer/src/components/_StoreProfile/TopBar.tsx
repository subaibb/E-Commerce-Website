import Analytics from "./Analytics"
import ProfileInfo from "./ProfileInfo"
export default function  TopBar (): JSX.Element {

    return (
        <div className=" relative w-[78.9vw] h-[45.2vh] flex mb-auto">
            <Analytics />
            <ProfileInfo />
        </div>
    )
    
}




