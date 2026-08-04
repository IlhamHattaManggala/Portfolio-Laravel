
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Ya, Hapus",
  cancelText = "Batal",
  type = "danger"
}: ConfirmationModalProps) => {
  const accentColor = type === "danger" ? "red" : type === "warning" ? "yellow" : "blue";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-[1000] w-full max-w-md bg-card rounded-[2.5rem] shadow-2xl border border-border p-8 my-auto"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-20 h-20 rounded-3xl bg-${accentColor}-50 dark:bg-${accentColor}-900/20 text-${accentColor}-600 flex items-center justify-center mb-6`}>
                <AlertTriangle size={40} />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">{message}</p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 px-6 py-4 rounded-2xl bg-${accentColor === 'red' ? 'red-600' : accentColor === 'blue' ? 'blue-600' : 'yellow-500'} text-white font-bold shadow-lg shadow-${accentColor}-600/20 hover:brightness-110 transition-all active:scale-95`}
                >
                  {confirmText}
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
