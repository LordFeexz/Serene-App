import CustomKeyboard from "@/components/CustomKeyboard";
import Footer from "@/components/Footer";
import LinkButton from "@/components/LinkButton";
import VerificationButton from "@/components/VerificationButton";
import { loginRest, verifToken } from "@/services/fetchService";
import { getItem, setItem } from "@/services/secureStore";
import { Toast } from "@/services/toasts";
import { FontAwesome6 } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useEffect, useState } from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useRoute } from "@react-navigation/native";

export default function Login() {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  const [notVerified, setNotVerified] = useState(false);
  const breakpoint1 = 667;
  const padding1 = 50;
  const breakpoint2 = 932;
  const padding2 = 300;
  const { height } = Dimensions.get("window");
  const m = (padding2 - padding1) / (breakpoint2 - breakpoint1);
  const c = padding1 - m * breakpoint1;
  const paddingBottom = m * height + c;
  const [disableForm, setDisableForm] = useState(false);
  const route = useRoute();
  const { result } = route.params as any;

  useEffect(() => {
    (async () => {
      try {
        const access_token = await getItem("access_token");
        if (access_token) {
          return router.replace("/");
        }

        if (result) Toast("Verifikasi berhasil!", "success");
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleLogin = () => {
    try {
      setDisableForm(true);
      loginRest({ email: username, password })
        .then(async (data) => {
          console.log(data.code);
          if (data.code == 401) throw { data: { message: data.message } };
          await setItem("access_token", data.data);
          Toast("Login Success", "success");
          return router.replace("/");
        })
        .catch((e) => {
          let message = e.data
            ? Object.keys(e.data).map((key) => e.data[key])[0]
            : e.message;
          if (message == "akun mu belum di verifikasi") {
            setNotVerified(true);
          }
          Toast(message, "danger");
        });
    } catch (error) {
      console.log(error);
    } finally {
      setDisableForm(false);
    }
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
                placeholder="Email"
                placeholderTextColor="grey"
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
                placeholder="Password"
                placeholderTextColor="grey"
                secureTextEntry={true}
              />
            </View>
          </CustomKeyboard>
          <View style={styles.signInContainer}>
            <Pressable onPress={handleLogin} disabled={disableForm}>
              <Text style={styles.signInText}>Sign in</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text>Doesn't have an account ?</Text>
            <LinkButton
              text="Sign up"
              href="/register"
              containerStyle={{}}
              textStyle={{
                color: "blue",
              }}
            />
          </View>

          {notVerified && <VerificationButton email={username} />}
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
