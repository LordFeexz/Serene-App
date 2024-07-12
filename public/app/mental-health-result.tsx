import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { AntDesign } from "@expo/vector-icons";
import { Dimensions, Image, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
export default function mentalHealthResult() {
  const { score, message } = useLocalSearchParams();
  const { height, width } = Dimensions.get("window");
  const smallCircleWidth = width * 0.3;
  const bigCircleWidth = width * 0.5;
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
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <AntDesign name="user" size={50} color="#3A8BC9" />
        </View>
        <View style={{ flex: 4 }}>
          <Text
            style={{
              fontSize: height * 0.03,
              textAlign: "center",
              color: "#1A4789",
            }}
          >
            Halo Bagaimana perasaan anda hari ini?
          </Text>
        </View>
      </ContainerHead>
      <ContainerBody
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          gap: 5,
        }}
      >
        <Text style={{ fontSize: 16, textAlign: "center", color: "#1A4789" }}>
          SKOR ANDA
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: bigCircleWidth / 2,
            backgroundColor: "#B3DAF6",
            width: bigCircleWidth,
            height: bigCircleWidth,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: smallCircleWidth / 2,
              backgroundColor: "#3A8BC9",
              width: smallCircleWidth,
              height: smallCircleWidth,
            }}
          >
            <Image source={require("@/assets/images/gif.gif")} />

            <Text
              style={{
                fontSize: 40,
                color: "#1A4789",
                zIndex: 1,
                paddingTop: -50,
                position: "absolute",
              }}
            >
              {score}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 16, textAlign: "center", color: "#1A4789" }}>
          {message}
        </Text>

        <View
          style={{
            width: width * 0.5,
            borderWidth: 2,
            borderColor: "blue",
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
            borderRadius: 20,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Text style={{ color: "#DEAD44" }}>CALL 119</Text>
          <Feather name="phone" size={24} color="black" />
        </View>
      </ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}
