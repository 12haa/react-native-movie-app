import { images } from '@/constants/images';
import { Image, ImageBackground, ImageSourcePropType, Text, View } from 'react-native';

interface TabIconProps {
  focused: boolean;
  icon: ImageSourcePropType | undefined;
  title: string;
}
const TabIcon = ({ focused, icon, title }: TabIconProps) => {
  if (focused) {
    return (
      <>
        <ImageBackground
          source={images.highlight}
          className="flex  flex-row w-full flex-1  min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
        >
          <Image source={icon} className="size-5" tintColor={'#151312'} />
          <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
        </ImageBackground>
      </>
    );
  } else {
    return (
      <View className="size-full justify-center mt-4 items-center rounded-full">
        <Image source={icon} className="size-5" tintColor={'#808080'} />
      </View>
    );
  }
};
export default TabIcon;
