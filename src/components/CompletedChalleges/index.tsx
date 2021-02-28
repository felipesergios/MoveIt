import { useContext } from 'react'
import { challegesContexts } from '../../contexts/ChallegesContexts'
import styles from '../../styles/components/CompletedChalleges.module.css'
export function CompetedChalleges(){
    const {challegesCompleted} = useContext(challegesContexts)
    return(
        <div className={styles.CompleteContainer}>
            <span>Desafios completos </span>
            <span>{challegesCompleted}</span>
        </div>
    )
}