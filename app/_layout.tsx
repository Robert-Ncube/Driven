import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { useFonts } from "@expo-google-fonts/dev";
import { Stack } from "expo-router";
import "../global.css";

import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { tokenCache } from "@/lib/cache";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    //Jakarta
    "Jakarta-Bold": require("../assets/fonts/plusjakarta/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/plusjakarta/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/plusjakarta/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/plusjakarta/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/plusjakarta/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("../assets/fonts/plusjakarta/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/plusjakarta/PlusJakartaSans-SemiBold.ttf"),

    //Outfit
    "Outfit-Bold": require("../assets/fonts/outfit/Outfit-Bold.ttf"),
  });

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
