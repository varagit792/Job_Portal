
export const filterArray = (objectArray: any, id: number) => {
  const object = objectArray?.filter((item: any) => item.id === id);
  return object;
}

export const getFirstLetterOfName = (str: string) => {
  var matches = str.match(/\b(\w)/g);
  var acronym = matches?.join('');
  return acronym;
}