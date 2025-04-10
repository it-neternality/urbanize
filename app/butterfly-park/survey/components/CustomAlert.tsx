import { CustomAlertProps } from "../types";

export const CustomAlert = ({ message, title, isOpen, onClose }: CustomAlertProps) => {
    if (!isOpen) return null;

    return (
        <div className="custom-alert-overlay">
            <div className="custom-alert-container">
                <div className="custom-alert-header">
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "700" }}>{title || "הודעה"}</h3>
                </div>
                <div className="custom-alert-content">
                    <p style={{ color: "#1f2937" }}>{message}</p>
                </div>
                <div className="custom-alert-footer">
                    <button
                        onClick={onClose}
                        className="custom-alert-button"
                    >
                        אישור
                    </button>
                </div>
            </div>
        </div>
    );
};
