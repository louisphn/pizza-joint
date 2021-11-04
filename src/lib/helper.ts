// nextRouterのrouter.path使用時に使える関数
export const getAsString = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] as string;
  }
  return value as string;
};
