import { useContext } from 'react'
import { challegesContexts } from '../../contexts/ChallegesContexts'
import styles from '../../styles/components/ExperienceBar.module.css'
export function ExperienceBar(){
    const {currentExperience,experienceToNextLevel} = useContext(challegesContexts)

    const percentToNextLevel = Math.round((currentExperience * 100)) / experienceToNextLevel
      
    return(
        <header className={styles.experienceBar}>
           
            <span>0 xp</span>
            <div>
                <div style={{width:`${percentToNextLevel}%`}}></div>
            </div>
            <span className={styles.currentExperience} style={{left:`${percentToNextLevel}%`}}>
            {currentExperience} xp
            </span>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}