import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import CustomButton from "@/components/CustomButton";
import FooterWithMenu from "@/components/FooterWithMenu";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import Question from "@/components/Question";
import { getMentalHealth, postMentalHealth } from "@/services/fetchService";
import { Toast } from "@/services/Toast";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
type Questions = {
  question: string;
  answer: string;
};

export default function mentalHealth() {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const router = useRouter();
  const [disableForm, setDisableForm] = useState(true);

  const { height } = Dimensions.get("window");
  const handleSetQuestions = (answer: string, index: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((item, idx) =>
        idx === index ? { ...item, answer: answer } : item
      )
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const menatalHealthQuestion = await getMentalHealth();
        const questions = menatalHealthQuestion.data.map((el: string) => ({
          question: el,
          answer: "",
        }));
        setQuestions(questions);
      } catch (error) {
        Toast("Internal Server Error", "danger");
      } finally {
        setDisableForm(false);
      }
    })();
  }, []);
  const handleSubmit = async () => {
    try {
      console.log(questions);
      setDisableForm(true);
      const resultMentalHealth = await postMentalHealth(questions);
      setDisableForm(false);
      router.replace({
        pathname: "/mental-health-result",
        params: {
          score: resultMentalHealth.data.result,
          message: resultMentalHealth.message,
        },
      });
    } catch (error) {
      Toast("Harap isi semua jawaban", "danger");
      console.log(error);
    } finally {
      setDisableForm(false);
    }
  };

  if (disableForm) return <Loading />;
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
                disableForm={disableForm}
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
