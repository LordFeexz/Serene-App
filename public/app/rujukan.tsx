import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { Text } from "react-native";

export default function Rujukan() {
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
        <Text>Rujukan</Text>
      </ContainerHead>
      <ContainerBody></ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}