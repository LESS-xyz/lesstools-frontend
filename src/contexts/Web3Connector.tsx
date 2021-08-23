import React, { useState, useEffect, useContext } from 'react';
import { Web3Service } from '../services/web3/index';

import { useMst } from '../store/store';

const Web3ConnectorContext = React.createContext({ web3: {}, handleInit: () => {} });

const Web3Connector: React.FC = ({ children }) => {
  const [web3Provider, setWeb3Provider] = useState({});
  const { user } = useMst();

  const login = async (web3: Web3Service) => {
    try {
      const adresses = await web3.connect();
      console.log('LOGIN', adresses);
      user.setUserWalletId(adresses[0]);
    } catch (error) {
      if (error.code === -32002) {
        window.location.reload();
      }
    }
  };

  const init = () => {
    const web3 = new Web3Service();
    console.log('INIT WEB3', web3);

    web3.provider.on('accountsChanged', (accounts: string[]) => {
      console.log('ACCOUNTS CHANGED', accounts);
      init();
    });

    setWeb3Provider(web3);
    login(web3);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  return (
    <Web3ConnectorContext.Provider value={{ web3: web3Provider, handleInit: () => init() }}>
      {children}
    </Web3ConnectorContext.Provider>
  );
};

function useWeb3Context() {
  return useContext(Web3ConnectorContext);
}

export { Web3Connector, useWeb3Context };
