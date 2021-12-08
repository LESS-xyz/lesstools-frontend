import BigNumber from 'bignumber.js/bignumber';

export const formatSmallNumbers = (number: string | number, numbersAfterComma = 5) => {
  if (number.toString() === '0') return '0';
  if (!number) return '';
  const checkIfSmall = number
    .toString()
    .slice(0, 6)
    .split('')
    .filter((el) => el !== '.')
    .every((el) => el === '0');

  if (checkIfSmall) {
    return `${number.toString().slice(0, 4)}...${number.toString().slice(-2)}`;
  }

  return new BigNumber(number).toFormat(numbersAfterComma);
};
