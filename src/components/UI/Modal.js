import { useEffect, useRef } from "react";

const Modal = ({ open, onClose, children }) => {
    const dialog = useRef();

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

    return (
        <dialog ref={dialog} className="modal" onClose={onClose}>
            {children}
        </dialog>
    );
};

export default Modal