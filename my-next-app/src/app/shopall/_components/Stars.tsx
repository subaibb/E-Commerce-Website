



export function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex">
        {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return (

                <img key={i} className="w-4 h-4 relative" src={starValue <= rating ? "/FullStar.svg" : "/Star.svg"} alt="" />
            );
        })}
        </div>
    );
}

