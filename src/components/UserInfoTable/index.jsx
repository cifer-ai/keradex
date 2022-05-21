import BalancesTable from './BalancesTable';
import OpenOrderTable from './OpenOrderTable';
import React, { useState } from 'react';
import { Col, Row } from 'antd';
import FillsTable from './FillsTable';
import FloatingElement from '../layout/FloatingElement';
import FeesTable from './FeesTable';
import { useOpenOrders, useBalances, useMarket } from '../../utils/markets';

export default function Index({ smallScreen }) {
  const { market } = useMarket();
  const marketAddress = market?.address.toString();
  const [activeKeyStr, setActiveKeyStr] = useState('orders');
  if (smallScreen) {
    return (
      <FloatingElement style={{ flex: 1, paddingTop: 4 }}>
        <Row>
          <Col
            span={24 / (market && market.supportsSrmFeeDiscounts ? 4 : 3)}
            onClick={() => setActiveKeyStr('orders')}
            style={{
              width: '50%',
              textAlign: 'center',
              border: 'transparent',
              borderBottom:
                activeKeyStr === 'orders' ? '1px solid #72d4b9' : '',
              borderImage:	'linear-gradient(90deg, #d3eaed 0%, #e2cdf7 30%, #86a2db 100%) 1',
              textTransform: 'uppercase',
              background: 'transparent',
              fontSize: 13,
              fontStyle: 'normal',
              fontWeight: 600,
              color:
                activeKeyStr === 'orders'
                  ? '#E3E4FF'
                  : '#828aa1',
              padding: '12px 0 12px',
            }}
          >
            Open Orders
          </Col>
          <Col
            span={24 / (market && market.supportsSrmFeeDiscounts ? 4 : 3)}
            onClick={() => setActiveKeyStr('fills')}
            style={{
              width: '50%',
              textAlign: 'center',
              border: 'transparent',
              borderBottom: activeKeyStr === 'fills' ? '1px solid #72d4b9' : '',
              borderImage:	'linear-gradient(90deg, #d3eaed 0%, #e2cdf7 30%, #86a2db 100%) 1',
              textTransform: 'uppercase',
              background: 'transparent',
              fontSize: 13,
              fontStyle: 'normal',
              fontWeight: 600,
              color:
                activeKeyStr === 'fills'
                  ? '#E3E4FF'
                  : '#828aa1',
              padding: '12px 0 12px',
            }}
          >
            Recent Trade History
          </Col>
          <Col
            span={24 / (market && market.supportsSrmFeeDiscounts ? 4 : 3)}
            onClick={() => setActiveKeyStr('balances')}
            style={{
              width: '50%',
              textAlign: 'center',
              border: 'transparent',
              borderBottom:
                activeKeyStr === 'balances' ? '1px solid #72d4b9' : '',
              borderImage:	'linear-gradient(90deg, #d3eaed 0%, #e2cdf7 30%, #86a2db 100%) 1',
              textTransform: 'uppercase',
              background: 'transparent',
              fontSize: 13,
              fontStyle: 'normal',
              fontWeight: 600,
              color:
                activeKeyStr === 'balances'
                  ? '#E3E4FF'
                  : '#828aa1',
              padding: '12px 0 12px',
            }}
          >
            Balances
          </Col>
          {market && market.supportsSrmFeeDiscounts ? (
            <Col
              span={24 / (market && market.supportsSrmFeeDiscounts ? 4 : 3)}
              onClick={() => setActiveKeyStr('fees')}
              style={{
                width: '50%',
                textAlign: 'center',
                border: 'transparent',
                borderBottom:
                  activeKeyStr === 'fees' ? '1px solid #72d4b9' : '',
                borderImage:	'linear-gradient(90deg, #d3eaed 0%, #e2cdf7 30%, #86a2db 100%) 1',
                textTransform: 'uppercase',
                background: 'transparent',
                fontSize: 13,
                fontStyle: 'normal',
                fontWeight: 600,
                color:
                  activeKeyStr === 'fees'
                    ? '#E3E4FF'
                    : '#828aa1',
                padding: '12px 0 12px',
              }}
            >
              Fee Discounts
            </Col>
          ) : null}
        </Row>
        <div
          style={{
            border: '1px solid #141416',
            minHeight: 50,
            borderBottom: '',
            padding: 16,
          }}
        >
          {activeKeyStr && activeKeyStr === 'orders' ? <OpenOrdersTab /> : null}
          {activeKeyStr && activeKeyStr === 'fills' ? <FillsTable /> : null}
          {activeKeyStr && activeKeyStr === 'balances' ? <BalancesTab /> : null}
          {activeKeyStr && activeKeyStr === 'fees' ? (
            <FeesTable market={{ marketAddress }} />
          ) : null}
        </div>
      </FloatingElement>
    );
  } else {
    return (
      <FloatingElement style={{ flex: 1, paddingTop: 4 }}>
        <Row>
          <Col
            span={24 / (market && market.supportsSrmFeeDiscounts ? 4 : 3)}
            onClick={() => setActiveKeyStr('orders')}
            style={{
              height: 42,
              width: '50%',
              textAlign: 'center',
              border: 'transparent',
              borderBottom:
                activeKeyStr === 'orders' ? '1px solid #72d4b9' : '',
              borderImage:	'linear-gradient(90deg, #d3eaed 0%, #e2cdf7 30%, #86a2db 100%) 1',
              textTransform: 'uppercase',
              background: 'transparent',
              fontSize: 13,
              fontStyle: 'normal',
              fontWeight: 600,
              color:
                activeKeyStr === 'orders'
                  ? '#E3E4FF'
                  : '#828aa1',
              padding: '12px 0 12px',
            }}
          >
            Open Orders
          </Col>
          <Col
            span={24 / (market && market.supportsSrmFeeDiscounts ? 4 : 3)}
            onClick={() => setActiveKeyStr('fills')}
            style={{
              height: 42,
              width: '50%',
              textAlign: 'center',
              border: 'transparent',
              borderBottom: activeKeyStr === 'fills' ? '1px solid #72d4b9' : '',
              borderImage:	'linear-gradient(90deg, #d3eaed 0%, #e2cdf7 30%, #86a2db 100%) 1',
              textTransform: 'uppercase',
              background: 'transparent',
              fontSize: 13,
              fontStyle: 'normal',
              fontWeight: 600,
              color:
                activeKeyStr === 'fills'
                  ? '#E3E4FF'
                  : '#828aa1',
              padding: '12px 0 12px',
            }}
          >
            Recent Trade History
          </Col>
          <Col
            span={24 / (market && market.supportsSrmFeeDiscounts ? 4 : 3)}
            onClick={() => setActiveKeyStr('balances')}
            style={{
              height: 42,
              width: '50%',
              textAlign: 'center',
              border: 'transparent',
              borderBottom:
                activeKeyStr === 'balances' ? '1px solid #72d4b9' : '',
              borderImage:	'linear-gradient(90deg, #d3eaed 0%, #e2cdf7 30%, #86a2db 100%) 1',
              textTransform: 'uppercase',
              background: 'transparent',
              fontSize: 13,
              fontStyle: 'normal',
              fontWeight: 600,
              color:
                activeKeyStr === 'balances'
                  ? '#E3E4FF'
                  : '#828aa1',
              padding: '12px 0 12px',
            }}
          >
            Balances
          </Col>
          {market && market.supportsSrmFeeDiscounts ? (
            <Col
              span={24 / (market && market.supportsSrmFeeDiscounts ? 4 : 3)}
              onClick={() => setActiveKeyStr('fees')}
              style={{
                height: 42,
                width: '50%',
                textAlign: 'center',
                border: 'transparent',
                borderBottom:
                  activeKeyStr === 'fees' ? '1px solid #72d4b9' : '',
                borderImage:	'linear-gradient(90deg, #d3eaed 0%, #e2cdf7 30%, #86a2db 100%) 1',
                textTransform: 'uppercase',
                background: 'transparent',
                fontSize: 13,
                fontStyle: 'normal',
                fontWeight: 600,
                color:
                  activeKeyStr === 'fees'
                    ? '#E3E4FF'
                    : '#828aa1',
                padding: '12px 0 12px',
              }}
            >
              Fee Discounts
            </Col>
          ) : null}
        </Row>
        <div
          style={{
            border: '1px solid #141416',
            height: 400,
            borderBottom: '',
            padding: 16,
          }}
        >
          {activeKeyStr && activeKeyStr === 'orders' ? <OpenOrdersTab /> : null}
          {activeKeyStr && activeKeyStr === 'fills' ? <FillsTable /> : null}
          {activeKeyStr && activeKeyStr === 'balances' ? <BalancesTab /> : null}
          {activeKeyStr && activeKeyStr === 'fees' ? (
            <FeesTable market={{ marketAddress }} />
          ) : null}
        </div>
      </FloatingElement>
    );
  }
}

const OpenOrdersTab = () => {
  const openOrders = useOpenOrders();

  return <OpenOrderTable openOrders={openOrders} />;
};

const BalancesTab = () => {
  const balances = useBalances();

  return <BalancesTable balances={balances} />;
};
