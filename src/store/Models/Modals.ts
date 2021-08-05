import { types } from 'mobx-state-tree';

const MoreInfoModal = types
  .model({
    isOpen: types.boolean,
  })
  .actions((self) => ({
    open() {
      self.isOpen = true;
    },
    close() {
      self.isOpen = false;
    },
  }));

const ModalsModel = types.model({
  moreInfo: MoreInfoModal,
});

export default ModalsModel;
