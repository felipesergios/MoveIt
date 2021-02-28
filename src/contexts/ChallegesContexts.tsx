import {createContext, useState,ReactNode, useEffect} from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type:'body'|'eye';
    description:string;
    amount:number;

}

interface ChallegesContextsData {
    level:number;
    currentExperience:number;
    challegesCompleted:number;
    experienceToNextLevel:number;
    levelUp:()=>void;
    startNewChallege:()=>void;
    resetChallege:()=>void;
    completeChallege:()=>void;
    closedModal:()=>void;
    activeChallenge:Challenge;
}

interface ChallegeProviderProps{
    children:ReactNode;
        level:number,
        currentExperience:number,
        challegeCompleted:number
    
}


export const challegesContexts = createContext({} as ChallegesContextsData)
export function ChallegeProvider({children,...rest}:ChallegeProviderProps){
    const [level,setLevel] = useState(rest.level ?? 1);
    const [currentExperience,setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challegesCompleted,setChallegesCompleted] = useState(rest.challegeCompleted ?? 0);
    const [activeChallenge,setActiveChallenge] = useState(null);
    const [isOpenModal,setIsOpenModal] = useState(false)

    const experienceToNextLevel = Math.pow((level+1)*4,2)
    useEffect(()=>{
        Notification.requestPermission()
    },[])

    useEffect(()=>{
        Cookies.set('level',String(level))
        Cookies.set('currentExperience',String(currentExperience))
        Cookies.set('challegesCompleted',String(challegesCompleted))

    },[level,currentExperience,challegesCompleted])

    function levelUp(){
        setLevel(level+1);
        setIsOpenModal(true)
    }
    function closedModal(){
        setIsOpenModal(false)
    }

    function startNewChallege(){
        const randomChallegeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallegeIndex]
        setActiveChallenge(challenge)
        new Audio('/notification.mp3').play()
        if(Notification.permission == 'granted'){
            new Notification('Novo desafio :) ',{
                body:`Valendo ${challenge.amount} de xp`
            })
        }
    }
    function resetChallege(){
        setActiveChallenge(null);
    }

    function completeChallege(){
        if(!activeChallenge){
            return
        }
        const  {amount} = activeChallenge
        let finalXp = currentExperience+amount
        if(finalXp >= experienceToNextLevel){
            finalXp -= experienceToNextLevel
            levelUp()
        }
        setCurrentExperience(finalXp)
        setActiveChallenge(null)
        setChallegesCompleted(challegesCompleted+1)
    }

    return(
        <challegesContexts.Provider value={{closedModal,experienceToNextLevel,level,currentExperience,challegesCompleted,levelUp,startNewChallege,activeChallenge,resetChallege,completeChallege}}>
            {children}
            {isOpenModal && <LevelUpModal/>}
        </challegesContexts.Provider>
    )
}