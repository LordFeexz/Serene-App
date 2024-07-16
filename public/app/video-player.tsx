import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import { getOneVid } from "@/services/fetchService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function videoplayer() {
  const { width } = Dimensions.get("window");
  const { vidId } = useLocalSearchParams();
  const [isReadyForRender, setIsReadyForRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        await getOneVid(vidId as string);
      } catch (error) {
        console.log(error, "<~ error");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    })();
  }, []);
  const onReady = () => {
    setIsReadyForRender(true);
  };
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
        {isLoading ? (
          <Loading />
        ) : (
          <YoutubePlayer
            height={300}
            play={true}
            videoId={vidId as string}
            onReady={onReady}
            webViewStyle={{
              opacity: 0.99,
              display: isReadyForRender ? "flex" : "none",
            }}
            webViewProps={{
              androidLayerType: isReadyForRender ? "hardware" : "software",
              renderToHardwareTextureAndroid: true,
            }}
          />
        )}
      </ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}
