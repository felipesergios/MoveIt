import { useContext } from 'react'
import { challegesContexts } from '../../contexts/ChallegesContexts'
import { CountContext } from '../../contexts/CountDownContext'
import styles from '../../styles/components/BoxChallege.module.css'
export function BoxChallege(){

    const {activeChallenge ,resetChallege,completeChallege} = useContext(challegesContexts)
    //const ActiveChallege = true
    const {resetCoutdown} = useContext(CountContext)

    function handleChellengeSucceed(){
        completeChallege()
        resetCoutdown()
    }


    function handleChellengeFailed(){
        resetChallege()
        resetCoutdown()
    }
    return(
        <div className={styles.BoxContainer}>
            {activeChallenge ? (
                <div className={styles.isActive}>
                    <header>Ganhe {activeChallenge.amount} de xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button onClick={handleChellengeFailed} className={styles.FailButton} type="button">Failhei</button>
                        <button onClick={handleChellengeSucceed} className={styles.SucessButton} type="button">Completei !</button>
                    </footer>
                </div>
            ):(
                <div className={styles.isNotActive}>
                <strong>Finalize um desafio para subir de level</strong>
                <p>
                    <img src="icons/level-up.svg" alt="level-up"/>
                    Avançe para o próximo nível
                </p>
            </div>
            )}
        </div>
    )
}