import React, { Dispatch, useEffect, useState, SetStateAction } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js/bignumber';

import Search from '../Search/index';
import { SEARCH_BY_PAIR_ID } from '../../queries/index';

import s from './PairsSearch.module.scss';

interface ISuggestionProps {
  tbrSymbol: string;
  otherSymbol: string;
  tokenId: string;
  pairId: string;
  holders: string;
  txCount: string;
}

const Suggestion: React.FC<ISuggestionProps> = ({
  otherSymbol,
  tbrSymbol,
  tokenId,
  pairId,
  holders,
  txCount,
}) => {
  return (
    <Link to={`/pair-explorer/${pairId}`} className={s.suggestion}>
      <div className={s.suggestion_title}>
        {otherSymbol}/{tbrSymbol} - chiliz
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
  const [searchByPairId, { called, loading, data }] = useLazyQuery(SEARCH_BY_PAIR_ID, {
    variables: { id: value },
  });

  useEffect(() => {
    if (value.length > 3) {
      searchByPairId();
    }
  }, [value, searchByPairId, data]);

  console.log(called, loading, data);
  console.log(isInputOnFocus);
  return (
    <div className={s.search}>
      <Search
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        onFocus={setIsInputOnFocus}
      />
      {data?.pairs.length > 1 && (
        <div className={s.suggestions}>
          <div className={s.suggestions_title}>Search results in UNISWAP</div>
          <div className={s.suggestions_body}>
            <div className={s.suggestions_body__inner}>
              <Suggestion
                otherSymbol={data.pairs[0].token0.symbol}
                tbrSymbol={data.pairs[0].token1.symbol}
                tokenId={data.pairs[0].token1.id}
                pairId={data.pairs[0].id}
                holders="soon"
                txCount={data.pairs[0].txCount}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PairSearch;
