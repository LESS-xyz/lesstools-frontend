import React from 'react';

import { IAdditionalInfoFromBackend } from '../../../../../services/backend/index';

import s from '../PairInfoBody.module.scss';

import marketcap from '../../../../../assets/img/icons/marketcap.svg';
import etherscan from '../../../../../assets/img/icons/table/actions-etherscan.svg';
import twitter from '../../../../../assets/img/icons/twitter-blue.svg';
import telegram from '../../../../../assets/img/icons/telegram-blue.svg';
import desktop from '../../../../../assets/img/icons/desktop-blue.svg';

interface ILinksProps {
  tokenInfoFromBackend: IAdditionalInfoFromBackend | null;
  tokenId: string;
}

const Links: React.FC<ILinksProps> = ({ tokenInfoFromBackend, tokenId }) => {
  return (
    <div className={s.links}>
      <a
        href={`https://etherscan.io/token/${tokenId}`}
        target="_blank"
        rel="noreferrer noopener"
        className={s.card_link}
      >
        <div className={s.card_link__img}>
          <img src={etherscan} alt="etherscan" />
        </div>
        <div className={s.card_link__title}>Etherscan</div>
      </a>
      <a
        href={`https://coinmarketcap.com/currencies/${tokenInfoFromBackend?.pair.token_being_reviewed.cmc_slug}`}
        target="_blank"
        rel="noreferrer noopener"
        className={s.card_link}
      >
        <div className={s.card_link__img}>
          <img src={marketcap} alt="marketcap" />
        </div>
        <div className={s.card_link__title}>CoinMarketcap</div>
      </a>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href={tokenInfoFromBackend?.pair.token_being_reviewed.twitter_url}
        className={s.card_link}
      >
        <div className={s.card_link__img}>
          <img src={twitter} alt="twitter" />
        </div>
        <div className={s.card_link__title}>Twitter</div>
      </a>

      {tokenInfoFromBackend?.pair.token_being_reviewed.chat_urls &&
        tokenInfoFromBackend.pair.token_being_reviewed.chat_urls.map((link: any) => (
          <a target="_blank" rel="noreferrer noopener" href={link} className={s.card_link}>
            <div className={s.card_link__img}>
              <img src={telegram} alt="desktop" />
            </div>
            <div className={s.card_link__title}>Chat</div>
          </a>
        ))}
      <a
        target="_blank"
        rel="noreferrer noopener"
        href={tokenInfoFromBackend?.pair.token_being_reviewed.website_url}
        className={s.card_link}
      >
        <div className={s.card_link__img}>
          <img src={desktop} alt="desktop" />
        </div>
        <div className={s.card_link__title}>Website</div>
      </a>
    </div>
  );
};

export default Links;
