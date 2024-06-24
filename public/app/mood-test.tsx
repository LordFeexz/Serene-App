import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { getMood, postMood } from "@/services/fetchService";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Moods = {
  imgSource: string;
  text: string;
};
export default function moodTest() {
  const [loading, setLoading] = useState(true);
  const [moods, setMoods] = useState<Moods[]>([]);
  const { moodDate } = useLocalSearchParams();
  const { width } = Dimensions.get("window");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      console.log(moodDate);
      try {
        const { data } = (await getMood()) as {
          data: { image_url: string; name: string }[];
        };
        console.log(data);
        const moods = data.map((el) => {
          return {
            imgSource: el.image_url,
            text: el.name,
          };
        });
        setMoods(moods);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handlPostMood = async (mood_name: string) => {
    try {
      const { data } = await postMood({
        mood_name,
        date: new Date(moodDate as string) || new Date(),
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Text>Loading</Text>;
  return (
    <Container>
      <ContainerLogo>
        <Logo />
        <Pressable
          onPress={() => router.push("/mood-test-result")}
          style={{ padding: 10 }}
        >
          <Image
            source={require("@/assets/images/big-calendar.png")}
            style={{ width: 0.14 * width, height: 0.14 * width }}
          />
        </Pressable>
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
            onPress={() => handlPostMood(mood.text)}
          >
            <Image
              source={{ uri: mood.imgSource }}
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
