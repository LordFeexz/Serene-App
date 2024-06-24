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
    const inputDate = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - inputDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return `${diffInSeconds} detik yang lalu`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} menit yang lalu`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24 * 30) {
      return `${diffInHours} jam yang lalu`;
    }

    const diffInMonths = Math.floor(diffInHours / (24 * 30));
    return `${diffInMonths} bulan yang lalu`;
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
          style={{ height: (1.3 * height * 1) / 7, width: 0.3 * width }}
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
