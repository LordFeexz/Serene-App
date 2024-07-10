import { MessageType, showMessage } from "react-native-flash-message";
export const Toast = (message: string, type: MessageType) => {
  return showMessage({
    message: `${message}`,
    type: `${type}`,
    icon: "auto",
    duration: 3000,
    hideOnPress: true,
    autoHide: true,
  });
};
