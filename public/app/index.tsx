import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import FooterWithMenu from "@/components/FooterWithMenu";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import { getItem } from "@/services/secureStore";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const access_token = await getItem("access_token");
        if (!access_token) {
          router.replace("/login");
          return;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const imagesRoutes = [
    {
      component: (
        <Image
          source={require("@/assets/images/new-icon/new-mentalhealth.png")}
          style={{
            height: height > 700 ? (((1 / 3) * 80) / 100) * height : height / 3,
            width: 0.37 * width,
            objectFit: "contain",
          }}
        />
      ),
      link: "/mental-health",
    },
    {
      component: (
        <Image
          source={require("@/assets/images/new-icon/new-moodtest.png")}
          style={{
            height: height > 700 ? (((1 / 4) * 80) / 100) * height : height / 4,
            width: 0.35 * width,
            objectFit: "contain",
          }}
        />
      ),
      link: "/mood-test",
    },
    {
      component: (
        <Image
          source={require("@/assets/images/new-icon/new-activity.png")}
          style={{
            height: (((1 / 4) * 80) / 100) * height,
            width: 0.4 * width,
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
  if (isLoading) return <Loading />;

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
