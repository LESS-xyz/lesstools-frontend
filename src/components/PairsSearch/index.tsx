import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { observer } from 'mobx-react-lite';

import Suggestion from './Suggestion/index';
import OutsideAlerter from '../../utils/outsideClickWrapper';
import Search from '../Search/index';
import {
  SEARCH_BY_ID,
  SEARCH_BY_NAME,
  SEARCH_BY_ID_SUSHISWAP,
  SEARCH_BY_NAME_SUSHISWAP,
} from '../../queries/index';
import { ISearchByIdResponse, ISearchBySymbolResponse, IPairsBySymbol } from '../../types/search';
import { useMst } from '../../store/store';
import { uniswapSubgraph, sushiswapSubgraph } from '../../index';

import s from './PairsSearch.module.scss';

// при вводе в поиск символы токенов форматирует их
const formatTokens = (name: string) => {
  // from (weth/less || weth less) to ["weth", "less"]
  let tokens = name
    .replace(/\s/g, '/')
    .split('/')
    .filter((token) => !!token);
  if (tokens.length < 1) tokens = [' ', ' '];
  return tokens.map((token) => token.toUpperCase());
};

interface IPairSearchProps {
  placeholder: string;
}

function debounce(fn: (...args: any) => void, ms: number) {
  let timer: NodeJS.Timeout;
  return function (args: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(args);
    }, ms);
  };
}

