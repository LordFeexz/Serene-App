import { PropsWithChildren } from "react";
import { View } from "react-native";

export default function ContainerBody({
  children,
  style,
}: PropsWithChildren & { style?: any }) {
  return <View style={{ flex: 5, ...style }}>{children}</View>;
}
