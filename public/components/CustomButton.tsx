import React from "react";
import { Pressable, Text } from "react-native";

type Props = {
  text: string;
  textStyle?: object;
  containerStyle?: object;
  onPress: () => void;
  disableForm?: boolean;
};

export default function CustomButton({
  text,
  textStyle,
  containerStyle,
  onPress,
  disableForm,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...containerStyle,
      }}
      disabled={disableForm}
    >
      <Text style={{ ...textStyle }}>{text}</Text>
    </Pressable>
  );
}
