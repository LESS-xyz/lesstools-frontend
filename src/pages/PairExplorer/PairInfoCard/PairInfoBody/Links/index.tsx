import React, { useState, useEffect, useCallback } from 'react';

import { IAdditionalInfoFromBackend } from '../../../../../services/backend/index';
import Coingecko from '../../../../../services/Coingecko';

import s from '../PairInfoBody.module.scss';

import marketcap from '../../../../../assets/img/icons/marketcap.svg';
import etherscan from '../../../../../assets/img/icons/table/actions-etherscan.svg';
import { ReactComponent as TwitterIcon } from '../../../../../assets/img/icons/twitter-grey.svg';
import { ReactComponent as TelegramIcon } from '../../../../../assets/img/icons/telegram-grey.svg';
import { ReactComponent as DesktopIcon } from '../../../../../assets/img/icons/desktop-grey.svg';
import { ReactComponent as DiscordIcon } from '../../../../../assets/img/icons/discord-grey.svg';
import { ReactComponent as ChatIcon } from '../../../../../assets/img/icons/chat-grey.svg';
import { ReactComponent as PlusIcon } from '../../../../../assets/img/icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../../../../assets/img/icons/minus.svg';
import { ReactComponent as LockIcon } from '../../../../../assets/img/icons/lock.svg';
import { ReactComponent as EmailIcon } from '../../../../../assets/img/icons/email.svg';
import { ReactComponent as UniswapIcon } from '../../../../../assets/img/icons/uniswap.svg';
import { ReactComponent as CoingeckoIcon } from '../../../../../assets/img/icons/coingecko.svg';
import { UnicryptExchangesNames } from '../../../../../config/exchanges';
import { uppercaseFirstLetter } from '../../../../../utils/prettifiers';

interface ILinksProps {
  tokenInfoFromBackend: IAdditionalInfoFromBackend | null;
  tokenId: string;
  exchange?: string;
}

const Links: React.FC<ILinksProps> = ({ tokenInfoFromBackend, tokenId, exchange }) => {
  const [openAdditional, setOpenAdditional] = useState(false);
  // links
  const [coingeckoLink, setCoingeckoLink] = useState<string>('');
  const [unicryptLink, setUnicryptLink] = useState<string>('');
  const [email] = useState<string>('');

  const isAdditionalNeeded = coingeckoLink || unicryptLink || email;

  const handleOpenAdditional = () => setOpenAdditional(!openAdditional);

  const getCoingeckoLink = useCallback(async () => {
    try {
      if (!tokenInfoFromBackend) return;
      const { symbol } = tokenInfoFromBackend?.pair?.token_being_reviewed || {};
      if (!symbol) return;
      const coinInfo = await Coingecko.getCoinInfo({ symbol });
      if (!coinInfo) return;
      const { id } = coinInfo;
      const newCoingeckoLink = `https://www.coingecko.com/en/coins/${id}`;
      setCoingeckoLink(newCoingeckoLink);
      console.log('Links getCoingeckoLink:', { tokenInfoFromBackend, coinInfo });
    } catch (e) {
      console.error(e);
    }
  }, [tokenInfoFromBackend]);

  const getUnicryptLink = useCallback(async () => {
    try {
      if (!tokenInfoFromBackend) return;
      // const { address, platform } = tokenInfoFromBackend?.pair || {};
      const { address } = tokenInfoFromBackend?.pair || {};
      if (!address) return;
      // let exchange = 'uni-v2';
      // const exchanges = ExchangesByPlatform[platform] || {};
      // if (exchanges && Object.entries(exchanges)) [exchange] = Object.values(exchanges) || [];
      const exchangeName = UnicryptExchangesNames[uppercaseFirstLetter(exchange || '')];
      const newUnicryptLink = exchangeName
        ? `https://app.unicrypt.network/amm/${exchangeName}/pair/${address}`
        : '';
      setUnicryptLink(newUnicryptLink);
      console.log('Links getUnicryptLink:', { tokenInfoFromBackend, address });
    } catch (e) {
      console.error(e);
    }
  }, [tokenInfoFromBackend, exchange]);

  useEffect(() => {
    getCoingeckoLink();
  }, [getCoingeckoLink]);

  useEffect(() => {
    getUnicryptLink();
  }, [getUnicryptLink]);

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
        {/* <span className={s.card_link__title}>View EtherScan</span> */}
      </a>
      {tokenInfoFromBackend?.pair?.token_being_reviewed?.cmc_slug && (
        <a
          href={`https://coinmarketcap.com/currencies/${tokenInfoFromBackend?.pair?.token_being_reviewed?.cmc_slug}`}
          target="_blank"
          rel="noreferrer noopener"
          className={s.card_link}
        >
          <div className={s.card_link__img}>
            <img src={marketcap} alt="marketcap" />
          </div>
          {/* <span className={s.card_link__title}>View CoinMarket Cap</span> */}
        </a>
      )}
      {tokenInfoFromBackend?.pair?.token_being_reviewed?.twitter_url && (
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={tokenInfoFromBackend?.pair?.token_being_reviewed?.twitter_url}
          className={s.card_link}
        >
          <div className={s.card_link__img}>
            <TwitterIcon />
          </div>
          {/* <span className={s.card_link__title}>Twitter</span> */}
        </a>
      )}

      {tokenInfoFromBackend?.pair?.token_being_reviewed?.chat_urls &&
        tokenInfoFromBackend?.pair?.token_being_reviewed?.chat_urls?.map((link: string) => (
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
            {/* {link.includes('t.me/') && <span className={s.card_link__title}>Telegram</span>}
            {link.includes('discord') && <span className={s.card_link__title}>Discord</span>}
            {!link.includes('t.me/') && !link.includes('discord') && (
              <span className={s.card_link__title}>Chat</span>
            )} */}
          </a>
        ))}
      {tokenInfoFromBackend?.pair?.token_being_reviewed?.website_url && (
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={tokenInfoFromBackend?.pair?.token_being_reviewed?.website_url}
          className={s.card_link}
        >
          <div className={s.card_link__img}>
            <DesktopIcon className={s.desktop_icon} />
          </div>
          {/* <span className={s.card_link__title}>Website</span> */}
        </a>
      )}
      {!!isAdditionalNeeded && (
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
                {!!unicryptLink && (
                  <a
                    className={s.additionalMenuItem}
                    href={unicryptLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className={s.additionalMenuItemText}>Lock</div>
                    <UniswapIcon className={s.additionalMenuItemIcon} />
                    <LockIcon className={s.additionalMenuItemIcon} />
                  </a>
                )}
                {!!coingeckoLink && (
                  <a
                    className={s.additionalMenuItem}
                    href={coingeckoLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className={s.additionalMenuItemText}>Token</div>
                    <CoingeckoIcon className={s.additionalMenuItemIcon} />
                  </a>
                )}
                {/* on coingecko, cmc, cryptocompare doesnt exist. only on etherscan with PRO plan. */}
                {!!email && (
                  <a className={s.additionalMenuItem} href="mailto:contact@less.xyz">
                    <div className={s.additionalMenuItemText}>Info</div>
                    <EmailIcon className={s.additionalMenuItemIcon} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Links;
