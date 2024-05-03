"use client";
import React from "react";
import { Stars } from "@/app/shopall/_components/Stars";
import { useState , useEffect } from "react";



export function ReviewsCarrier({children}:{children:React.ReactNode}):JSX.Element{

    return(
        <div className="w-full h-full  flex flex-col">
            {children}
        </div>
    )
}



export function Review():JSX.Element{

    return(
        <div className="h-fit w-full flex flex-col">

            <div className="w-full h-[25%] flex justify-between items-center">
            <Name name="John Doe"/>
            <Date date="12/12/2021"/>
            </div>
                <Stars rating={3}/>
            <MainComment comment="This is a great product!"/>
            <Comment comment="I love this product! it's amazing and I would recommend it to anyone! "/>
            
        </div>
    )
}

export function Name({name}:{name:string}):JSX.Element{
    
        return(
            <div className="w-[10vw] h-[3vh] flex justify-start items-center">
                <h3 className="w-fit h-full text-thick text-nowrap font-wixMade text-sm font-bold flex justify-center items-center">{name}</h3>
                <CustomerStatus status="Customer"/>
            </div>
        )
}

export function MainComment({comment}:{comment:string}):JSX.Element{
    
        return(
            <div className="w-full h-fit ">
                <h2 className="font-wixMade font-semibold lg:text-lg md:text-base text-thick mt-2 mb-2">{comment}</h2>
            </div>
        )
}

export function Comment({comment}:{comment:string}):JSX.Element{
        
            return(
                <div className="w-full h-fit flex justify-between">
                    <h3 className=" text-textprimary lg:text-base sm:text-sm lg:w-[90%] md:w-[85%] xs:w-[60%]">{comment}</h3>
                    <Interactions likeCount={2} dislikeCount={0}/>
                </div>
            )
}

export function Date({date}:{date:string}):JSX.Element{
    
        return(
            <div className="w-fit h-[5vh] flex justify-end items-center font-wixMade text-sm">
                <h3>{date}</h3>
            </div>
        )

}


export function CustomerStatus({status}:{status:string}):JSX.Element{
        


    return(
        <div className="flex justify-center items-center w-fit h-[3vh] ml-2">
            <h2 className=" text-xs text-[#A4A4A4] text-nowrap">{status}</h2>
        </div>
    )

}

export function Interactions({likeCount,dislikeCount}:{likeCount:number,dislikeCount:number}):JSX.Element{

    const [like,setLike] = useState(likeCount);
    const [dislike,setDislike] = useState(dislikeCount);
    const [likeStatus,setLikeStatus] = useState(false);
    const [dislikeStatus,setDislikeStatus] = useState(false);

 
    return(
        <div className=" lg:w-[10%] md:w-[15%] xs:w-[25%] h-full flex justify-between items-center">

            <div className="h-full xl:w-[40%] lg:w-[45%] flex items-center">
            <img src={
                likeStatus ? "/Liked.svg" : "/Like.svg"
            } onClick={()=>{
              likeStatus ? setLike(like-1) : setLike(like+1);
                setLikeStatus(!likeStatus);
                dislikeStatus ? setDislike(dislike-1) : setDislike(dislike);
                setDislikeStatus(false);
            }
            }
             alt="Like" className="w-4 h-4 transition duration-75"/>
            <span className=" font-wixMade w-fit h-4 flex justify-center items-center ml-3">{like}</span>
            </div>
            <div className="h-full xl:w-[40%] lg:w-[45%] flex items-center">
            <img src={
                dislikeStatus ? "/Disliked.svg" : "/Dislike.svg"
            } onClick={()=>{
                dislikeStatus ? setDislike(dislike-1) :
                setDislike(dislike+1);
                setDislikeStatus(!dislikeStatus);
                likeStatus ? setLike(like-1) : setLike(like);
                setLikeStatus(false);
                
            }} alt="Like" className="w-4 h-4 transition duration-75"/>
            <span className=" font-wixMade w-fit h-4 flex justify-center items-center ml-3">{dislike}</span>
            </div>
                
        </div>
    )
}

export function Separator ():JSX.Element{
    return(
        <div className="w-full h-[1px] bg-[#A4A4A4] mb-3 mt-3"></div>
    )
}