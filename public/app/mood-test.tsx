import Container from "@/components/Container";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { Text, View } from "react-native";

export default function moodTest() {
  return (
    <Container>
      <ContainerLogo>
        <Logo />
      </ContainerLogo>
      <ContainerHead>
        <Text>Mood Test</Text>
      </ContainerHead>
      <View style={{ flex: 5 }}></View>
      <FooterWithMenu />
    </Container>
  );
}
