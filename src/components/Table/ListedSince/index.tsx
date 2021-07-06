import { useState, useEffect } from 'react';
import s from './ListedSince.module.scss';
import { getSecondsFromDate } from '../../../utils/getSecondsFromDate';
import { formatTime } from '../../../utils/formatTime';

interface IListedSinceProps {
  date: string | Date;
}

const ListedSince: React.FC<IListedSinceProps> = ({ date }) => {
  const [timeFrom, setTimeFrom] = useState(getSecondsFromDate(date));

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeFrom((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.block} data-effect="solid" data-tip={date}>
      {formatTime(timeFrom)}
    </div>
  );
};

export default ListedSince;
