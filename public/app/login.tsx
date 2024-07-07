import Container from "@/components/Container";
import Footer from "@/components/Footer";
import LinkButton from "@/components/LinkButton";
import { FontAwesome6 } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SuccessAlert from "@/components/SuccessAlert";
import { getItem, setItem } from "@/services/secureStore";
import CustomKeyboard from "@/components/CustomKeyboard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  const router = useRouter();
  const breakpoint1 = 667;
  const padding1 = 50;
  const breakpoint2 = 932;
  const padding2 = 300;
  const { height } = Dimensions.get("window");
  const m = (padding2 - padding1) / (breakpoint2 - breakpoint1);
  const c = padding1 - m * breakpoint1;
  const paddingBottom = m * height + c;

  useEffect(() => {
    (async () => {
      try {
        const access_token = await getItem("access_token");
        if (access_token) {
          return router.replace("/");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleLogin = () => {
    fetch("https://42jz4hld-3001.asse.devtunnels.ms/api/v1/user/login", {
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
        console.log(typeof data.data);
        console.log(data);
        setItem("access_token", data.data);
        SuccessAlert("Login Success");
        return router.replace("/");
      })
      .catch((e) => console.log(e, "<~"));
  };
  return (
    <KeyboardAwareScrollView
      style={{ flexGrow: 1 }}
      keyboardShouldPersistTaps={
        Platform.OS == "android" ? "handled" : "always"
      }
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flex: 1,
          position: "relative",
          paddingBottom,
        }}
      >
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
          <CustomKeyboard>
            <View style={styles.inputStyle}>
              <AntDesign name="user" size={24} color="#FF" />
              <TextInput
                onChangeText={onChangeUsername}
                value={username}
                style={styles.textInput}
              />
            </View>
          </CustomKeyboard>
          <CustomKeyboard>
            <View style={styles.inputStyle}>
              <FontAwesome6 name="unlock-keyhole" size={26} color="#3A8BC9" />
              <TextInput
                style={styles.textInput}
                onChangeText={onChangePassword}
                value={password}
              />
            </View>
          </CustomKeyboard>
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
      </View>
    </KeyboardAwareScrollView>
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
