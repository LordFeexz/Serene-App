import { MessageType, showMessage } from "react-native-flash-message";

export const Toast = (message: string, type: MessageType) => {
  showMessage({
    message: `${message}`,
    type: `${type}`,
    icon: "auto",
    duration: 5000,
    hideOnPress: true,
    autoHide: true,
  });
};
