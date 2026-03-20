import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ open, onClose, children }) => {
    const dialog = useRef();
    const modalRootElement = document.getElementById("modal");

    useEffect(() => {
        const dialogElement = dialog.current;

        if (!dialogElement) {
            return;
        }

        if (open) {
            dialogElement.showModal();
        } else if (dialogElement.open) {
            dialogElement.close();
        }

        return () => {
            if (dialogElement.open) {
                dialogElement.close();
            }
        };
    }, [open]);

    const modalContent = (
        <dialog ref={dialog} className="modal" onClose={onClose}>
            {children}
        </dialog>
    );

    if (!modalRootElement) {
        return null;
    }

    return createPortal(modalContent, modalRootElement);
};

export default Modal