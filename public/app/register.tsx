import Container from "@/components/Container";
import Footer from "@/components/Footer";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SuccessAlert from "@/components/SuccessAlert";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function register() {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  const [email, onChangeEmail] = useState("");

  const breakpoint1 = 667;
  const padding1 = 50;
  const breakpoint2 = 932;
  const padding2 = 300;
  const { height } = Dimensions.get("window");
  const m = (padding2 - padding1) / (breakpoint2 - breakpoint1);
  const c = padding1 - m * breakpoint1;
  const paddingBottom = m * height + c;
  const handleRegister = () => {
    fetch("https://42jz4hld-3001.asse.devtunnels.ms/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        SuccessAlert("Register Success");
        router.push("/login");
      })
      .catch(console.log);
  };
  return (
    <KeyboardAwareScrollView
      style={{ flexGrow: 1 }}
      keyboardShouldPersistTaps={
        Platform.OS == "android" ? "handled" : "always"
      }
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1, position: "relative", paddingBottom }}>
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
            <AntDesign name="link" size={24} color="#FF" />
            <TextInput
              onChangeText={onChangeEmail}
              value={email}
              style={styles.textInput}
            />
          </View>
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
            <Pressable onPress={handleRegister}>
              <Text style={styles.signInText}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
        <Footer />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
  body: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 3,
    gap: 3,
    width: "100%",
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
  signInText: { color: "#804861", fontWeight: "bold", fontSize: 21.5 },
  signInContainer: {
    backgroundColor: "#4DA4E0",
    padding: 10,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
