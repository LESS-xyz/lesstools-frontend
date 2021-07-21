// TODO: to describe an util func
// TODO: for number do another sort
// ascending = 0 or 1

const sorter = {
  string(a: any, b: any, key: string, ascending = 0): number {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  },

  date(a: any, b: any, key: string, ascending = 0): number {
    const res = new Date(a[key]).getTime() - new Date(b[key]).getTime();
    return ascending ? -res : res;
  },

  number(a: any, b: any, key: string, ascending = 0): number {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  },
};

export { sorter };
