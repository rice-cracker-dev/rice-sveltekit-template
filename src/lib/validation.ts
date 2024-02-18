export const urlStartsWith = (url: string, startsWith: string) => {
  if (startsWith === '/') {
    return url === startsWith;
  }

  return url.startsWith(startsWith);
};

export const isSameUrl = (url: string, compare: string) => {
  return url === compare;
};

export const isStrEmpty = (s?: string | null) => !s || /^\s*$/.test(s);
