import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { getHistory } from "@/services/fetchService";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import moment from "moment-timezone";
type Histories = {
  created_at: string;
  feature_used: string;
};

type DataHistory = {
  data: Histories[];
};
export default function actiivity() {
  const { width, height } = Dimensions.get("window");
  const [histories, setHistories] = useState<Histories[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = (await getHistory()) as DataHistory;
        setHistories(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const formatDate = (date: string) => {
    const timeFormat: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const inputDate = moment
      .tz(date, "YYYY-MM-DD HH:mm:ss", "Etc/GMT-0")
      .clone()
      .tz("Etc/GMT-7")
      .toDate();
    return new Date(inputDate).toLocaleDateString("id-ID", timeFormat);
  };
  return (
    <Container>
      <ContainerLogo>
        <Logo />
      </ContainerLogo>
      <ContainerHead
        style={{
          justifyContent: "center",
          alignItems: "center",
          objectFit: "contain",
        }}
      >
        <Image
          source={require("@/assets/images/big-activity.png")}
          style={{
            height: (1.35 * height * 1) / 7,
            width: 0.315 * width,
            objectFit: "contain",
          }}
        />
      </ContainerHead>
      <ContainerBody>
        <View style={{ padding: 10 }}>
          <FlatList
            data={histories}
            renderItem={({ item }) => (
              <View
                style={{
                  margin: 10,
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: "#B8E1F1",
                }}
              >
                <Text style={{ color: "#1A4789", fontWeight: "bold" }}>
                  {item.feature_used}
                </Text>
                <Text>{formatDate(item.created_at)}</Text>
              </View>
            )}
          />
        </View>
      </ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDFAFF",
  },
});
