import { postResendEmail } from "@/services/fetchService";
import { Toast } from "@/services/toasts";
import { Button, Text, View } from "react-native";

export default function VerificationButton({ email }: { email: string }) {
  const handleResend = () => {
    postResendEmail(email);
    Toast(
      "Sukses kirim ulang email verifikasi! Check Inbox/Spam folder di email kamu, ya!",
      "success"
    );
  };
  return (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Akunmu belum terverifikasi. </Text>
      <Text>Belum menerima email verifikasi?</Text>
      <Button onPress={handleResend} title="Kirim Ulang" />
    </View>
  );
}
