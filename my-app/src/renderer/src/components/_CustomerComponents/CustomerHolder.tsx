import CustomerLabel from './CustomerLabel';

export default function CustomerHolder(): JSX.Element {
    return (
        <div className=" absolute w-[78.8vw] h-[72vh] top-[20vh] left-[14.6vw] grid grid-cols-4 gap-10">
            <CustomerLabel delay={0.1}/>
            <CustomerLabel delay={0.16}/>
            <CustomerLabel delay={0.22}/>
            <CustomerLabel delay={0.28}/>
            <CustomerLabel delay={0.34}/>
            <CustomerLabel delay={0.40}/>
            <CustomerLabel delay={0.46}/>
            <CustomerLabel delay={0.52}/>
        </div>
    )
}