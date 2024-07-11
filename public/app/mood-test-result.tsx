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
import { AntDesign } from "@expo/vector-icons";
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
  month,
  year,
  startingIndex,
}: {
  imageUrl?: string;
  index: number;
  startingMonth: number;
  month: number;
  year: number;
  startingIndex: number;
}) {
  const { height, width } = Dimensions.get("window");
  const router = useRouter();

  const handleMoodTest = () => {
    console.log(year, month, index - startingIndex);
    router.replace({
      pathname: "mood-test",
      params: { moodDate: `${year}-${month}-${index - startingIndex}` },
    });
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
  const [startingIndex, setStartingIndex] = useState(0);

  const fetchGetMyMoods = async (action?: "prev" | "next") => {
    try {
      const fetchMonth =
        action == "prev"
          ? currentMonth == 1
            ? 12
            : currentMonth - 1
          : action == "next"
          ? currentMonth == 12
            ? 1
            : currentMonth + 1
          : currentMonth;

      const fetchYear =
        action == "prev"
          ? currentMonth == 1
            ? currentYear - 1
            : currentYear
          : action == "next"
          ? currentMonth == 12
            ? currentYear + 1
            : currentYear
          : currentYear;

      const { data } = (await getMyMoods({
        year: String(fetchYear),
        month: String(fetchMonth),
      })) as {
        data: { name: string; image_url: string }[];
      };
      console.log(data);

      const today = new Date(`${fetchYear}-${fetchMonth}-01`);
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const dayOfWeek = firstDayOfMonth.getDay();
      setStartingMonth(dayOfWeek + 7);
      let myMoods = [];
      myMoods.push("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");

      for (let i = 0; i < dayOfWeek; i++) {
        myMoods.push(null);
      }
      setStartingIndex(6 + dayOfWeek);
      data.forEach((el) => {
        console.log(el);
        myMoods.push(el);
      });
      setMyMoods(myMoods);
      setCurrentMonth(fetchMonth);
      setCurrentYear(fetchYear);
      myMoods = [];
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      await fetchGetMyMoods();
    })();
  }, []);
  // useEffect(() => {}, [currentMonth, currentYear]);

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

    return months[currentMonth - 1];
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
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => fetchGetMyMoods("prev")}>
              <AntDesign name="leftcircleo" size={20} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "semibold",
              }}
            >
              {getMonth()}
            </Text>
            <TouchableOpacity onPress={() => fetchGetMyMoods("next")}>
              <AntDesign name="rightcircleo" size={20} color="white" />
            </TouchableOpacity>
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
                    startingIndex={startingIndex}
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
