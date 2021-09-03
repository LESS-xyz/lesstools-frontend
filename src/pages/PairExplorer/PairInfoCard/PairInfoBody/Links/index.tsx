import React from 'react';

import { IAdditionalInfoFromBackend } from '../../../../../services/backend/index';

import s from '../PairInfoBody.module.scss';

import marketcap from '../../../../../assets/img/icons/marketcap.svg';
import etherscan from '../../../../../assets/img/icons/table/actions-etherscan.svg';
import { ReactComponent as TwitterIcon } from '../../../../../assets/img/icons/twitter-blue.svg';
import { ReactComponent as TelegramIcon } from '../../../../../assets/img/icons/telegram-blue.svg';
import { ReactComponent as DesktopIcon } from '../../../../../assets/img/icons/desktop-blue.svg';
import { ReactComponent as DiscordIcon } from '../../../../../assets/img/icons/discord-blue.svg';
import { ReactComponent as ChatIcon } from '../../../../../assets/img/icons/chat-blue.svg';

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
        className={`${s.card_link} ${s.etherscan}`}
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
      <div className={s.chat_links}>
        {tokenInfoFromBackend?.pair.token_being_reviewed.twitter_url && (
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={tokenInfoFromBackend?.pair.token_being_reviewed.twitter_url}
            className={s.card_link}
          >
            <div className={s.card_link__img}>
              <TwitterIcon />
            </div>
            <div className={s.card_link__title}>Twitter</div>
          </a>
        )}

        {tokenInfoFromBackend?.pair.token_being_reviewed.chat_urls &&
          tokenInfoFromBackend.pair.token_being_reviewed.chat_urls.map((link: string) => (
            <a
              key={link}
              target="_blank"
              rel="noreferrer noopener"
              href={link}
              className={s.card_link}
            >
              <div className={s.card_link__img}>
                {link.includes('t.me/') && <TelegramIcon />}
                {link.includes('discord') && <DiscordIcon />}
                {!link.includes('t.me/') && !link.includes('discord') && <ChatIcon />}
              </div>
              <div className={s.card_link__title}>Chat</div>
            </a>
          ))}
        {tokenInfoFromBackend?.pair.token_being_reviewed.website_url && (
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={tokenInfoFromBackend?.pair.token_being_reviewed.website_url}
            className={s.card_link}
          >
            <div className={s.card_link__img}>
              <DesktopIcon className={s.desktop_icon} />
            </div>
            <div className={s.card_link__title}>Website</div>
          </a>
        )}
      </div>
    </div>
  );
};

export default Links;
