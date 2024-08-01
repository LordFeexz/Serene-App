import { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
export default function Question({
  item,
  index,
  handleSetQuestions,
}: {
  item: { question: string; answer: string };
  index: number;
  handleSetQuestions: (answer: string, index: number) => void;
}) {
  const { height } = Dimensions.get("window");
  const handlePress = (itemChoosen: string) => {
    handleSetQuestions(itemChoosen, index);
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        padding: 5,
      }}
      key={index}
    >
      <Text
        style={{ fontWeight: "bold", marginLeft: 8, fontSize: 0.023 * height }}
      >
        {item.question}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#B8E1F1",
          width: "100%",
          height: 50,
          borderRadius: 20,
          alignItems: "center",
        }}
      >
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            onPress={() => handlePress("Tidak pernah")}
          >
            {item.answer == "Tidak pernah" ? (
              <Fontisto name="radio-btn-active" size={24} color="black" />
            ) : (
              <Fontisto name="radio-btn-passive" size={24} color="black" />
            )}
            <Text style={{ fontSize: 10 }}>Tidak Pernah</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            onPress={() => handlePress("Jarang")}
          >
            {item.answer == "Jarang" ? (
              <Fontisto name="radio-btn-active" size={24} color="black" />
            ) : (
              <Fontisto name="radio-btn-passive" size={24} color="black" />
            )}
            <Text style={{ fontSize: 10 }}>Jarang</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            onPress={() => handlePress("Sesekali")}
          >
            {item.answer == "Sesekali" ? (
              <Fontisto name="radio-btn-active" size={24} color="black" />
            ) : (
              <Fontisto name="radio-btn-passive" size={24} color="black" />
            )}
            <Text style={{ fontSize: 10 }}>Sesekali</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            onPress={() => handlePress("Sering")}
          >
            {item.answer == "Sering" ? (
              <Fontisto name="radio-btn-active" size={24} color="black" />
            ) : (
              <Fontisto name="radio-btn-passive" size={24} color="black" />
            )}
            <Text style={{ fontSize: 10 }}>Sering</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
