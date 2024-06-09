import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import CustomButton from "@/components/CustomButton";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { Dimensions, Image, Text, View } from "react-native";

export default function video() {
  const { width, height } = Dimensions.get("window");
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
            source={require("@/assets/images/video.png")}
            style={{ height: height * 0.05, width: width * 0.05 }}
          />
          <Text
            style={{
              color: "#1A4789",
              fontWeight: "bold",
              fontSize: width * 0.05,
            }}
          >
            VIDEO
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            flex: 4,
            backgroundColor: "#B8E1F1",
            width: "100%",
            gap: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              width: "70%",
            }}
          >
            <Text
              style={{
                color: "#693C50",
                fontSize: width * 0.04,
              }}
            >
              Pilih video yang diinginkan
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              flex: 4,
              backgroundColor: "#B8E1F1",
              width: "100%",
              gap: 20,
            }}
          >
            <CustomButton
              containerStyle={{
                backgroundColor: "#4DA4E0",
                width: "80%",
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
              onPress={() => console.log("Yoga")}
              text="Yoga"
              textStyle={{
                color: "#1A4789",
                fontWeight: "bold",
                fontSize: width * 0.05,
              }}
            />
            <CustomButton
              containerStyle={{
                backgroundColor: "#4DA4E0",
                width: "80%",
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
              onPress={() => console.log("ASMR")}
              text="ASMR"
              textStyle={{
                color: "#1A4789",
                fontWeight: "bold",
                fontSize: width * 0.05,
              }}
            />
            <CustomButton
              containerStyle={{
                backgroundColor: "#4DA4E0",
                width: "80%",
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
              onPress={() => console.log("Relaksasi pernafasan")}
              text="RELAKSASI PERNAFASAN"
              textStyle={{
                color: "#1A4789",
                fontWeight: "bold",
                fontSize: width * 0.05,
              }}
            />
          </View>
        </View>
      </ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}
