import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="activity" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
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
