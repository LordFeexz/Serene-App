import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { Dimensions, Image, StyleSheet } from "react-native";
export default function actiivity() {
  const { width, height } = Dimensions.get("window");
  return (
    <Container>
      <ContainerLogo>
        <Logo />
      </ContainerLogo>
      <ContainerHead
        style={{
          justifyContent: "center",
          alignItems: "center",
          objectFit: "contain",
        }}
      >
        <Image
          source={require("@/assets/images/big-activity.png")}
          style={{ height: (1.3 * height * 1) / 7, width: 0.3 * width }}
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
    backgroundColor: "#EDFAFF",
  },
});
