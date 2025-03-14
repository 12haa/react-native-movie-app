import {
  View,
  Text,
  Image,
  TextInput,
  NativeTouchEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

interface SearchBarProps {
  onPress?: ((e: NativeSyntheticEvent<NativeTouchEvent>) => void) | undefined;
  placeHolder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

const SearchBar = ({ onPress, placeHolder, value, onChangeText, onSubmit }: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <TouchableOpacity onPress={onSubmit}>
        <Image
          source={icons.search}
          className="size-5"
          resizeMode="contain"
          tintColor={'#ab8bff'}
        />
      </TouchableOpacity>
      <TextInput
        onPress={onPress}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5de"
        className="flex-1 ml-2 text-white"
        returnKeyType="search"
      />
    </View>
  );
};

export default SearchBar;
