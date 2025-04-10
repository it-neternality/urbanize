import { CustomAlertProps } from "../types";

export const CustomAlert = ({ message, title, isOpen, onClose }: CustomAlertProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-white rounded-xl shadow-2xl max-w-md mx-auto overflow-hidden animate-[slideUp_0.3s_ease-out]">
                <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <h3 className="text-lg font-bold">{title || "הודעה"}</h3>
                </div>
                <div className="p-6 text-right">
                    <p className="text-gray-800">{message}</p>
                </div>
                <div className="p-4 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                        אישור
                    </button>
                </div>
            </div>
        </div>
    );
};
