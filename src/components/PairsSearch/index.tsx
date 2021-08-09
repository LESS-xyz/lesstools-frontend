import React, { Dispatch, useEffect, useState, SetStateAction } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js/bignumber';

import Search from '../Search/index';
import { SEARCH_BY_ID } from '../../queries/index';

import s from './PairsSearch.module.scss';

interface ISuggestionProps {
  tbrSymbol: string;
  tbrName: string;
  otherSymbol: string;
  tokenId: string;
  pairId: string;
  holders: string;
  txCount: string;
}

const Suggestion: React.FC<ISuggestionProps> = ({
  otherSymbol,
  tbrSymbol,
  tbrName,
  tokenId,
  pairId,
  holders,
  txCount,
}) => {
  return (
    <Link to={`/pair-explorer/${pairId}`} className={s.suggestion}>
      <div className={s.suggestion_title}>
        {otherSymbol}/{tbrSymbol} - {tbrName}
      </div>
      <div className={s.suggestion_body}>
        <div className={s.suggestion_body__item}>
          <div className={s.suggestion_body__item_title}>Token:</div>
          <div className={s.suggestion_body__item_value}>
            {tokenId.slice(0, 5)}...{tokenId.slice(-5)}
          </div>
        </div>
        <div className={s.suggestion_body__item}>
          <div className={s.suggestion_body__item_title}>Pair:</div>
          <div className={s.suggestion_body__item_value}>
            {pairId.slice(0, 5)}...{pairId.slice(-5)}
          </div>
        </div>
        <div className={s.suggestion_body__item}>
          <div className={s.suggestion_body__item_title}>Holders:</div>
          <div className={s.suggestion_body__item_value}>{holders}</div>
        </div>
        <div className={s.suggestion_body__item}>
          <div className={s.suggestion_body__item_title}>Tx:</div>
          <div className={s.suggestion_body__item_value}>{new BigNumber(txCount).toFormat(2)}</div>
        </div>
      </div>
    </Link>
  );
};

interface IPairSearchProps {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const PairSearch: React.FC<IPairSearchProps> = ({ value, setValue, placeholder }) => {
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);
  const [searchById, { called, loading, data }] = useLazyQuery(SEARCH_BY_ID, {
    variables: { id: value },
  });

  // TODO: сделать debounce
  useEffect(() => {
    if (value.length > 2) {
      searchById();
    }
  }, [value, searchById, data]);

  console.log(called, loading, data);
  return (
    <div className={s.search}>
      <Search
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        onFocus={setIsInputOnFocus}
        loading={loading}
      />
      {data?.match_by_pair[0] && value.length > 0 && isInputOnFocus && (
        <div className={s.suggestions}>
          <div className={s.suggestions_title}>Search results in UNISWAP</div>
          <div className={s.suggestions_body}>
            <div className={s.suggestions_body__inner}>
              {/* FIRST PAIR  */}
              <Suggestion
                otherSymbol={data?.match_by_pair[0].token1.symbol}
                tbrSymbol={data?.match_by_pair[0].token0.symbol}
                tbrName={data?.match_by_pair[0].token0.name}
                tokenId={data?.match_by_pair[0].token0.id}
                pairId={data?.match_by_pair[0].id}
                holders="soon"
                txCount={data?.match_by_pair[0].txCount}
              />
              {/* TODO: ADD TYPES FOR TOKENS */}
              {/* PAIRS SEARCHED BY TOKEN ID */}
              {data.match_by_token[0].pairBase?.map((pair: any) => {
                return (
                  <Suggestion
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PairSearch;
