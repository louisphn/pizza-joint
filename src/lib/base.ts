export const getCurrentImage = (selctedBase: string): string => {
  const image = {
    classic: '/pizza-1.svg',
    'thin & crispy': '/pizza_base_crispy.png',
    'thick crust': '/pizza_base.png',
  };
  return image[selctedBase.toLowerCase()] ?? '';
};
