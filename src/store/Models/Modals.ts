import { types } from 'mobx-state-tree';

type ModalsTypes = 'MoreInfo' | 'Share' | 'Trade';

const Modals = types
  .model({
    openedModals: types.array(
      types.union(types.literal('MoreInfo'), types.literal('Share'), types.literal('Trade')),
    ),
  })
  .actions((self) => ({
    open(modalName: ModalsTypes) {
      self.openedModals.push(modalName);
    },
    close(modalName: ModalsTypes) {
      // TODO: как обозначить нормально типы в MST?
      // eslint-disable-next-line
      // @ts-ignore
      self.openedModals = self.openedModals.filter((modal) => modal !== modalName);
    },
  }));

export default Modals;
