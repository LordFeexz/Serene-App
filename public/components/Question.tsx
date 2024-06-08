import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
export default function Question({
  item,
  index,
  handleSetQuestions,
}: {
  item: { text: string; choosen: boolean | null };
  index: number;
  handleSetQuestions: (answer: boolean, index: number) => void;
}) {
  const [active, setActive] = useState("null");
  const handlePress = (itemChoosen: string) => {
    if (itemChoosen === "yes") {
      setActive("yes");
      handleSetQuestions(true, index);
    } else {
      setActive("no");
      handleSetQuestions(false, index);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        margin: 2,
      }}
      key={index}
    >
      <Text style={{ fontWeight: "bold", marginLeft: 8, fontSize: 18 }}>
        {item.text}
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
            onPress={() => handlePress("yes")}
          >
            {active == "yes" && item.choosen ? (
              <Fontisto name="radio-btn-active" size={24} color="black" />
            ) : (
              <Fontisto name="radio-btn-passive" size={24} color="black" />
            )}
            <Text>Yes</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            onPress={() => handlePress("no")}
          >
            {active == "no" && !item.choosen ? (
              <Fontisto name="radio-btn-active" size={24} color="black" />
            ) : (
              <Fontisto name="radio-btn-passive" size={24} color="black" />
            )}
            <Text>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
