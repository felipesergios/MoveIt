import { ReactNode, useContext, useEffect, useState ,createContext } from "react";
import { challegesContexts } from "./ChallegesContexts";

interface CountDownContextData{
    minutes:number;
    seconds:number;
    hasFinish:boolean;
    isActive:boolean;
    startCountdown:()=>void;
    resetCoutdown:()=>void;
}

interface CountDownProviderProps{
    children:ReactNode;
}
let countdownTimeout: NodeJS.Timeout

export const CountContext = createContext({} as CountDownContextData)
export function CountDownProvider({children}:CountDownProviderProps){
    const {startNewChallege} = useContext(challegesContexts)


    const [time,setTime] = useState(0.05*60)
    const [isActive,setisActive] = useState(false)
    const [hasFinish,sethasFinish] = useState(false)
    const minutes = Math.floor(time/60)
    const seconds = time % 60

    function startCountdown(){
        setisActive(true)
    }
    function resetCoutdown(){
        clearTimeout(countdownTimeout)
        sethasFinish(false)
        setisActive(false);
        setTime(0.05*60)
        
    }

    useEffect(()=>{
        if(isActive && time >0){
            countdownTimeout =  setTimeout(()=>{
                setTime(time - 1)
            },1000)
        } else if(isActive && time == 0){
            sethasFinish(true)
            setisActive(false)
            startNewChallege()
        }
    },[isActive,time])
    return (
        <CountContext.Provider value={{
            minutes,
            seconds,
            hasFinish,
            isActive,
            startCountdown,
            resetCoutdown,
        }}>
            {children}
        </CountContext.Provider>
    )
}

