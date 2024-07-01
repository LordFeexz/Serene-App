import { Dimensions, Text, View } from "react-native";

export default function Footer() {
  const { height } = Dimensions.get("window");
  return (
    <View
      style={{
        bottom: 0,
        position: "absolute",
        width: "100%",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: height * 0.5,
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
