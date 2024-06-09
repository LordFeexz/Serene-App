import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

export default function suara() {
  const [sound, setSound] = useState<Audio.Sound>();
  const { width, height } = Dimensions.get("screen");

  const sounds = [
    {
      imageSource: require("@/assets/images/atap.png"),
      soundsUri: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
    },
    {
      imageSource: require("@/assets/images/aer.png"),
      soundsUri: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
    },
    {
      imageSource: require("@/assets/images/daon.png"),
      soundsUri: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
    },
    {
      imageSource: require("@/assets/images/deres.png"),
      soundsUri: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
    },
    {
      imageSource: require("@/assets/images/gerimis.png"),
      soundsUri: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
    },
    {
      imageSource: require("@/assets/images/jendela.png"),
      soundsUri: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
    },
    {
      imageSource: require("@/assets/images/ombak.png"),
      soundsUri: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
    },
    {
      imageSource: require("@/assets/images/payung.png"),
      soundsUri: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
    },
    {
      imageSource: require("@/assets/images/petir.png"),
      soundsUri: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
    },
  ];
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async (soundsUri: string) => {
    try {
      const { sound, status } = await Audio.Sound.createAsync({
        uri: soundsUri,
      });
      setSound(sound);

      await sound.getStatusAsync();
      await sound.playAsync();
      console.log("Playing Sound", status);
    } catch (err) {
      console.log(err, "the err - bad url e.g.");
    }
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
      <ContainerBody
        style={{
          justifyContent: "space-around",
          alignItems: "center",
          padding: 5,
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "#4DA4E0",
            width: "50%",
            alignItems: "center",
            borderRadius: 15,
            flex: 0.5,
            margin: 10,
          }}
        >
          <Image
            source={require("@/assets/images/suara.png")}
            style={{ height: height * 0.05, width: width * 0.1 }}
          />
          <Text
            style={{
              color: "#1A4789",
              fontWeight: "bold",
              fontSize: width * 0.05,
            }}
          >
            SUARA
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            flex: 4,
            backgroundColor: "#B8E1F1",
            width: "100%",
            padding: 5,
          }}
        >
          <View
            style={{
              flex: 0.7,
              alignItems: "center",
              width: "90%",
              height: 20,
            }}
          >
            <Text
              style={{
                color: "#693C50",
                fontSize: width * 0.04,
              }}
            >
              Atur suara menenangkan yang diinginkan
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-around",
              flex: 4,
              backgroundColor: "#B8E1F1",
              width: "100%",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {sounds.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ width: 0.3 * width, padding: 30 }}
                onPress={() => playSound(item.soundsUri)}
              >
                <Image
                  source={item.imageSource}
                  style={{ height: height * 0.04, width: width * 0.12 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}
