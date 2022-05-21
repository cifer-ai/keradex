import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useMarket, useRaydiumTrades } from '../utils/markets';
import { getDecimalCount } from '../utils/utils';
import FloatingElement from './layout/FloatingElement';
import { TradeLayout } from '../utils/types';

const Title = styled.div`
  color: rgba(227, 228, 255, 1);
`;
const SizeTitle = styled(Row)`
  padding: 20px 0 14px;
  color: #434a59;
`;

export default function PublicTrades({ smallScreen }) {
  const { baseCurrency, quoteCurrency, market } = useMarket();
  const [trades, loaded] = useRaydiumTrades();

  return (
    <FloatingElement
      style={
        {
          ...(smallScreen
            ? { flex: 1 }
            : {
              // marginTop: '10px',
              minHeight: '400px',
              maxHeight: 'calc(100vh - 700px)',
            }),
        }
      }
    >
      <Title
        style={{
          color: '#E3E4FF',
          fontSize: 13,
          textTransform: 'uppercase',
          fontWeight: 600,
          lineHeight: '28px',
          borderBottom: '1px solid #141416',
          padding: '12px 0 6px 16px',
        }}
      >Recent Market trades</Title>
      <SizeTitle>
        <Col span={8} style={{ textAlign: 'left', paddingLeft: 16, color: '#828aa1', fontSize: 12 }}>Price ({quoteCurrency}) </Col>
        <Col span={8} style={{ textAlign: 'left', paddingLeft: 16, color: '#828aa1', fontSize: 12 }}>
          Size ({baseCurrency})
        </Col>
        <Col span={8} style={{ textAlign: 'left', paddingLeft: 16, color: '#828aa1', fontSize: 12 }}>
          Time
        </Col>
      </SizeTitle>
      {!!trades && loaded && (
        <div
          style={{
            marginRight: '-10px',
            marginLeft: '16px',
            paddingRight: '5px',
            overflowY: 'scroll',
            // maxHeight: smallScreen
            //   ? 'calc(100% - 75px)'
            //   : 'calc(100vh - 800px)',
            height: 350
          }}
        >
          {trades.map((trade: TradeLayout, i: number) => (
            <Row key={i} style={{ marginBottom: 4, marginRight: 4 }}>
              <Col
                span={8}
                style={{
                  color: trade.side === 'buy' ? '#72d4b9' : '#eb4476',
                  fontSize: 12,
                }}
              >
                {market?.tickSize && !isNaN(trade.price)
                  ? Number(trade.price).toFixed(
                      getDecimalCount(market.tickSize),
                    )
                  : trade.price}
              </Col>
              <Col span={8} style={{ textAlign: 'right', fontSize: 12, paddingRight: 10, color: '#E3E4FF', }}>
                {market?.minOrderSize && !isNaN(trade.size)
                  ? Number(trade.size).toFixed(
                      getDecimalCount(market.minOrderSize),
                    )
                  : trade.size}
              </Col>
              <Col span={8} style={{ textAlign: 'right', color: '#434a59', fontSize: 12, }}>
                {trade.time && new Date(trade.time).toLocaleTimeString()}
              </Col>
            </Row>
          ))}
        </div>
      )}
    </FloatingElement>
  );
}
