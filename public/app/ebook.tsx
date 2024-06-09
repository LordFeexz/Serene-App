import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import CustomButton from "@/components/CustomButton";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { Dimensions, Image, Text, View } from "react-native";

export default function ebook() {
  const { height, width } = Dimensions.get("window");

  return (
    <Container>
      <ContainerLogo>
        <Logo />
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
          <Image
            source={require("@/assets/images/ebook.png")}
            style={{
              objectFit: "contain",
              width: 0.2 * width,
              height: 0.3 * width,
            }}
          />
        </View>
        <View style={{ flex: 4 }}>
          <Text
            style={{
              fontSize: width * 0.04,
              textAlign: "center",
              color: "#1A4789",
            }}
          >
            Halo! berikut E-BOOK TENTANG MENTAL HEALTH YANG DAPAT MEMBERIKAN
            WAWASAN KEPADA ANDA
          </Text>
        </View>
      </ContainerHead>
      <ContainerBody style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            flex: 0.8,
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#B8E1F1",
            width: "90%",
            flexDirection: "row",
            borderRadius: 10,
          }}
        >
          <Image
            source={require("@/assets/images/buku.png")}
            style={{
              objectFit: "contain",
              width: 0.4 * width,
              height: 0.4 * height,
            }}
          />
          <CustomButton
            onPress={() => {
              console.log("ebook");
            }}
            text="DOWNLOAD E-BOOK"
            textStyle={{
              color: "white",
              fontSize: width * 0.04,
            }}
            containerStyle={{
              backgroundColor: "#1A4789",
              padding: 8,
              borderRadius: 10,
            }}
          />
        </View>
      </ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}
