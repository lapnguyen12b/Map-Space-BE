export async function asyncMap<T, K>(
  arr: Array<T>,
  fn: (value: T, index?: number, array?: Array<T>) => Promise<K>,
) {
  const promises = arr.map(fn);
  return Promise.all(promises);
}

export async function asyncForEach<T>(
  arr: Array<T>,
  fn: (value: T, index?: number, array?: Array<T>) => Promise<void>,
) {
  const promises = arr.map(fn);
  await Promise.all(promises);
}
