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
    'child': [
      {
        'title':'KRM',
        'link': '/market/Ba3tsRSip58gUmpmFtX7RThp9cBZp2CspcT4HPvMDftq'
      },
      {
        'title':'SOL',
        'link': '/market/9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT'
      },
      {
        'title':'SRM',
        'link': '/market/ByRys5tuUWDgL73G8JBAEfkdFf8JWBzPBDHsBVQ5vbQA'
      },
      {
        'title':'FIDA',
        'link': '/market/E14BKBhDWD4EuTkWj1ooZezesGxMW8LPCps4W5PuzZJo'
      },
      {
        'title':'MNGO',
        'link': '/market/3d4rzwpy9iGdCZvgxcu7B1YocYffVLsQXPXkBZKt2zLc'
      },
      {
        'title':'RAY',
        'link': '/market/2xiv8A5xrJ7RnGdxXB42uFEkYHJjszEhaJyKKt4WaLep'
      },
      {
        'title':'DXL',
        'link': '/market/DYfigimKWc5VhavR4moPBibx9sMcWYVSjVdWvPztBPTa'
      },
      {
        'title':'TULIP',
        'link': '/market/8GufnKq7YnXKhnB3WNhgy5PzU9uvHbaaRrZWQK6ixPxW'
      },
      {
        'title':'BTC',
        'link': '/market/A8YFbxQYFVqKZaoYJLLUVcQiWP7G2MeEgW5wsAQgMvFw'
      },
      {
        'title':'ETH',
        'link': '/market/4tSvZvnbyzHXLMTiFonMyxZoHmFqau1XArcRCVHLZ5gX'
      },
      {
        'title':'BNB',
        'link': '/market/3zzTxtDCt9PimwzGrgWJEbxZfSLetDMkdYegPanGNpMf'
      },
      {
        'title':'LUNA',
        'link': '/market/HBTu8hNaoT3VyiSSzJYa8jwt9sDGKtJviSwFa11iXdmE'
      },
      {
        'title':'FTT',
        'link': '/market/2Pbh1CvRVku1TgewMfycemghf6sU9EyuFDcNXqvRmSxc'
      },
      {
        'title':'USDT',
        'link': '/market/Ec1aq54XKH9o5fe169cU2sCcxxTP54eeQCe77SpizKuc'
      },
      {
        'title':'MANA',
        'link': '/market/7GSn6KQRasgPQCHwCbuDjDCsyZ3cxVHKWFmBXzJUUW8P'
      },
      {
        'title':'SAND',
        'link': '/market/3FE2g3cadTJjN3C7gNRavwnv7Yh9Midq7h9KgTVUE7tR'
      },
      {
        'title':'AXSet',
        'link': '/market/HZCheduA4nsSuQpVww1TiyKZpXSAitqaXxjBD2ymg22X'
      },
      {
        'title':'CHICKS',
        'link': '/market/Eg8a9ZicLPSyak4CiXfiMeJK6jmHq57Xx5ag5GY6vcDj'
      },
      {
        'title':'SUSHI',
        'link': '/market/A1Q9iJDVVS8Wsswr9ajeZugmj64bQVCYLZQLra2TMBMo'
      },
      {
        'title':'UNI',
        'link': '/market/B7b5rjQuqQCuGqmUBWmcCTqaL3Z1462mo4NArqty6QFR'
      },
      {
        'title':'SHIB',
        'link': '/market/Er7Jp4PADPVHifykFwbVoHdkL1RtZSsx9zGJrPJTrCgW'
      },
    ]
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
  <Menu mode="horizontal" defaultSelectedKeys={['Trading']} style={{fontSize: '16px', display: 'flex', justifyContent: 'center',background: '#25262b'}} selectable={false} >
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
      <Wrapper style={{ background: '#25262b'}}>
        <Row wrap={false} style={{ paddingTop: 25, height: 80 }}>
          <Col flex="none">
            <LogoWrapper onClick={() => window.open('https://keramos.tech/')} style={{ paddingLeft: 40}}>
              <img src={logo} alt="" style={{ width: 145, height: 40, marginTop: 8 }} />
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
