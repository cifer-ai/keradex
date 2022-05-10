import { Col, Row, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import styled from 'styled-components';
import { ENDPOINTS, useConnectionConfig } from '../utils/connection';
import CustomClusterEndpointDialog from './CustomClusterEndpointDialog';
import { EndpointInfo } from '../utils/types';
import { notify } from '../utils/notifications';
import { Connection } from '@solana/web3.js';
import WalletConnect from './WalletConnect';
import { getTradePageUrl } from '../utils/markets';

const Wrapper = styled.div`
  // flex-direction: row;
  // justify-content: flex-end;
  // flex-wrap: wrap;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #56DCD7;
  font-weight: bold;
  cursor: pointer;
  img {
    height: 30px;
    margin-right: 8px;
  }
`;

const MENU = [
   {
    'title': 'TRADE',
    'link': '/',
  },
  {
    'title': 'SWAP',
    'link': '/',
  },
  {
    'title': 'FARMS',
    'link': '/',
  },
  {
    'title': 'POOLS',
    'link': '/',
  },
  {
    'title': 'LIQUIDITY',
    'link': '/',
  },
  {
    'title': 'INFO',
    'child': [
      {
        'title': 'KERAMOS LANDING',
        'link': 'https://www.keramos.tech/'
      },
      {
        'title': 'READ DOCS',
        'link': 'https://keramos.gitbook.io/keramos-docs/'
      },
      {
        'title': 'LITEPAPER V1',
        'link': 'https://docs.google.com/viewer?url=https://raw.githubusercontent.com/keramostech/docs/main/Litepaper/Keramos_Litepaper_V1.pdf'
      },
    ]
  },
  
]

export default function TopBar() {
  const {
    endpointInfo,
    setEndpoint,
    availableEndpoints,
    setCustomEndpoints,
  } = useConnectionConfig();
  const [addEndpointVisible, setAddEndpointVisible] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const onAddCustomEndpoint = (info: EndpointInfo) => {
    const existingEndpoint = availableEndpoints.some(
      (e) => e.endpoint === info.endpoint,
    );
    if (existingEndpoint) {
      notify({
        message: `An endpoint with the given url already exists`,
        type: 'error',
      });
      return;
    }

    const handleError = (e) => {
      console.log(`Connection to ${info.endpoint} failed: ${e}`);
      notify({
        message: `Failed to connect to ${info.endpoint}`,
        type: 'error',
      });
    };

    try {
      const connection = new Connection(info.endpoint, 'recent');
      connection
        .getEpochInfo()
        .then((result) => {
          setTestingConnection(true);
          console.log(`testing connection to ${info.endpoint}`);
          const newCustomEndpoints = [
            ...availableEndpoints.filter((e) => e.custom),
            info,
          ];
          setEndpoint(info.endpoint);
          setCustomEndpoints(newCustomEndpoints);
        })
        .catch(handleError);
    } catch (e) {
      handleError(e);
    } finally {
      setTestingConnection(false);
    }
  };

  const endpointInfoCustom = endpointInfo && endpointInfo.custom;
  useEffect(() => {
    const handler = () => {
      if (endpointInfoCustom) {
        setEndpoint(ENDPOINTS[0].endpoint);
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [endpointInfoCustom, setEndpoint]);

  const tradePageUrl = location.pathname.startsWith('/market/')
    ? location.pathname
    : getTradePageUrl();
  
    const { SubMenu } = Menu;

  const menuDiv = 
  <Menu mode="horizontal" defaultSelectedKeys={['Trading']} style={{fontSize: '16px', display: 'flex', justifyContent: 'center',background: '#1D1E21'}} selectable={false} >
    {MENU.map(item => {
      if (item.child === undefined) {
        return <Menu.Item key={item.title}><a href={item.link} target={item.link.startsWith('/') ? '_self' : '_blank'} rel="noopener noreferrer">{item.title}</a></Menu.Item>
      } else {
        return <SubMenu key={item.title} title={item.title}>
          {item.child.map(itemChild => <Menu.Item key={itemChild.title}><a href={itemChild.link} target={itemChild.link.startsWith('/') ? '_self' : '_blank'} rel="noopener noreferrer">{itemChild.title}</a></Menu.Item>)}
        </SubMenu>
      }
    }
    )}
    </Menu>

  return (
    <>
      <CustomClusterEndpointDialog
        visible={addEndpointVisible}
        testingConnection={testingConnection}
        onAddCustomEndpoint={onAddCustomEndpoint}
        onClose={() => setAddEndpointVisible(false)}
      />
      <Wrapper style={{ background: '#1D1E21'}}>
        <Row wrap={false} style={{ paddingTop: 25, height: 70 }}>
          <Col flex="none">
            <LogoWrapper onClick={() => window.open('https://keramos.tech/')} style={{ paddingLeft: 40}}>
              <img src={logo} alt="" style={{ width: 145, height: 40 }} />
            </LogoWrapper>
          </Col>
          <Col flex="auto" style={{ textAlign: 'center'}}>
            {menuDiv}
          </Col>
          <Col flex="none" style={{ paddingRight: 20}}>
            <WalletConnect />
          </Col>
        </Row>
      </Wrapper>
    </>
  );
}
