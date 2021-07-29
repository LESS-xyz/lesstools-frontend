import s from './ContractDetails.module.scss';

import cotractDetailPlusIcon from '../../../assets/img/icons/table/contract-detail-plus.svg';
import cotractDetailLockIcon from '../../../assets/img/icons/table/contract-detail-lock.svg';
import cotractDetailProxyIcon from '../../../assets/img/icons/table/contract-detail-proxy.svg';
import cotractDetailCashIcon from '../../../assets/img/icons/table/contract-detail-cash.svg';

interface IContractDetailsProps {
  data: ('plus' | 'lock' | 'proxy' | 'cash')[];
}

const ContractDetails: React.FC<IContractDetailsProps> = ({ data }) => {
  return (
    <div className={s.contract_details}>
      <div
        data-multiline
        data-effect="solid"
        data-tip-disable={!data.some((el) => el === 'plus')}
        data-tip="Looks like the owner can mint new tokens. <br/> **The owner may have renounced."
        className={`${s.contract_detail} ${!data.some((el) => el === 'plus') && s.disable}`}
      >
        <img src={cotractDetailPlusIcon} alt="cotractDetailPlusIcon" />
      </div>
      <div
        data-multiline
        data-effect="solid"
        data-tip-disable={!data.some((el) => el === 'lock')}
        data-tip="Looks like the owner can <br/> lock your transfers (like selling)."
        className={`${s.contract_detail} ${!data.some((el) => el === 'lock') && s.disable}`}
      >
        <img src={cotractDetailLockIcon} alt="cotractDetailLockIcon" />
      </div>
      <div
        data-effect="solid"
        data-tip-disable={!data.some((el) => el === 'proxy')}
        data-tip="Looks like contract is behind a proxy."
        className={`${s.contract_detail} ${!data.some((el) => el === 'proxy') && s.disable}`}
      >
        <img src={cotractDetailProxyIcon} alt="cotractDetailProxyIcon" />
      </div>
      <div
        data-effect="solid"
        data-tip-disable={!data.some((el) => el === 'cash')}
        data-tip="Looks like the owner can set a high fee ( 100% for example)."
        className={`${s.contract_detail} ${!data.some((el) => el === 'cash') && s.disable}`}
      >
        <img src={cotractDetailCashIcon} alt="cotractDetailCashIcon" />
      </div>
    </div>
  );
};

export default ContractDetails;
