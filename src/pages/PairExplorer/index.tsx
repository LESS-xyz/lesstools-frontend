import s from './PairExplorer.module.scss';
import AdBlock from '../../components/AdBlock/index';
import ad from '../../assets/img/sections/ad/ad1.png';
import Table from '../../components/Table/index';
import { IRowPairExplorer } from '../../types/table';
import { useState } from 'react';
import PairInfoHeader from './PairInfoCard/PairInfoHeader/index';
import PairInfoBody from './PairInfoCard/PairInfoBody/index';
import PairInfoBottom from './PairInfoCard/PairInfoBottom/index';
import Search from '../../components/Search/index';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const headerData = [
  { key: 'data', title: 'Data' },
  { key: 'type', title: 'Type' },
  { key: 'priceUsd', title: 'Price USD' },
  { key: 'priceEth', title: 'Price ETH' },
  { key: 'amountEth', title: 'Amount ETH' },
  { key: 'totalEth', title: 'Total ETH' },
  { key: 'maker', title: 'Maker' },
  { key: 'Others', title: 'Others' },
];

const tableData: Array<IRowPairExplorer> = [
  {
    data: '2021-06-11 13:31:08',
    type: 'sell',
    priceUsd: 12.1212121,
    priceEth: 0.000045364,
    amountEth: 605.22250303,
    totalEth: 0.0294544,
    maker: '0xa3b0e79935815730d942a444a84d4bd14a339553',
    others: { liveData: '0xrwerwerw435', etherscan: '0xdgkdsfksad' },
  },
  {
    data: '2021-06-11 13:31:08',
    type: 'buy',
    priceUsd: 0.12555,
    priceEth: 0.000045364,
    amountEth: 5.22250303,
    totalEth: 0.0294544,
    maker: '0xa3b0e79935815730d942a444a84d4bd14a339553',
    others: { liveData: '0xrwerwerw435', etherscan: '0xdgkdsfksad' },
  },
  {
    data: '2021-06-11 13:31:08',
    type: 'sell',
    priceUsd: 12.1212131,
    priceEth: 0.000045364,
    amountEth: 6.22250303,
    totalEth: 0.0294544,
    maker: '0xa3b0e79935815730d942a444a84d4bd14a339553',
    others: { liveData: '0xrwerwerw435', etherscan: '0xdgkdsfksad' },
  },
  {
    data: '2021-06-11 13:31:08',
    type: 'sell',
    priceUsd: 1.1212121,
    priceEth: 0.000045364,
    amountEth: 635.22250303,
    totalEth: 0.0294544,
    maker: '0xa3b0e79935815730d942a444a84d4bd14a339553',
    others: { liveData: '0xrwerwerw435', etherscan: '0xdgkdsfksad' },
  },
];

const PairExplorer: React.FC = () => {
  const [bottomType, setBottomType] = useState<'tradeHistory' | 'myPositions' | 'priceAlerts'>(
    'tradeHistory',
  );
  const [searchValue, setSearchValue] = useState('');
  return (
    <main className={s.page}>
      <div className={s.container}>
        <AdBlock adImg={ad} />

        <div className={s.info}>
          <PairInfoHeader />
          <Search value={searchValue} onChange={setSearchValue} />
        </div>

        <div className={s.main}>
          <div className={s.card}>
            <PairInfoBody />
          </div>
          <div className={s.chart}>
            <TradingViewWidget theme={Themes.DARK} autosize symbol="ETH/POLONIEX:DEXTUSDT" />
          </div>
        </div>

        <div className={s.footer}>
          <PairInfoBottom likes={96.5} dislikes={3.5} votesAmount={845} />
        </div>
        <div className={s.buttons}>
          <div
            tabIndex={0}
            onKeyDown={() => {}}
            role="button"
            onClick={() => setBottomType('tradeHistory')}
            className={`${s.buttons_item} ${bottomType === 'tradeHistory' && s.active}`}
          >
            Trade History
          </div>
          <div
            tabIndex={0}
            onKeyDown={() => {}}
            role="button"
            onClick={() => setBottomType('myPositions')}
            className={`${s.buttons_item} ${bottomType === 'myPositions' && s.active}`}
          >
            My Positions
          </div>
          <div
            tabIndex={0}
            onKeyDown={() => {}}
            role="button"
            onClick={() => setBottomType('priceAlerts')}
            className={`${s.buttons_item} ${bottomType === 'priceAlerts' && s.active}`}
          >
            Price Alerts
          </div>
        </div>
        {bottomType === 'tradeHistory' && (
          <Table data={tableData} header={headerData} tableType="pairExplorer" />
        )}
      </div>
    </main>
  );
};

export default PairExplorer;
