//@flow

export const isEmptyObject = (obj: {}): boolean => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};