const PairSearch: React.FC<IPairSearchProps> = observer(({ placeholder }) => {
  const [value, setValue] = useState('');
  const { currentExchange } = useMst();
  // запросы на граф
  const [
    searchById,
    { loading: searchByIdLoading, data: searchByIdData },
  ] = useLazyQuery<ISearchByIdResponse>(
    currentExchange.exchange === 'uniswap' ? SEARCH_BY_ID : SEARCH_BY_ID_SUSHISWAP,
    {
      client: currentExchange.exchange === 'uniswap' ? uniswapSubgraph : sushiswapSubgraph,
    },
  );
  const [
    searchByName,
    { loading: searchByNameLoading, data: searchByNameData },
  ] = useLazyQuery<ISearchBySymbolResponse>(
    currentExchange.exchange === 'uniswap' ? SEARCH_BY_NAME : SEARCH_BY_NAME_SUSHISWAP,
    {
      client: currentExchange.exchange === 'uniswap' ? uniswapSubgraph : sushiswapSubgraph,
    },
  );

  // формирование пар по символу (форматирование данных с графа в нужный формат)
  const [pairsByNameData, setPairsByNameData] = useState<IPairsBySymbol>([]);

  useEffect(() => {
    const tokens = formatTokens(value);

    if (tokens.length > 1) {
      const data = searchByNameData?.match_by_symbol.map((token: any) => {
        return {
          id: token.id,
          symbol: token.symbol,
          pairBase: token.pairBase.filter((pairBase: any) =>
            pairBase.token1.symbol.includes(tokens[1]),
          ),
          pairQuote: token.pairQuote.filter((pairQuote: any) =>
            pairQuote.token0.symbol.includes(tokens[1]),
          ),
        };
      });
      setPairsByNameData(data || []);
    } else {
      setPairsByNameData(searchByNameData?.match_by_symbol || []);
    }
  }, [searchByNameData, value]);

  // поиск пар по (id пары, id токена) или (симоволу токена)
  const debouncedSearch = React.useMemo(
    () =>
      debounce((searchValue: string) => {
        if (searchValue.length > 0) {
          if (searchValue.startsWith('0x')) {
            searchById({ variables: { id: searchValue } });
          } else {
            searchByName({
              variables: {
                name: formatTokens(searchValue)[0] || '',
                name2: formatTokens(searchValue)[1] || '',
              },
            });
          }
        }
      }, 500),
    [searchById, searchByName],
  );

  const searchPairs = useCallback((str) => debouncedSearch(str), [debouncedSearch]);

  // при нажатии за пределами поиска закрывать предложения
  const [isClickedOutside, setIsClickedOutside] = useState(false);
  const isActive =
    value.length > 0 && !isClickedOutside && !searchByIdLoading && !searchByNameLoading;

  const onInputFocus = () => {
    setIsClickedOutside(false);
  };

  const searchBlock = useRef<HTMLDivElement>(null);
  console.log(searchBlock.current?.offsetWidth);

  return (
    <OutsideAlerter fn={() => setIsClickedOutside(true)}>
      <div className={s.search} ref={searchBlock}>
        <Search
          value={value}
          setValue={setValue}
          onChange={searchPairs}
          placeholder={placeholder}
          onFocus={onInputFocus}
          loading={searchByIdLoading || searchByNameLoading}
        />
        {isActive && (
          <div className={s.suggestions}>
            <div className={s.suggestions_title}>
              Search results in <span>{currentExchange.exchange}</span>
            </div>
            <div className={s.suggestions_body}>
              <div className={s.suggestions_body__inner}>
                {searchByIdData?.match_by_pair[0] && (
                  <>
                    {/* FIRST PAIR BY PAIR ID */}
                    <Suggestion
                      otherSymbol={searchByIdData?.match_by_pair[0].token1.symbol}
                      tbrSymbol={searchByIdData?.match_by_pair[0].token0.symbol}
                      tbrName={searchByIdData?.match_by_pair[0].token0.name}
                      tokenId={searchByIdData?.match_by_pair[0].token0.id}
                      pairId={searchByIdData?.match_by_pair[0].id}
                      holders="soon"
                      txCount={searchByIdData?.match_by_pair[0].txCount}
                      onClick={() => setIsClickedOutside(true)}
                      exchange={currentExchange.exchange}
                    />
                    {/* TODO: ADD TYPES FOR TOKENS */}
                    {/* PAIRS SEARCHED BY TOKEN ID */}
                    {searchByIdData.match_by_token[0].pairBase?.map((pair: any) => {
                      return (
                        <Suggestion
                          key={pair.id}
                          otherSymbol={pair.token1.symbol}
                          tbrSymbol={pair.token0.symbol}
                          tbrName={pair.token0.name}
                          tokenId={pair.token0.id}
                          pairId={pair.id}
                          holders="soon"
                          txCount={pair.txCount}
                          onClick={() => setIsClickedOutside(true)}
                          exchange={currentExchange.exchange}
                        />
                      );
                    })}
                  </>
                )}
                {/* PAIRS SEARCHED BY TOKEN SYMBOL */}
                {/* pairBase */}
                {pairsByNameData.length > 0 && (
                  <>
                    {pairsByNameData.map((symbol) =>
                      symbol.pairBase.map((symbolData) => (
                        <Suggestion
                          key={symbolData.id}
                          otherSymbol={symbolData.token1.symbol}
                          tbrSymbol={symbolData.token0.symbol}
                          tbrName={symbolData.token0.name}
                          tokenId={symbolData.token0.id}
                          pairId={symbolData.id}
                          holders="soon"
                          txCount={symbolData.txCount}
                          onClick={() => setIsClickedOutside(true)}
                          exchange={currentExchange.exchange}
                        />
                      )),
                    )}
                    {pairsByNameData.map((symbol) =>
                      symbol.pairQuote.map((symbolData) => (
                        <Suggestion
                          key={symbolData.id}
                          otherSymbol={symbolData.token0.symbol}
                          tbrSymbol={symbolData.token1.symbol}
                          tbrName={symbolData.token1.name}
                          tokenId={symbolData.token1.id}
                          pairId={symbolData.id}
                          holders="soon"
                          txCount={symbolData.txCount}
                          onClick={() => setIsClickedOutside(true)}
                          exchange={currentExchange.exchange}
                        />
                      )),
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </OutsideAlerter>
  );
});

export default PairSearch;
