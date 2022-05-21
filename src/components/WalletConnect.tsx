import React from 'react';
import { Dropdown, Menu } from 'antd';
import { useWallet } from '../utils/wallet';
import LinkAddress from './LinkAddress';
import walletconnect from '../assets/icon/msic-wallet.svg';
import walletdisconnect from '../assets/icon/msic-wallet-connected.svg';

export default function WalletConnect() {
  const { connected, wallet, select, connect, disconnect } = useWallet();
  const publicKey = (connected && wallet?.publicKey?.toBase58()) || '';

  const menu = (
    <Menu>
      {connected && <LinkAddress shorten={true} address={publicKey} />}
      <Menu.Item key="3" onClick={select}>
        SELECT WALLET
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown.Button onClick={connected ? disconnect : connect} overlay={menu}>
      {connected ? <img alt="" src={walletdisconnect} style={{ width: 18, marginRight: 10, marginBottom: 2 }}/> : <img alt="" src={walletconnect} style={{ width: 18, marginRight: 10, marginBottom: 2 }}/>}
      {connected ? 'DISCONNECT' : 'CONNECT'}
    </Dropdown.Button>
  );
}
