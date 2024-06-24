import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import LinkButton from "@/components/LinkButton";
import { removeItem } from "@/services/secureStore";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Submenu() {
  const router = useRouter();
  const buttons = [
    {
      text: "Account",
      onPress: () => {
        console.log("Account");
      },
      href: "/",
    },
    {
      text: "My Activity",
      onPress: () => {
        console.log("Settings");
      },
      href: "/",
    },
    {
      text: "See All Features",
      onPress: () => {
        router.replace("/");
      },
      href: "/",
    },
  ];
  return (
    <Container>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20.7, color: "#804861" }}>
          Profile
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          borderRadius: 30,
          backgroundColor: "#B8E1F1",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <AntDesign name="user" size={50} color="black" />
        <View style={{ flexDirection: "column" }}>
          <Text>Tiara</Text>
          <Text>Pengguna</Text>
        </View>
      </View>
      <View style={{ flex: 15, alignItems: "center", marginTop: 40, gap: 20 }}>
        <FlatList
          data={buttons}
          style={{ width: "100%" }}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
              }}
            >
              <LinkButton
                text={item.text}
                key={item.text}
                containerStyle={{
                  ...styles.containerButton,
                  backgroundColor: index % 2 === 0 ? "#4DA4E0" : "#B8E1F1",
                }}
                textStyle={{ ...styles.textStyle }}
                href={item.href}
              />
            </View>
          )}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <CustomButton
          containerStyle={{
            ...styles.buttonLogout,
          }}
          textStyle={{ ...styles.buttonText }}
          text="Logout"
          onPress={() => {
            removeItem("access_token");
            router.replace("/login");
          }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDFAFF",
  },
  containerButton: {
    height: 50,
    padding: 10,
    width: "70%",
    borderRadius: 20,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#804861",
    marginLeft: 10,
  },
  buttonLogout: {
    height: 50,
    padding: 10,
    width: "40%",
    borderRadius: 5,
    backgroundColor: "#B8E1F1",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16.5,
    color: "#EE217F",
  },
});
