// unique([1,2,2]) → [1,2]
export const unique = <T>(arr: T[]): T[] => 
  [...new Set(arr)];

// groupBy([{tipo:'A'},{tipo:'B'}],'tipo') → {A:[…], B:[…]}
export const groupBy = <T extends Record<string, any>, K extends keyof T>(
  arr: T[],
  key: K
): Record<string | number | symbol, T[]> =>
  arr.reduce((acc, obj) => {
    const groupKey = obj[key] as string | number | symbol; // 
    (acc[groupKey] = acc[groupKey] || []).push(obj);
    return acc;
  }, {} as Record<string | number | symbol, T[]>); 

// sumBy([{valor:10},{valor:5}], 'valor') → 15
export const sumBy = <T extends Record<string, any>, K extends keyof T>(
  arr: T[],
  key: K
): number =>
  arr.reduce((total, obj) => {
    const value = obj[key];
    return total + (typeof value === 'number' ? value : 0);
  }, 0);