import React, { Dispatch, useEffect, useState, SetStateAction } from 'react';
import { useLazyQuery } from '@apollo/client';
import Suggestion from './Suggestion/index';

import Search from '../Search/index';
import { SEARCH_BY_ID, SEARCH_BY_NAME } from '../../queries/index';

import s from './PairsSearch.module.scss';

// при вводе в поиск символы токенов форматирует их
// TODO: search by token name
const formatTokens = (name: string) => {
  console.log(name);
  // from (weth/less || weth less) to ["weth", "less"]
  let tokens = name
    .replace(/\s/g, '/')
    .split('/')
    .filter((token) => !!token);
  if (tokens.length < 1) tokens = [' '];
  return tokens;
};

interface IPairSearchProps {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const PairSearch: React.FC<IPairSearchProps> = ({ value, setValue, placeholder }) => {
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);
  const [searchById, { loading: searchByIdLoading, data: searchByIdData }] = useLazyQuery(
    SEARCH_BY_ID,
    {
      variables: { id: value },
    },
  );
  const [searchByName, { loading: searchByNameLoading, data: searchByNameData }] = useLazyQuery(
    SEARCH_BY_NAME,
    {
      variables: { name: formatTokens(value)[0].toUpperCase() },
    },
  );

  // поиск пар по id пары, id токена или симоволу токена
  const searchPairs = () => {
    console.log('SEARCH');
    if (value.startsWith('0x')) {
      searchById();
    } else {
      formatTokens(value);
      searchByName();
    }
  };

  // TODO: сделать debounce
  useEffect(() => {
    if (value.length > 2) {
      searchPairs();
    }
    // eslint-disable-next-line
  }, [value]);

  return (
    <div className={s.search}>
      <Search
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        onFocus={setIsInputOnFocus}
        loading={searchByIdLoading || searchByNameLoading}
      />
      {value.length > 0 && isInputOnFocus && (
        <div className={s.suggestions}>
          <div className={s.suggestions_title}>Search results in UNISWAP</div>
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
                      />
                    );
                  })}
                </>
              )}
              {/* PAIRS SEARCHED BY TOKEN SYMBOL */}
              {/* pairBase */}
              {searchByNameData && (
                <>
                  {searchByNameData.match_by_symbol.map((symbol: any) =>
                    symbol.pairBase.map((symbolData: any) => (
                      <Suggestion
                        key={symbolData.id}
                        otherSymbol={symbolData.token1.symbol}
                        tbrSymbol={symbolData.token0.symbol}
                        tbrName={symbolData.token0.name}
                        tokenId={symbolData.token0.id}
                        pairId={symbolData.id}
                        holders="soon"
                        txCount={symbolData.txCount}
                      />
                    )),
                  )}
                  {searchByNameData.match_by_symbol.map((symbol: any) =>
                    symbol.pairQuote.map((symbolData: any) => (
                      <Suggestion
                        key={symbolData.id}
                        otherSymbol={symbolData.token0.symbol}
                        tbrSymbol={symbolData.token1.symbol}
                        tbrName={symbolData.token1.name}
                        tokenId={symbolData.token1.id}
                        pairId={symbolData.id}
                        holders="soon"
                        txCount={symbolData.txCount}
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
  );
};

export default PairSearch;
