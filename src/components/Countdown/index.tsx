import { useContext, useEffect, useState } from 'react'
import { challegesContexts } from '../../contexts/ChallegesContexts'
import { CountContext } from '../../contexts/CountDownContext'

import styles from '../../styles/components/Coutdown.module.css'

export function Coutdown(){

  const {hasFinish,isActive,minutes,seconds,resetCoutdown,startCountdown} = useContext(CountContext)

   


    const [minuteLeaf,minuteRight] = String(minutes).padStart(2,'0').split('')

    const [secondLeft,secondRight] = String(seconds).padStart(2,'0').split('')


    
    return(

        <div>
                <div className={styles.containerCountdown}>
                <div>
                    <span>{minuteLeaf}</span>
                    <span>{minuteRight}</span>
                </div>
                <span></span>
                <div><span> : </span></div>
                <span></span>
                <div>
                
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
                
            </div>

            {hasFinish ? (
                 <button disabled className={styles.startButton}>
                 É isso ai , você completou o ciclo !!
                 
                 </button>
            ):(
               <>
               {isActive?(
                <button onClick={resetCoutdown} type="button" className={`${styles.startButton} ${styles.startButtonActive}`}>
                Deixar o ciclo :(
                
                </button>
            ):(
                <button onClick={startCountdown} type="button" className={styles.startButton}>
               Começar novo ciclo :)
                
                </button>
            )}
               </>
            )}

            
            

                
        </div>
    )
}