import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { Dimensions, Image, StyleSheet, View } from "react-native";

export default function terapi() {
  const { width, height } = Dimensions.get("screen");
  return (
    <Container>
      <ContainerLogo>
        <Logo />
      </ContainerLogo>
      <ContainerHead
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/big-therapy.png")}
          style={{ height: (1.3 * height * 1) / 7, width: 0.315 * width }}
        />
      </ContainerHead>
      <ContainerBody></ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
