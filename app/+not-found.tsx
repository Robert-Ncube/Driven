import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NotFoundScreen = () => {
  return (
    <View className="flex-1 gap-6 justify-center items-center bg-white">
      <Text className="font-bold text-4xl text-gray-800">
        Sorry! Page Not Found
      </Text>
      <Link
        href={"/(root)/(tabs)/Home"}
        className="py-2 px-4 rounded-lg bg-slate-100"
      >
        GO HOME
      </Link>
    </View>
  );
};

export default NotFoundScreen;
