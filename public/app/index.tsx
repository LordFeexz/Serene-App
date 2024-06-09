import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { Link } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { width, height } = Dimensions.get("window");
  const imagesRoutes = [
    {
      component: (
        <Image
          source={require("@/assets/images/mental-health.png")}
          style={{
            height: (((1 / 7) * 85) / 100) * height,
            width: 0.25 * width,
            objectFit: "contain",
          }}
        />
      ),
      link: "/mental-health",
    },
    {
      component: (
        <Image
          source={require("@/assets/images/mood-test.png")}
          style={{
            height:
              height > 700 ? (((1 / 7) * 80) / 100) * height : height / 7.6,
            width: 0.22 * width,
            objectFit: "contain",
          }}
        />
      ),
      link: "/mood-test",
    },
    {
      component: (
        <Image
          source={require("@/assets/images/activity.png")}
          style={{
            height: (((1 / 7) * 80) / 100) * height,
            width: 0.2 * width,
            objectFit: "contain",
          }}
        />
      ),
      link: "/activity",
    },
  ];
  const mainMenus = [
    {
      component: <Image source={require("@/assets/images/terapi.png")} />,
      link: "/terapi",
    },
    {
      component: <Image source={require("@/assets/images/rujukan.png")} />,
      link: "/rujukan",
    },
    {
      component: <Image source={require("@/assets/images/ebook.png")} />,
      link: "/ebook",
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
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          padding: 5,
          flex: height < 700 ? 1.2 : 1,
        }}
      >
        {imagesRoutes.map((item, index) => (
          <Link href={item.link} asChild key={index}>
            <TouchableOpacity>{item.component}</TouchableOpacity>
          </Link>
        ))}
      </ContainerHead>
      <ContainerBody
        style={{
          margin: 5,
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {mainMenus.map((item, index) => (
              <Link href={item.link} asChild key={index}>
                <Pressable>{item.component}</Pressable>
              </Link>
            ))}
          </View>
        </ScrollView>
      </ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}

const styles = StyleSheet.create({});
