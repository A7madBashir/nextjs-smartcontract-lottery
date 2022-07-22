import React from "react"
import { ConnectButton } from "web3uikit"
export default function Header() {
  return (
    <div>
      <ConnectButton moralisAuth={false} />
    </div>
  )
}
