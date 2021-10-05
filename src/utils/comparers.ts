export const is = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

// filter unique objects by pair id
export const uniqueArrayOfObjectsByKey = (array: any[], key: string) => {
  return array.filter((item: any, index: number, self: any[]) => {
    return self.findIndex((item2: any) => item2[key] === item[key]) === index;
  });
}
