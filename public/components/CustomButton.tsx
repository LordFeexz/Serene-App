import React from "react";
import { Pressable, Text } from "react-native";

type Props = {
  text: string;
  textStyle?: object;
  containerStyle?: object;
  onPress: () => void;
};

export default function CustomButton({
  text,
  textStyle,
  containerStyle,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...containerStyle,
      }}
    >
      <Text style={{ ...textStyle }}>{text}</Text>
    </Pressable>
  );
}
