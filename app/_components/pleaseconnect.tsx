   
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React, { Component } from 'react'

type Props = {}

type State = {}

export default class Pleaseconnect extends Component<Props, State> {
  state = {}

  render() {
    return (
    <div style={ { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "15px", height:"100%" } }>
            <h1 style={{ marginBottom:"15px", fontSize:"20px", fontWeight:"initial", color:"GrayText"}} >You need to connect your wallet first!</h1>
            <ConnectButton></ConnectButton>

    </div>
    )
  }
}

