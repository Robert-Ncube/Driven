import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form?.email,
        password: form?.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      Alert.alert("Error:", err?.errors[0]?.longMessage);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification?.code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
        setShowSuccessModal(true);
      } else {
        setVerification({
          ...verification,
          error: "Verification failed!",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err?.errors[0]?.longMessage,
        state: "failed",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images?.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-black text-2xl font-JakartaBold absolute bottom-5 left-5 capitalize">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label={"Name"}
            placeholder="Enter your name..."
            icon={icons?.person}
            value={form?.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email..."
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password..."
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Sign Up"
            className="mt-6"
            onPress={onSignUpPress}
          />
          <OAuth />
          <Text className="text-center text-lg text-gray-600 my-6">
            Already have an account?
            <Link href={"/(auth)/sign-in"}>
              <Text className="text-blue-600 font-bold px-2"> Login</Text>
            </Link>
          </Text>
        </View>

        {/** Pending Verification Modal */}
        <ReactNativeModal
          isVisible={verification?.state === "pending"}
          onModalHide={() => {
            if (verification?.state === "success") setShowSuccessModal(true);
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-center text-4xl font-bold font-JakartaBold text-gray-800">
              Verify Your Email
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center my-2">
              We sent a verification code to {form?.email}. Please enter it
              below.
            </Text>
            <InputField
              label="Verification Code"
              icon={icons?.lock}
              placeholder="Enter your verification code..."
              value={verification?.code}
              keyboardType="numeric"
              onChangeText={(value) =>
                setVerification({ ...verification, code: value })
              }
            />
            {verification?.error && (
              <Text className="text-red-500 text-center text-sm font-Jakarta my-2">
                {verification?.error}
              </Text>
            )}
            <CustomButton
              title="Verify"
              className="mt-6 bg-success-500"
              onPress={onVerifyPress}
            />
          </View>
        </ReactNativeModal>

        {/** Successful Verification Modal */}
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images?.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-center text-4xl font-bold font-JakartaBold text-gray-800">
              Verified!
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center my-2">
              Your account was successfully verified!
            </Text>
            <CustomButton
              title="Go Home"
              className="mt-6"
              onPress={() => router.replace("/(root)/(tabs)/Home")}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
