import { types } from 'mobx-state-tree';

const LiveNewPairs = types
  .model({
    timer: types.number,
  })
  .actions((self) => {
    const increaseTimer = () => {
      self.timer += 1;
    };

    return {
      increaseTimer,
    };
  });

export default LiveNewPairs;
