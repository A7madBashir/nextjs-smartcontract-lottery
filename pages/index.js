import Head from "next/head"
import styles from "../styles/Home.module.css"
import ManualHeader from "../components/ManualHeader"
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Our Samrt Contract Lottery!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <ManualHeader /> */}
      <div className="header">
        <h1>Decentralized Lottery</h1>
        <Header />
      </div>
      <hr />
      <br />
      <LotteryEntrance />
      <h1>Hellooo!</h1>
    </div>
  )
}
