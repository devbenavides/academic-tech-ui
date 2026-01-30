import { toast, type ToastOptions, type ToastPosition } from "react-toastify";


// Configuración por defecto para todos los toasts
const DEFAULT_POSITION: ToastPosition = "top-right";

const defaultConfig: ToastOptions = {
  position: DEFAULT_POSITION,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored", // "light" | "dark" | "colored"
};

export const toastService = {
  success: (message: string, config?: ToastOptions) => {
    toast.success(message, { ...defaultConfig, ...config });
  },
  error: (message: string, config?: ToastOptions) => {
    toast.error(message, { ...defaultConfig, ...config });
  },
  info: (message: string, config?: ToastOptions) => {
    toast.info(message, { ...defaultConfig, ...config });
  },
  warn: (message: string, config?: ToastOptions) => {
    toast.warn(message, { ...defaultConfig, ...config });
  },
};
