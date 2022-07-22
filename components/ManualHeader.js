import { useEffect } from "react"
import { useMoralis } from "react-moralis"

export default function ManualHeader() {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis()

  useEffect(() => {
    console.log("Entering First Connect Section!")
    if (!isWeb3Enabled && typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3()
      }
    }
  }, [isWeb3Enabled])

  useEffect(() => {
    console.log("Entering Secound Connect Section!")
    Moralis.onAccountChanged((account) => {
      console.log("Changing Account to " + account)
      if (account == null) {
        window.localStorage.removeItem("connected")
        deactivateWeb3()
        console.log("Null Account Found!")
      }
    })
  }, [])
  return (
    <div>
      <h1>My ManualHeader</h1>
      {account ? (
        <div style={{ color: "orangered", fontSize: 30 }}>
          Connected! to {account.slice(0, 6)}...
          {account.slice(account.length - 4)}
        </div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3()
            if (typeof window !== "undefined") {
              window.localStorage.setItem("connected", "injected")
            }
          }}
          disabled={isWeb3EnableLoading}
        >
          connect
        </button>
      )}
    </div>
  )
}
