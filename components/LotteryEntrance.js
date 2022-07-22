import React, { useCallback, useEffect, useState } from "react"
import { useWeb3Contract } from "react-moralis/"
import { abi, contractAddresses } from "../constants/output"
import { useMoralis } from "react-moralis"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
  const [entranceFee, setEntranceFee] = useState("0")
  const [numPlayers, setNumPlayers] = useState("0")
  const [recentWinner, setRecentWinner] = useState("0")

  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const dispatch = useNotification()

  const chainId = parseInt(chainIdHex)
  console.log(parseInt(chainIdHex))
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null
  const {
    runContractFunction: enterRaffle,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    msgValue: entranceFee,
    params: {},
  })

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
  })

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
  })
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
  })

  async function updateUI() {
    let entranceFeeFromCall = (await getEntranceFee()).toString()
    let numPlayersFromCall = (await getNumberOfPlayers()).toString()
    let recentWinnerFromCall = (await getRecentWinner()).toString()

    setEntranceFee(entranceFeeFromCall)
    setNumPlayers(numPlayersFromCall)
    setRecentWinner(recentWinnerFromCall)
    console.log(entranceFee.toString())
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI()
    }
  }, [isWeb3Enabled])

  const handleSuccess = async (tx) => {
    await tx.wait(1)
    updateUI()
    handleNewNotification(tx)
  }
  const handleNewNotification = function () {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Tx Notification",
      position: "topR",
      icon: "bell",
    })
  }

  return (
    <div>
      {raffleAddress ? (
        <>
          <button
            onClick={async () => {
              await enterRaffle({
                onSuccess: handleSuccess,
                onError: (error) => console.error(error),
              })
            }}
            disabled={isFetching || isLoading}
          >
            Enter Raffle
          </button>
          <h1>
            Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")}ETH
          </h1>
          <h2>Players:{numPlayers}</h2>
          <h2>RecentWinner:{recentWinner}</h2>
        </>
      ) : (
        <div>No Raffle Address detech</div>
      )}
    </div>
  )
}
