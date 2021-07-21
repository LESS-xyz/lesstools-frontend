import { sorter } from '../../utils/sorter';
import { IRowBigSwap, IRowLiveNewPairs, IRowPairExplorer } from '../../types/table';

// сортирует массив
export const dataSorter = (
  tableData: Array<IRowBigSwap | IRowLiveNewPairs | IRowPairExplorer>,
  defaultData: Array<IRowBigSwap | IRowLiveNewPairs | IRowPairExplorer>,
  key: string,
  sortCount: number,
  sortType: 'string' | 'date' | 'number',
): Array<IRowBigSwap | IRowLiveNewPairs | IRowPairExplorer> => {
  if (sortCount === 2) return defaultData;
  const newData = tableData.sort((a, b) => sorter[sortType](a, b, key, sortCount));
  return [...newData];
};
