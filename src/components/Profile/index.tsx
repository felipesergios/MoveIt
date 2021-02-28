import { useContext } from 'react'
import { challegesContexts } from '../../contexts/ChallegesContexts'
import styles from '../../styles/components/Profile.module.css'

export function Profile(){
    const {level} = useContext(challegesContexts)
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/felipesergios.png" alt="profile image"/>
            <div>
                <strong>Felipe sergio</strong>
                <p>
                    <img src="images/icons/level.svg" alt=""/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}