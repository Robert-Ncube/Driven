import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboardingSlides } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const isLastSlide = currentPage === onboardingSlides.length - 1;

  const swiperRef = useRef<Swiper>(null);
  return (
    <SafeAreaView className="h-full w-full items-center justify-between bg-white">
      <TouchableOpacity className="w-full flex justify-end items-end p-5">
        <Text
          onPress={() => router.replace("/(auth)/sign-up")}
          className="text-black text-md font-JakartaBold"
        >
          Skip
        </Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setCurrentPage(index)}
      >
        {onboardingSlides.map((slide: any) => (
          <View key={slide.id} className="flex items-center justify-center">
            <Image
              source={slide.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex items-center justify-center w-full mt-10">
              <Text className="text-black text-center font-bold mx-10 text-3xl">
                {slide.title}
              </Text>
              <Text className="text-md font-JakartaSemiBold text-center text-slate-400 mx-10 mt-3">
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className={"w-full max-w-sm my-4 py-2"}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
