import React, { PropsWithChildren } from "react";
import { View } from "react-native";

export default function ContainerLogo({ children }: PropsWithChildren) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      {children}
    </View>
  );
}
