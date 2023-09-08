
export const filterArray = (objectArray: any, id: number) => {
  const object = objectArray?.filter((item: any) => item.id === id);
  return object;
}