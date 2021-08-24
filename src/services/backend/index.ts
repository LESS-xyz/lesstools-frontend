import axios from 'axios';
import config from '../../config/index';

type PLATFORM = 'ETH' | 'BSC' | 'POLYGON ';

type IPostMetamaskLoginProps = {
  address: string;
  msg: string;
  signed_msg: string;
};

type IGetTokenAdditionalInfoProps = {
  pair_address: string;
  token_address: string;
  token_name: string;
  token_symbol: string;
  platform: PLATFORM;
};

class BackendService {
  private axios: any;

  constructor() {
    this.axios = axios.create({
      baseURL: config.APIS.backend,
    });
  }

  // METAMASK LOGIN
  getMetamaskMessage = async () => {
    try {
      const message = await this.axios.get('/accounts/get_metamask_message/');
      return { data: message.data };
    } catch (error) {
      return { data: null, error };
    }
  };

  postMetamaskLogin = async (data: IPostMetamaskLoginProps) => {
    try {
      const res = await this.axios.post('/accounts/metamask_login/', {
        address: data.address,
        msg: data.msg,
        signed_msg: data.signed_msg,
      });
      return { data: res.data };
    } catch (error) {
      return { data: '', error };
    }
  };

  // TOKEN PAIR INFO
  getTokenPairAdditionalData = async (data: IGetTokenAdditionalInfoProps) => {
    try {
      const res = await this.axios.post('/analytics/pair_info', {
        pair_address: data.pair_address,
        token_address: data.token_address,
        token_name: data.token_name,
        token_symbol: data.token_symbol,
        platform: data.platform,
      });
      return { data: res.data };
    } catch (error) {
      return { data: '', error };
    }
  };
}

export default new BackendService();
