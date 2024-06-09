import { Link } from "expo-router";
import { Pressable, Text } from "react-native";

export type Props = {
  text: string;
  containerStyle?: object;
  textStyle: object;
  href: string;
};
export default function LinkButton({
  text,
  textStyle = {},
  href,
  containerStyle = {},
}: Props) {
  return (
    <Link href={href} asChild>
      <Pressable
        style={{
          ...containerStyle,
        }}
      >
        <Text style={{ ...textStyle }}>{text}</Text>
      </Pressable>
    </Link>
  );
}
