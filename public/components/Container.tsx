import { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Container({
  children,
  styles,
}: PropsWithChildren & { styles?: any }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EDFAFF", ...styles }}>
      {children}
    </SafeAreaView>
  );
}
