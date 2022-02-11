import ImageColors from 'react-native-image-colors';

export const getImageColor = async (uri: string) => {
  const result = await ImageColors.getColors(uri);

  let primary;
  let secondary;

  switch (result.platform) {
    case 'android':
      // android result properties
      primary = result.dominant;
      secondary = result.average;
      break;
    case 'web':
      // web result properties
      primary = result.dominant;
      secondary = result.vibrant;
      break;
    case 'ios':
      // iOS result properties
      primary = result.primary;
      secondary = result.secondary;
      break;
    default:
      throw new Error('Unexpected platform key');
  }

  return [primary, secondary];
};
