import axios from 'axios';
import config from '../../config/index';

type IPostMetamaskLoginProps = {
  address: string;
  msg: string;
  signed_msg: string;
};

export class BackendService {
  private axios: any;

  constructor() {
    this.axios = axios.create({
      baseURL: config.APIS.backend,
    });
  }

  getMetamaskMessage = async () => {
    try {
      const message = await this.axios.get('/accounts/get_metamask_message/');
      return { data: message.data };
    } catch (error) {
      console.error('GET METAMASK MESSAGE', error);
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
}
