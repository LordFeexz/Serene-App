import Container from "@/components/Container";
import ContainerBody from "@/components/ContainerBody";
import ContainerHead from "@/components/ContainerHead";
import ContainerLogo from "@/components/ContainerLogo";
import CustomButton from "@/components/CustomButton";
import FooterWithMenu from "@/components/FooterWithMenu";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import { getItem } from "@/services/secureStore";
import { Toast } from "@/services/toasts";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { Dimensions, Image, Platform, Text, View } from "react-native";

const { StorageAccessFramework } = FileSystem;

export default function ebook() {
  const { height, width } = Dimensions.get("window");
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const downloadPath =
    FileSystem.documentDirectory + (Platform.OS == "android" ? "" : "");
  const ensureDirAsync = async (dir: string, intermediates = true) => {
    const props = await FileSystem.getInfoAsync(dir);
    if (props.exists && props.isDirectory) {
      return props;
    }
    let _ = await FileSystem.makeDirectoryAsync(dir, { intermediates });
    return await ensureDirAsync(dir, intermediates);
  };
  const downloadCallback = (downloadProgress: any) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  const downloadFile = async (fileUrl: string) => {
    if (Platform.OS == "android") {
      const dir = ensureDirAsync(downloadPath);
    }
    let fileName = "pdf.pdf";
    const headers = {
      Authorization: (await getItem("access_token")) as string,
    };

    console.log(fileUrl, downloadPath, headers);
    const downloadResumable = FileSystem.createDownloadResumable(
      fileUrl,
      downloadPath + fileName,
      {
        headers,
      },
      downloadCallback
    );

    try {
      const downloadResult = await downloadResumable.downloadAsync();
      if (Platform.OS == "android")
        saveAndroidFile(downloadResult?.uri as string, fileName);
    } catch (e) {
      console.error("download error:", e);
    }
  };
  const saveAndroidFile = async (fileUri: string, fileName = "File") => {
    try {
      const fileString = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }

      try {
        setLoading(true);
        await StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName,
          "application/pdf"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, {
              encoding: FileSystem.EncodingType.Base64,
            });
            Toast("File Downloaded", "success");
          })
          .catch((e) => {});
      } catch (e) {
        throw new Error(e as unknown as string);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <ContainerLogo>
        <Logo />
      </ContainerLogo>
      <ContainerHead
        style={{
          borderRadius: 30,
          backgroundColor: "#B8E1F1",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            padding: 2,
          }}
        >
          <Image
            source={require("@/assets/images/ebook.png")}
            style={{
              objectFit: "contain",
              width: 0.2 * width,
              height: 0.3 * width,
            }}
          />
        </View>
        <View style={{ flex: 4 }}>
          <Text
            style={{
              fontSize: width * 0.04,
              textAlign: "center",
              color: "#1A4789",
            }}
          >
            Halo! berikut E-BOOK TENTANG MENTAL HEALTH YANG DAPAT MEMBERIKAN
            WAWASAN KEPADA ANDA
          </Text>
        </View>
      </ContainerHead>
      <ContainerBody style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            flex: 0.8,
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#B8E1F1",
            width: "90%",
            flexDirection: "row",
            borderRadius: 10,
          }}
        >
          <Image
            source={require("@/assets/images/buku.png")}
            style={{
              objectFit: "contain",
              width: 0.4 * width,
              height: 0.4 * height,
            }}
          />
          <CustomButton
            onPress={async () =>
              downloadFile("https://serene-app.onrender.com/api/v1/assets/pdf")
            }
            text="DOWNLOAD E-BOOK"
            textStyle={{
              color: "white",
              fontSize: width * 0.04,
            }}
            containerStyle={{
              backgroundColor: "#1A4789",
              padding: 8,
              borderRadius: 10,
            }}
          />
        </View>
        {loading && (
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loading />
          </View>
        )}
      </ContainerBody>
      <FooterWithMenu />
    </Container>
  );
}
