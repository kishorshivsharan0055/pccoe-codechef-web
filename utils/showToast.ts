import { toast, Zoom } from "react-toastify";

export const showToast = (
  text: string,
  type:
    | "dark"
    | "default"
    | "error"
    | "info"
    | "success"
    | "warning" = "default"
): void => {
  toast(text, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    transition: Zoom,
    closeButton: false,
    progress: undefined,
    bodyStyle: {
      padding: "0px 8px",
      fontWeight: 600,
    },
  });
};
