import * as React from 'react';

import s from './TradingviewWidget.module.scss';
import Datafeed from './datafeed';
import { useEffect } from 'react';

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

const TradingviewWidget: React.FC<InterfaceTradingviewWidgetProps> = (props) => {
  const {
    symbol = 'Coinbase:BTC/USD',
    interval = '60',
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
    // console.log('TradingviewWidget useEffect:', symbol);
    const widgetOptions = {
      debug: false,
      symbol,
      datafeed: Datafeed,
      interval,
      // toolbar_bg: "#1a103d",
      container_id: containerId,
      library_path: libraryPath,
      locale: getLanguageFromURL() || 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: [
        // 'study_templates',
      ],
      charts_storage_url: chartsStorageUrl,
      charts_storage_api_version: chartsStorageApiVersion,
      theme: 'dark',
      client_id: clientId,
      user_id: userId,
      fullscreen,
      autosize,
      studies_overrides: studiesOverrides,
      overrides: {
        // "mainSeriesProperties.showCountdown": true,
        'paneProperties.background': '#222222',
        'paneProperties.vertGridProperties.color': '#454545',
        'paneProperties.horzGridProperties.color': '#454545',
        'scalesProperties.textColor': '#AAA',
        //
        // "paneProperties.background": "#131722",
        // "paneProperties.vertGridProperties.color": "#363c4e",
        // "paneProperties.horzGridProperties.color": "#363c4e",
        'symbolWatermarkProperties.transparency': 90,
        // "scalesProperties.textColor" : "#AAA",
        'mainSeriesProperties.candleStyle.wickUpColor': '#336854',
        'mainSeriesProperties.candleStyle.wickDownColor': '#7f323f',
      },
    };

    // (window as any).TradingView.onready(() => {
    // eslint-disable-next-line no-multi-assign,new-cap
    const widget = ((window as any).tvWidget = new (window as any).TradingView.widget(
      widgetOptions,
    ));

    // var tvChart= new TradingView.widget(option);
    // tvChart.onChartReady(function() {
    //   tvChart.addCustomCSSFile('css/my-custom-css.css')
    // })

    // eslint-disable-next-line no-underscore-dangle
    // console.log('TradingviewWidget:', (window as any).TradingView.widget);

    widget.onChartReady(() => {
      console.log('Chart has loaded!');
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

  return <div id={containerId} className={s.container} />;
};

export default TradingviewWidget;
