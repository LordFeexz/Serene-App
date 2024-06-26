import Container from "@/components/Container";
import Footer from "@/components/Footer";
import LinkButton from "@/components/LinkButton";
import { FontAwesome6 } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SuccessAlert from "@/components/SuccessAlert";
import { setItem } from "@/services/secureStore";

export default function Login() {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    fetch("https://34dd-180-252-48-151.ngrok-free.app/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItem("access_token", data.data);
        SuccessAlert("Login Success");
        router.replace("/");
      })
      .catch((e) => console.log(e, "<~"));
  };
  return (
    <Container styles={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/serene.png")}
          style={styles.logo}
        />
        <Image
          source={require("@/assets/images/user-icon.png")}
          style={styles.userIcon}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.inputStyle}>
          <AntDesign name="user" size={24} color="#FF" />
          <TextInput
            onChangeText={onChangeUsername}
            value={username}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputStyle}>
          <FontAwesome6 name="unlock-keyhole" size={26} color="#3A8BC9" />
          <TextInput
            style={styles.textInput}
            onChangeText={onChangePassword}
            value={password}
          />
        </View>
        <View style={styles.signInContainer}>
          <Pressable onPress={handleLogin}>
            <Text style={styles.signInText}>Sign in</Text>
          </Pressable>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>OR</Text>
        <View style={styles.loginIconsContainer}>
          <AntDesign name="google" size={36} color="black" />
          <AntDesign name="twitter" size={36} color="black" />
          <AntDesign name="facebook-square" size={36} color="black" />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Doesn't have an account </Text>
          <LinkButton
            text="Sign up"
            href="/register"
            containerStyle={{}}
            textStyle={{}}
          />
        </View>
      </View>
      <Footer />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 100,
    marginTop: 25,
  },
  userIcon: {
    width: 200,
    height: 200,
  },
  inputStyle: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    width: "80%",
    borderColor: "#3A8BC9",
  },
  loginIconsContainer: {
    flexDirection: "row",
    gap: 24,
  },
  header: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  body: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 3,
    gap: 3,
    width: "100%",
  },
  signInContainer: {
    backgroundColor: "#4DA4E0",
    padding: 10,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  signInText: { color: "#804861", fontWeight: "bold", fontSize: 21.5 },
});
