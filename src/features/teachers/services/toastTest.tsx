
import { toastService } from "../../../shared/services/toastService";

export const ToastTestButton = () => {
  return (
    <div className="p-4">
      <h2>Probar Toasts</h2>
      <button
        onClick={() => toastService.success("¡Toast de éxito!") }
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
      >
        Success
      </button>

      <button
        onClick={() => toastService.error("¡Toast de error!") }
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
      >
        Error
      </button>

      <button
        onClick={() => toastService.info("Toast informativo") }
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Info
      </button>

      <button
        onClick={() => toastService.warn("Toast de advertencia") }
        className="bg-yellow-500 text-black px-4 py-2 rounded"
      >
        Warn
      </button>
    </div>
  );
};
