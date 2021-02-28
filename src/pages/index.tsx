

import {ExperienceBar} from '../components/ExperienceBar'
import {Profile} from '../components/Profile'
import {CompetedChalleges} from '../components/CompletedChalleges'
import {Coutdown} from '../components/Countdown'
import Head from 'next/head'
import styles from '../styles/pages/Home.module.css'
import { BoxChallege } from '../components/BoxChallege'
import { CountDownProvider } from '../contexts/CountDownContext'
import { GetServerSideProps } from 'next'
import { ChallegeProvider } from '../contexts/ChallegesContexts'

interface HomeProps{
  level:Number,
  currentExperience:Number,
  challegeCompleted:Number
}

export default function Home(props){
  console.log(props)
  return (
    <ChallegeProvider
    level={props.level}
    currentExperience = {props.currentExperience}
    challegeCompeted = {props.challegesCompleted}
    >
    <div className={styles.container}>
      <Head>
        <title>Move|it</title>
      </Head>
    <ExperienceBar/>
    <CountDownProvider>
    <section>
      <div>
          <Profile/>
          <CompetedChalleges/>
          <Coutdown />
      </div>

      <div>
        <BoxChallege/>
      </div>
    </section>
    </CountDownProvider>
  </div>
  </ChallegeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx)=>{
  const {level,currentExperience,challegesCompleted} = ctx.req.cookies
  
  return{
    props:{
      level:Number(level),
      currentExperience:Number(currentExperience),
      challegesCompleted:Number(challegesCompleted)
    }
  }
}