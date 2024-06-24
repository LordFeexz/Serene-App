import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { getMyMoods } from "@/services/fetchService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

type MyMoods = {
  image_url: string;
  name: string;
};

function DisabledBox() {
  const { height, width } = Dimensions.get("window");

  return (
    <View
      style={{
        width: width / 12,
        height: height / 24,
        backgroundColor: "gray",
      }}
    ></View>
  );
}

function ActiveBox({
  imageUrl,
  index,
  startingMonth,
  month,
  year,
}: {
  imageUrl?: string;
  index: number;
  startingMonth: number;
  month: number;
  year: number;
}) {
  const { height, width } = Dimensions.get("window");
  const router = useRouter();

  const handleMoodTest = () => {
    router.push({
      pathname: "mood-test",
      params: { moodDate: `${year}-${month}-${index - 12}` },
    });
    console.log(index, startingMonth, month, year);
  };

  if (!imageUrl) {
    return (
      <TouchableOpacity
        onPress={handleMoodTest}
        style={{
          width: width / 12,
          height: height / 24,
          backgroundColor: "#B8E1F1",
        }}
      />
    );
  }
  return (
    <View
      style={{
        width: width / 12,
        height: height / 24,
        backgroundColor: "#B8E1F1",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={{ width: 25, height: 25 }} />
      )}
    </View>
  );
}

export default function moodTestResult() {
  const [myMoods, setMyMoods] = useState<(MyMoods | null | string)[]>([]);
  const { height, width } = Dimensions.get("window");
  const [startingMonth, setStartingMonth] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    (async () => {
      const { data } = (await getMyMoods()) as {
        data: { name: string; image_url: string }[];
      };
      const today = new Date();
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const dayOfWeek = firstDayOfMonth.getDay();
      setStartingMonth(dayOfWeek + 7);
      console.log(dayOfWeek);
      const myMoods = [];
      myMoods.push("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");

      for (let i = 0; i < dayOfWeek; i++) {
        myMoods.push(null);
      }
      data.forEach((el) => {
        myMoods.push(el);
      });
      setMyMoods(myMoods);
    })();
  }, []);

  const getMonth = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months[new Date().getMonth()];
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
          justifyContent: "space-around",
          padding: 5,
          gap: 10,
          borderWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "#f9f8eb",
            borderRadius: 15,
            flex: 1,
            margin: 20,
            gap: 10,
          }}
        >
          <View
            style={{
              borderRadius: 10,
              backgroundColor: "#1A4789",
              padding: 20,
              width: "60%",
            }}
          >
            <Text
              style={{ color: "white", fontSize: 20, fontWeight: "semibold" }}
            >
              {getMonth()}
            </Text>
          </View>
          {/* <HeaderMonth /> */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexWrap: "wrap",
              // justifyContent: "space-evenly",
            }}
          >
            {myMoods.map((el, index) => (
              <View key={index}>
                {typeof el == "string" ? (
                  <View
                    style={{
                      width: width / 12,
                      height: height / 24,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>{el}</Text>
                  </View>
                ) : !el ? (
                  <DisabledBox />
                ) : (
                  <ActiveBox
                    imageUrl={el?.image_url}
                    index={index}
                    startingMonth={startingMonth}
                    month={currentMonth}
                    year={currentYear}
                  />
                )}
              </View>
            ))}
          </View>
        </View>
      </ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}
