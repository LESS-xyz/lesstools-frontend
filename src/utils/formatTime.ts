// форматирует время в формат 108 h 25 m 12 s
/**
 * Function description
 *
 * @param {Number} seconds - number of seconds
 * @returns returns string in format: 102 h 52 m 23 s
 * @example let time = formatTime(255172);
 */
export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const second = Math.floor(seconds - hours * 3600 - minutes * 60);

  return `${hours > 0 ? `${hours} h` : ''} ${minutes > 0 ? `${minutes} m` : ''} ${
    second > 0 ? `${second} s` : ''
  }`;
}
