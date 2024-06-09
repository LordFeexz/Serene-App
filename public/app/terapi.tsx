import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import CustomButton from "@/components/CustomButton";
import FooterWithMenu from "@/components/FooterWithMenu";
import LinkButton from "@/components/LinkButton";
import Logo from "@/components/Logo";
import { Dimensions, Image, StyleSheet, View } from "react-native";

export default function terapi() {
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
        }}
      >
        <Image
          source={require("@/assets/images/big-therapy.png")}
          style={{
            height: (1.35 * height) / 7,
            width: 0.315 * width,
            objectFit: "contain",
          }}
        />
      </ContainerHead>
      <ContainerBody style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: 0.5 * width,
            height: 0.28 * height,
          }}
        >
          <Image
            source={require("@/assets/images/suara.png")}
            style={{
              height: "50%",
              objectFit: "contain",
            }}
          />
          <LinkButton
            text="Suara"
            textStyle={{
              color: "#1A4789",
              fontWeight: "bold",
              fontSize: width * 0.05,
            }}
            href="/suara"
            containerStyle={{
              backgroundColor: "#B8E1F1",
              width: 200,
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: 0.5 * width,
            height: 0.28 * height,
          }}
        >
          <Image
            source={require("@/assets/images/video.png")}
            style={{
              height: "70%",
              objectFit: "contain",
            }}
          />
          <LinkButton
            text="Video"
            textStyle={{
              color: "#1A4789",
              fontWeight: "bold",
              fontSize: width * 0.05,
            }}
            href="/video"
            containerStyle={{
              backgroundColor: "#B8E1F1",
              width: 200,
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          />
        </View>
      </ContainerBody>
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
