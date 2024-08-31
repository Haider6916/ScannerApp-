/**
 * Define Const color use for whole application
 */
export const BaseColor = {
  whiteColor: '#FFFFFF',
  blackColor: '#000000',
  //app
  appBlue: 'rgba(70, 135, 236, 1)',
  appBlueLight: 'rgba(47, 58, 102, 1)',
  statusBarBlue: 'rgba(65, 121, 209, 1)',
  whiteBackground: '#F5F5F5',
  notSelected: 'rgba(215, 235, 255, 1)',
  textGrey: 'rgba(163, 163, 163, 1)',
  textGreyDark: 'rgba(111, 111, 111, 1)',
};

/**
 * export theme and colors for application
 * @returns theme,colors
 */
export const useTheme = () => {
  return BaseColor;
};
