import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import CustomButton from "@/components/CustomButton";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function mentalHealth() {
  const questions = [
    {
      text: "Saya  sering sulit tidur atau tidur tidak berkualitas?",
    },
    {
      text: "Saya  sering merasa cepat lelah atau kelelahan?",
    },
    {
      text: "Saya  sulit untuk konsentrasi/fokus dalam mengerjakan sesuatu?",
    },
    {
      text: "Emosi saya cenderung tidak stabil dan sensitif",
    },
  ];
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
          <AntDesign name="user" size={50} color="#3A8BC9" />
        </View>
        <View style={{ flex: 4 }}>
          <Text style={{ fontSize: 24, textAlign: "center", color: "#1A4789" }}>
            Halo Bagaimana perasaan anda hari ini?
          </Text>
        </View>
      </ContainerHead>
      <ContainerBody>
        <ScrollView style={{ marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            {questions.map((item, index) => (
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  justifyContent: "center",
                  margin: 2,
                }}
                key={index}
              >
                <Text
                  style={{ fontWeight: "bold", marginLeft: 8, fontSize: 18 }}
                >
                  {item.text}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    backgroundColor: "#B8E1F1",
                    width: "100%",
                    height: 50,
                    borderRadius: 20,
                    alignItems: "center",
                  }}
                >
                  <Text>Yes</Text>
                  <Text>No</Text>
                </View>
              </View>
            ))}

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <CustomButton
                containerStyle={{
                  backgroundColor: "#1A4789",
                  padding: 5,
                  borderRadius: 10,
                  width: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                textStyle={{ fontSize: 20, color: "#B8E1F1" }}
                text="Submit"
                onPress={() => console.log("Submit")}
              />
            </View>
          </View>
        </ScrollView>
      </ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}

const styles = StyleSheet.create({});
