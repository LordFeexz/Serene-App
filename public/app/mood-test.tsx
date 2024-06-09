import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import CustomButton from "@/components/CustomButton";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
export default function moodTest() {
  const { width } = Dimensions.get("window");
  const moods = [
    {
      imgSource: require("@/assets/images/emoticons/malu.png"),
      text: "Calm",
    },
    {
      imgSource: require("@/assets/images/emoticons/seneng.png"),
      text: "Happy",
    },
    {
      imgSource: require("@/assets/images/emoticons/gusar.png"),
      text: "Sad",
    },
    {
      imgSource: require("@/assets/images/emoticons/kelip.png"),
      text: "Energetic",
    },
    {
      imgSource: require("@/assets/images/emoticons/ngantuk.png"),
      text: "Low Energy",
    },
    {
      imgSource: require("@/assets/images/emoticons/nesu.png"),
      text: "Angry",
    },
    {
      imgSource: require("@/assets/images/emoticons/puyeng.png"),
      text: "Confused",
    },
    {
      imgSource: require("@/assets/images/emoticons/melet.png"),
      text: "Frisky",
    },
    {
      imgSource: require("@/assets/images/emoticons/hoeh.png"),
      text: "Anxious",
    },
  ];
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
          <Image
            source={require("@/assets/images/mood-test.png")}
            style={{ objectFit: "contain" }}
          />
        </View>
        <View style={{ flex: 4 }}>
          <Text style={{ fontSize: 16, textAlign: "center", color: "#1A4789" }}>
            Halo! awali harimu dengan penuh semangat! mood test membantu melihat
            mood kamu kali ini!
          </Text>
        </View>
      </ContainerHead>
      <ContainerBody
        style={{
          padding: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: "row",
              backgroundColor: "#3A8BC9",
              padding: 15,
              margin: 10,
              width: mood.text === "Low Energy" ? width * 0.6 : width * 0.4,
              justifyContent: "center",
              alignSelf: "center",
              gap: 10,
              borderRadius: 20,
            }}
          >
            <Image
              source={mood.imgSource}
              style={{ width: 0.05 * width, height: 0.05 * width }}
            />
            <Text>{mood.text}</Text>
          </TouchableOpacity>
        ))}
      </ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}
