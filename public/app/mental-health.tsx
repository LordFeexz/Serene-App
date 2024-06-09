import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import CustomButton from "@/components/CustomButton";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import Question from "@/components/Question";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
const mentalHealthQuestions = [
  {
    text: "Saya  sering sulit tidur atau tidur tidak berkualitas?",
    choosen: false,
  },
  {
    text: "Saya  sering merasa cepat lelah atau kelelahan?",
    choosen: false,
  },
  {
    text: "Saya  sulit untuk konsentrasi/fokus dalam mengerjakan sesuatu?",
    choosen: false,
  },
  {
    text: "Emosi saya cenderung tidak stabil dan sensitif",
    choosen: false,
  },
];

export default function mentalHealth() {
  const [questions, setQuestions] = useState(mentalHealthQuestions);
  const { height } = Dimensions.get("window");
  const handleSetQuestions = (answer: boolean, index: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((item, idx) =>
        idx === index ? { ...item, choosen: answer } : item
      )
    );
  };

  const handleSubmit = () => {
    console.log(questions);
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
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <AntDesign name="user" size={50} color="#3A8BC9" />
        </View>
        <View style={{ flex: 4 }}>
          <Text
            style={{
              fontSize: height * 0.03,
              textAlign: "center",
              color: "#1A4789",
            }}
          >
            Halo Bagaimana perasaan anda hari ini?
          </Text>
        </View>
      </ContainerHead>
      <ContainerBody>
        <ScrollView style={{ marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            {questions.map((item, index) => (
              <Question
                item={item}
                index={index}
                key={index}
                handleSetQuestions={handleSetQuestions}
              />
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
                onPress={handleSubmit}
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
