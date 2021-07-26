import BigNumber from 'bignumber.js/bignumber';

import ListedSince from './ListedSince/index';
import Actions from './Actions/index';
import TokenPrice from './TokenPrice/index';
import ContractDetails from './ContractDetails/index';
import PercentBlock from './PercentBlock/index';
import Type from './Type/index';

import { IRowBigSwap, IRowLiveNewPairs, IRowPairExplorer } from '../../types/table';

import s from './Table.module.scss';

// преобразовывает входной JSON в объект с JSX полями для вставку в таблицу
export const dataConverter = {
  // для таблицы на странице big swap
  bigSwap(data: Array<IRowBigSwap>) {
    return data.map((row) => ({
      pair: <span className={s.pair}>{row.pair}</span>,
      time: row.time,
      type: <Type type={row.type} />,
      quantity: new BigNumber(row.quantity).toFormat(2),
      totalEth: new BigNumber(row.totalEth).toFormat(2),
      totalUsd: <span>${new BigNumber(row.totalUsd).toFormat(2)}</span>,
      change: <PercentBlock percent={row.change} />,
      others: <Actions actions={row.others} />,
    }));
  },

  // для таблицы на странице live new pairs
  liveNewPairs(data: Array<IRowLiveNewPairs>, isUsd: boolean) {
    return data.map((row) => ({
      token: <span className={s.token}>{row.token}</span>,
      listedSince: <ListedSince key={JSON.stringify(row.listedSince)} date={row.listedSince} />,
      actions: <Actions actions={row.actions} />,
      contractDetails: <ContractDetails data={row.contractDetails} />,
      tokenPrice: <TokenPrice {...row.tokenPrice} isUsd={isUsd} />,
      totalLiquidity: <span>${new BigNumber(row.totalLiquidity).toFormat(2)}</span>,
      poolAmount: <span>{row.poolAmount} ETH</span>,
      poolVariation: <PercentBlock percent={row.poolVariation} />,
      poolRemaining: <span>{row.poolRemaining} ETH</span>,
    }));
  },

  // для таблцы на странице pair explorer
  pairExplorer(data: Array<IRowPairExplorer>) {
    return data.map((row) => ({
      data: row.data,
      type: <Type type={row.type} />,
      priceUsd: <span>${row.priceUsd}</span>,
      priceEth: new BigNumber(row.priceEth).toFormat(15),
      amountEth: new BigNumber(row.amountEth).toFormat(2),
      totalEth: new BigNumber(row.totalEth).toFormat(row.totalEth.toString().length > 5 ? 5 : 2),
      maker: (
        <a href={`https://etherscan.io/tx/${row.maker}`} target="_blank" rel="noreferrer">
          {row.maker.slice(0, 7)}...{row.maker.slice(-2)}
        </a>
      ),
      others: <Actions actions={row.others} />,
    }));
  },
};
