import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, Image, Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function videoplayer() {
  const { width, height } = Dimensions.get("window");
  const { vidId } = useLocalSearchParams();

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
            source={require("@/assets/images/big-therapy.png")}
            style={{
              objectFit: "contain",
              width: 0.2 * width,
              height: 0.2 * width,
            }}
          />
        </View>
        <View
          style={{ flex: 4, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: width * 0.07,
              textAlign: "center",
              fontWeight: "bold",
              color: "#1A4789",
            }}
          >
            TERAPI
          </Text>
          <Text
            style={{
              fontSize: width * 0.03,
              textAlign: "center",
              color: "#1A4789",
            }}
          >
            Terapi RELAKSASI SUARA DAN VIDEO ini diharapkan dapat menambah mood
            kamu!
          </Text>
        </View>
      </ContainerHead>
      <ContainerBody style={{ padding: 10, marginTop: 10 }}>
        <YoutubePlayer height={300} play={true} videoId={vidId as string} />
      </ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}
