import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import LinkButton from "@/components/LinkButton";
import { clearAllCache } from "@/services/cache";
import { myDataRest } from "@/services/fetchService";
import { removeItem } from "@/services/secureStore";
import { Toast } from "@/services/toasts";
import { AntDesign } from "@expo/vector-icons";
import { router, useNavigationContainerRef } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Submenu() {
  const rootNavigation = useNavigationContainerRef();
  const [username, setUsername] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = (await myDataRest()) as { data: { username: string } };
        setUsername(data.username);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
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
      href: "/activity",
    },
    {
      text: "See All Features",
      href: "/",
    },
  ];
  const handleLogout = () => {
    try {
      removeItem("access_token");
      clearAllCache();
      Toast("Logout Sukses!", "success");
      if (!rootNavigation) throw new Error();
      router.dismissAll();
      return router.replace("/login");
    } catch (error) {
      return router.replace("/login");
    }
  };
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
          <Text>{username}</Text>
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
          onPress={handleLogout}
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
