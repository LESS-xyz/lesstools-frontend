import React, { useEffect, useState } from 'react';

import s from './TradingviewWidget.module.scss';
import Datafeed from './datafeed';

import './styles.css';

import Loader from '../Loader';

export interface InterfaceTradingviewWidgetProps {
  containerId?: string;
  symbol?: string;
  interval?: string;
  libraryPath?: string;
  chartsStorageUrl?: string;
  chartsStorageApiVersion?: string;
  clientId?: string;
  userId?: string;
  fullscreen?: boolean;
  autosize?: boolean;
  studiesOverrides?: any;
}

function getLanguageFromURL() {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const TradingviewWidget: React.FC<InterfaceTradingviewWidgetProps> = React.memo((props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    symbol = 'Coinbase:BTC/USD',
    interval = '1D',
    containerId = 'tv_chart_container',
    libraryPath = '/charting_library/',
    chartsStorageUrl = 'https://saveload.tradingview.com',
    chartsStorageApiVersion = '1.1',
    clientId = 'tradingview.com',
    userId = 'public_user_id',
    fullscreen = false,
    autosize = true,
    studiesOverrides = {},
  } = props;

  useEffect(() => {
    const widgetOptions = {
      debug: false,
      symbol,
      interval,
      datafeed: Datafeed,
      // interval,
      // toolbar_bg: "#1a103d",
      container_id: containerId,
      library_path: libraryPath,
      locale: getLanguageFromURL() || 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: [
        // 'study_templates',
      ],
      // use_localstorage_for_settings: 'off',
      // items_favoriting: 'off',
      // save_chart_properties_to_local_storage: 'off',
      // favorites: {
      //   intervals: ['1', '3', '5', '15', '30', 'H', '2H', '4H', '12H', 'D', '3D', 'W'],
      //   chartTypes: ['Candles'],
      // },
      charts_storage_url: chartsStorageUrl,
      charts_storage_api_version: chartsStorageApiVersion,
      theme: 'dark',
      client_id: clientId,
      user_id: userId,
      fullscreen,
      autosize,
      studies_overrides: studiesOverrides,
      custom_css_url: './styles.css',
      overrides: {
        // "mainSeriesProperties.showCountdown": true,
        'mainSeriesProperties.style': 1,
        'paneProperties.backgroundType': 'solid',
        'paneProperties.background': '#000000',
        'paneProperties.vertGridProperties.color': '#000000',
        'paneProperties.horzGridProperties.color': '#000000',
        'scalesProperties.textColor': '#AAA',
        'scalesProperties.lineColor': '#ffffff',
        'scalesProperties.backgroundColor': '#000000',
        //
        // "paneProperties.background": "#131722",
        // "paneProperties.vertGridProperties.color": "#363c4e",
        // "paneProperties.horzGridProperties.color": "#363c4e",
        // "scalesProperties.textColor" : "#AAA",

        // 'mainSeriesProperties.candleStyle.upColor': '#2FA59A',
        // 'mainSeriesProperties.candleStyle.downColor': '#EC5454',
        // 'mainSeriesProperties.candleStyle.wickUpColor': '#2FA59A;',
        // 'mainSeriesProperties.candleStyle.wickDownColor': '#EC5454',
      },
    };

    // eslint-disable-next-line no-multi-assign,new-cap
    const widget = ((window as any).tvWidget = new (window as any).TradingView.widget(
      widgetOptions,
    ));

    widget.onChartReady(() => {
      setIsLoaded(true);
    });
    // });
    return () => (window as any).tvWidget.remove();
  }, [
    symbol,
    interval,
    containerId,
    libraryPath,
    chartsStorageUrl,
    chartsStorageApiVersion,
    clientId,
    userId,
    fullscreen,
    autosize,
    studiesOverrides,
  ]);

  return (
    <>
      {!isLoaded && (
        <div className={s.loader}>
          <Loader />
        </div>
      )}
      <div id={containerId} className={s.container} />
    </>
  );
});

export default TradingviewWidget;
