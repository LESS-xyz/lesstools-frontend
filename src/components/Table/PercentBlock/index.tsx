import s from './PercentBlock.module.scss';

interface IPercentBlock {
  percent: number;
}

const PercentBlock: React.FC<IPercentBlock> = ({ percent }) => {
  return (
    <div>
      <span className={`${s.percent} ${percent < -20 ? s.red : ''} ${percent > 20 ? s.green : ''}`}>
        {percent}%
      </span>
    </div>
  );
};

export default PercentBlock;
