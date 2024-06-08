import Container from "@/components/Container";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { Dimensions, Image, Text, View } from "react-native";

export default function moodTest() {
  const { width } = Dimensions.get("window");
  return (
    <Container>
      <ContainerLogo>
        <Logo />
        <View style={{ padding: 10 }}>
          <Image
            source={require("@/assets/images/big-calendar.png")}
            style={{ width: 0.14 * width, height: 0.14 * width }}
          />
        </View>
      </ContainerLogo>
      <ContainerHead
        style={{
          borderRadius: 30,
          backgroundColor: "#B8E1F1",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            padding: 2,
          }}
        >
          <Image source={require("@/assets/images/mood-test.png")} />
        </View>
        <View style={{ flex: 4 }}>
          <Text style={{ fontSize: 16, textAlign: "center", color: "#1A4789" }}>
            Halo! awali harimu dengan penuh semangat! mood test membantu melihat
            mood kamu kali ini!
          </Text>
        </View>
      </ContainerHead>
      <View style={{ flex: 5 }}></View>
      <FooterWithMenu />
    </Container>
  );
}
