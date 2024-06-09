import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import CustomButton from "@/components/CustomButton";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";

function ClinicIcon() {
  return <Image source={require("@/assets/images/clinic.png")} />;
}

const clinicData = [
  {
    name: "POLIKLINIK USU",
    address:
      "Kampus USU, Jl. Universitas No.32, Padang Bulan, Kec. Medan Baru, Kota Medan, Sumatera Utara 20155",
    distance: "500m",
  },
  {
    name: "Praktek Psikiater dr. ADELIYA",
    address: "Jalan Hebatnya duniawi no. 13 Medan",
    distance: "850m",
  },
  {
    name: "PSIKIATER SETIA BUDI",
    address: "Jl. Setia budi no 1133 Medan",
    distance: "1.5km",
  },
  {
    name: "YAYASAN PRAKTEK PSIKOLOG MEDAN",
    address: "Jl Maju Bersama Medan",
    distance: "2.1km",
  },
];

export default function Rujukan() {
  const { height } = Dimensions.get("window");
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
          {clinicData.map((clinic, index) => (
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
                <Text style={{ textAlign: "center", fontSize: height * 0.015 }}>
                  {clinic.address}
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
                  onPress={() => console.log("pilih")}
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
