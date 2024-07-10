import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import AlertComponent from "@/components/SuccessAlert";
import { getMood, getTodaysMood, postMood } from "@/services/fetchService";
import { Toast } from "@/services/toasts";
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
  const [disableForm, setDisableForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        if (!moodDate) {
          const todaysDate = new Date();
          const thisYear = todaysDate.getFullYear();
          const thisMonth = todaysDate.getMonth() + 1;
          const thisDay = todaysDate.getDate();
          const payloadDate =
            thisYear +
            "-" +
            `${thisMonth < 10 ? "0" + thisMonth : thisMonth}` +
            "-" +
            `${thisDay < 10 ? "0" + thisDay : thisDay}`;
          const { data: todaysMood } = await getTodaysMood(payloadDate);

          if (todaysMood != null) {
            return moveToResult();
          }
        }
        const { data } = (await getMood()) as {
          data: { image_url: string; name: string }[];
        };
        const moods = data.map((el) => {
          return {
            imgSource: el.image_url,
            text: el.name,
          };
        });
        setMoods(moods);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handlPostMood = async (mood_name: string) => {
    try {
      setDisableForm(true);
      const data = await postMood({
        mood_name,
        date: new Date(moodDate as string) || new Date(),
      });
      console.log(data);
      Toast("Success add mood!", "success");
      moveToResult();
    } catch (error) {
      Toast(error as string, "danger");
      return error;
    } finally {
      setDisableForm(false);
    }
  };
  const moveToResult = () => {
    return router.replace("/mood-test-result");
  };

  if (loading) return <Loading />;
  return (
    <Container>
      <ContainerLogo>
        <Logo />
        <Pressable onPress={moveToResult} style={{ padding: 10 }}>
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
            disabled={disableForm}
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
