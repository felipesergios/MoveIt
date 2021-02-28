import { useContext } from 'react'
import { challegesContexts } from '../../contexts/ChallegesContexts'
import styles from '../../styles/components/LevelUpModal.module.css'
export function LevelUpModal (){
    const {level,closedModal} =useContext(challegesContexts)
    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você chegou ao próximo nível</p>
                <button onClick={closedModal} type="button">
                    <img src="/icons/close.svg" alt="close modal"/>
                </button>
            </div>
        </div>
    )
}