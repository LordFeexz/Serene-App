import React, { PropsWithChildren } from "react";
import { View } from "react-native";

export default function ContainerHead({
  children,
  style,
}: PropsWithChildren & { style?: any }) {
  return (
    <View
      style={{
        flex: style.flex || 1,
        backgroundColor: "#B8E1F1",
        borderRadius: 30,
        ...style,
      }}
    >
      {children}
    </View>
  );
}
