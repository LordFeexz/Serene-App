import { getItem } from "@/services/secureStore";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const access_token = await getItem("access_token");
      if (!access_token) {
        return router.replace("/");
      }

      return router.replace("/");
    })();
  }, []);
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="activity" />
        <Stack.Screen name="login" />
        <Stack.Screen name="index" />
        <Stack.Screen name="submenu" />
        <Stack.Screen name="mental-health" />
        <Stack.Screen name="mental-health-result" />
        <Stack.Screen name="mood-test" />
        <Stack.Screen name="suara" />
        <Stack.Screen name="video" />
        <Stack.Screen name="video-player" />
        <Stack.Screen name="mood-test-result" />
      </Stack>
    </ThemeProvider>
  );
}
