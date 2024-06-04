import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Logo from "@/components/Logo";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";

export default function Index() {
  const imagesRoutes = [
    {
      component: (
        <Image source={require("@/assets/images/mental-health.png")} />
      ),
      link: "/mental-health",
    },
    {
      component: <Image source={require("@/assets/images/mood-test.png")} />,
      link: "/mood-test",
    },
    {
      component: <Image source={require("@/assets/images/activity.png")} />,
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
          padding: 5,
        }}
      >
        {imagesRoutes.map((item, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link href={item.link} asChild>
              <Pressable>{item.component}</Pressable>
            </Link>
          </View>
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
        {mainMenus.map((item, index) => (
          <Link href={item.link} asChild key={index}>
            <Pressable>{item.component}</Pressable>
          </Link>
        ))}
      </ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}

const styles = StyleSheet.create({});
