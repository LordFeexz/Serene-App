import { Text, View } from "react-native";

export default function Footer() {
  return (
    <View
      style={{
        bottom: 0,
        position: "absolute",
        width: "100%",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: "#1A4789",
          fontWeight: "bold",
        }}
      >
        SERENE | Self-care, Emotional Resilience, and Empowerment Network for
        Everyone
      </Text>
    </View>
  );
}
