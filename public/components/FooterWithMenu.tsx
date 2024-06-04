import { Pressable, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
export default function FooterWithMenu() {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        padding: 10,
        alignItems: "center",
        gap: 5,
      }}
    >
      <Pressable onPress={() => router.push("/submenu")}>
        <Entypo name="menu" size={48} color="black" />
      </Pressable>
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
