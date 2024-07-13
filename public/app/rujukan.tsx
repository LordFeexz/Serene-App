import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import CustomButton from "@/components/CustomButton";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

import * as Location from "expo-location";
import { getClinics } from "@/services/fetchService";
import Loading from "@/components/Loading";
import { getCache, setCache } from "@/services/cache";
function ClinicIcon() {
  return <Image source={require("@/assets/images/clinic.png")} />;
}
type ClinicType = {
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  distance: string;
};

export default function Rujukan() {
  const { height } = Dimensions.get("window");
  const [isLoading, setIsLoading] = useState(true);
  const [clinicData, setClinicData] = useState<ClinicType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status == "granted") {
          const location = await Location.getCurrentPositionAsync();

          const { latitude, longitude } = location.coords;
          const myLocation = await getCache("my_location");

          if (myLocation) {
            const { lat, lng } = JSON.parse(myLocation);
            const distance = haversine(lat, lng, latitude, longitude);

            if (distance < 500) {
              const clinics = JSON.parse(
                (await getCache("clinics")) as unknown as string
              ) as ClinicType[];
              setClinicData(clinics);
              return;
            }
          }

          const { data } = await getClinics(latitude, longitude);
          const { clinics } = data;
          setClinicData(clinics);
          setCache(
            "my_location",
            JSON.stringify({ lat: latitude, lng: longitude })
          );
          setCache("clinics", JSON.stringify(clinics));
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const haversine = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371000; // Radius of the Earth in meters
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const phi1 = toRadians(lat1);
    const phi2 = toRadians(lat2);
    const deltaPhi = toRadians(lat2 - lat1);
    const deltaLambda = toRadians(lon2 - lon1);

    const a =
      Math.sin(deltaPhi / 2) ** 2 +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  };

  const openGMaps = (lat: number, lng: number, label: string) => {
    const url = Platform.select({
      ios: "maps:" + lat + "," + lng + "?q=" + label,
      android: "geo:" + lat + "," + lng + "?q=" + label,
    });

    Linking.canOpenURL(url as string).then((supported) => {
      if (supported) {
        return Linking.openURL(url as string);
      }

      const browserUrl =
        "https://www.google.com/maps/@" + lat + "," + lng + "?q=" + label;
      return Linking.openURL(browserUrl);
    });
  };
  if (isLoading) return <Loading />;
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
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("@/assets/images/rujukan.png")}
            style={{ width: 70, height: 70, objectFit: "contain" }}
          />
        </View>
        <View style={{ flex: 4 }}>
          <Text
            style={{
              fontSize: height * 0.02,
              textAlign: "center",
              color: "#1A4789",
            }}
          >
            Halo! Terimakasih telah menggunakan serene. berikut rujukan
            PSIKIATER yang dapat membantu anda
          </Text>
        </View>
      </ContainerHead>
      <ContainerBody
        style={{
          padding: 10,
        }}
      >
        <View
          style={{
            justifyContent: "flex-end",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <Text style={{ color: "#804861", fontWeight: "bold" }}>
            Berdasarkan lokasi terdekat
          </Text>
        </View>
        <ScrollView>
          {!clinicData.length && (
            <Text>Tidak ada klinik terdekat yang tersedia</Text>
          )}
          {!!clinicData.length &&
            clinicData.map((clinic, index) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                  gap: 5,
                  backgroundColor: "#B8E1F1",
                  borderRadius: 10,
                  padding: 5,
                }}
                key={index}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flex: 0.7,
                  }}
                >
                  <ClinicIcon />
                </View>
                <View
                  style={{
                    marginLeft: 5,
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: height * 0.017,
                    }}
                  >
                    {clinic.name}
                  </Text>
                  <Text
                    style={{ textAlign: "center", fontSize: height * 0.015 }}
                  >
                    {clinic.vicinity}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "auto",
                    padding: 5,
                  }}
                >
                  <Text>{clinic.distance}</Text>
                  <CustomButton
                    text="Pilih"
                    onPress={() =>
                      openGMaps(
                        clinic.geometry.location.lat,
                        clinic.geometry.location.lng,
                        clinic.name
                      )
                    }
                    containerStyle={{
                      backgroundColor: "#1A4789",
                      padding: 5,
                      borderRadius: 10,
                      width: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    textStyle={{ color: "white" }}
                  />
                </View>
              </View>
            ))}
        </ScrollView>
      </ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}
