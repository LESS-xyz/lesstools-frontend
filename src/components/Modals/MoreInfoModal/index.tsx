import React from 'react';
import { observer } from 'mobx-react-lite';

import Modal from '../Modal/index';
import { useMst } from '../../../store/store';

const MoreInfoModal: React.FC = observer(() => {
  const { modals } = useMst();

  const handleCancel = () => {
    modals.moreInfo.close();
  };

  return (
    <Modal handleCancel={handleCancel} isVisible={modals.moreInfo.isOpen}>
      <div>Больше информации!</div>
    </Modal>
  );
});

export default MoreInfoModal;
