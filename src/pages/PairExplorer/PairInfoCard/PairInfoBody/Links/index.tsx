import React, { useState, useEffect, useCallback } from 'react';

import { IAdditionalInfoFromBackend } from '../../../../../services/backend/index';
import Coingecko from '../../../../../services/Coingecko';

import s from '../PairInfoBody.module.scss';

import marketcap from '../../../../../assets/img/icons/marketcap.svg';
import etherscan from '../../../../../assets/img/icons/table/actions-etherscan.svg';
import { ReactComponent as TwitterIcon } from '../../../../../assets/img/icons/twitter-blue.svg';
import { ReactComponent as TelegramIcon } from '../../../../../assets/img/icons/telegram-blue.svg';
import { ReactComponent as DesktopIcon } from '../../../../../assets/img/icons/desktop-blue.svg';
import { ReactComponent as DiscordIcon } from '../../../../../assets/img/icons/discord-blue.svg';
import { ReactComponent as ChatIcon } from '../../../../../assets/img/icons/chat-blue.svg';
import { ReactComponent as PlusIcon } from '../../../../../assets/img/icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../../../../assets/img/icons/minus.svg';
import { ReactComponent as LockIcon } from '../../../../../assets/img/icons/lock.svg';
import { ReactComponent as EmailIcon } from '../../../../../assets/img/icons/email.svg';
import { ReactComponent as UniswapIcon } from '../../../../../assets/img/icons/uniswap.svg';
import { ReactComponent as CoingeckoIcon } from '../../../../../assets/img/icons/coingecko.svg';

interface ILinksProps {
  tokenInfoFromBackend: IAdditionalInfoFromBackend | null;
  tokenId: string;
}

const Links: React.FC<ILinksProps> = ({ tokenInfoFromBackend, tokenId }) => {
  const [openAdditional, setOpenAdditional] = useState(false);
  const [coingeckoLink, setCoingeckoLink] = useState('');

  const handleOpenAdditional = () => setOpenAdditional(!openAdditional);

  const getCoingeckoLink = useCallback(async () => {
    try {
      if (!tokenInfoFromBackend) return;
      const { symbol } = tokenInfoFromBackend?.pair?.token_being_reviewed;
      if (!symbol) return;
      const coinInfo = await Coingecko.getCoinInfo({ symbol });
      if (!coinInfo) return;
      const { id } = coinInfo;
      const newCoingeckoLink = `https://www.coingecko.com/en/coins/${id}`;
      setCoingeckoLink(newCoingeckoLink);
      console.log('Links props:', { tokenInfoFromBackend, id, symbol });
    } catch (e) {
      console.error(e);
    }
  }, [tokenInfoFromBackend]);

  useEffect(() => {
    getCoingeckoLink();
  }, [getCoingeckoLink]);

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
      </a>
      {tokenInfoFromBackend?.pair.token_being_reviewed.cmc_slug && (
        <a
          href={`https://coinmarketcap.com/currencies/${tokenInfoFromBackend?.pair.token_being_reviewed.cmc_slug}`}
          target="_blank"
          rel="noreferrer noopener"
          className={s.card_link}
        >
          <div className={s.card_link__img}>
            <img src={marketcap} alt="marketcap" />
          </div>
        </a>
      )}
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
        </a>
      )}
      <div>
        <div
          className={s.card_link}
          role="button"
          tabIndex={0}
          onClick={handleOpenAdditional}
          onKeyDown={() => {}}
        >
          <div className={s.card_link__img}>{openAdditional ? <MinusIcon /> : <PlusIcon />}</div>
        </div>
        {openAdditional && (
          <div className={s.additionalMenu}>
            <div className={s.additionalMenuInner}>
              <div className={s.additionalMenuItem}>
                <div className={s.additionalMenuItemText}>Lock</div>
                <UniswapIcon className={s.additionalMenuItemIcon} />
                <LockIcon className={s.additionalMenuItemIcon} />
              </div>
              <a
                className={s.additionalMenuItem}
                href={coingeckoLink}
                target="_blank"
                rel="noreferrer"
              >
                <div className={s.additionalMenuItemText}>Token</div>
                <CoingeckoIcon className={s.additionalMenuItemIcon} />
              </a>
              <div className={s.additionalMenuItem}>
                <div className={s.additionalMenuItemText}>Info</div>
                <EmailIcon className={s.additionalMenuItemIcon} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Links;
