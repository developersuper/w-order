
import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./modal.css";
type ModalProps = {
  title?: string;
  children: ReactNode;
  footer?: string;
  onClose: () => void;
  show: boolean;
  className?: string;
  hasCloseButton?: boolean;
  styles?: string;
}

const Modal = ({title, children, footer, onClose, show, className, hasCloseButton = false, styles}: ModalProps) => {
  const closeOnEscapeKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  useEffect(() => {
    const htmlElement = document.getElementsByTagName("html")[0];
    if(show) {
      htmlElement.style.overflow='hidden';
    } else {
      htmlElement.style.overflow='auto';
    }
  }, [show]);

  return ReactDOM.createPortal(
    <CSSTransition
      in={show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className={`modal z-50 ${styles}`} onClick={onClose}>        
        <div className={`modal-content relative ${className} min-h[calc(100vh - 20px)]`} onClick={e => e.stopPropagation()}>
          {hasCloseButton && <button type="button" title={""} className="absolute right-4 lg:right-6 top-5" onClick={onClose}>
            
          </button>}
          <div className="modal-content-container">
            {title && <div className="modal-header">
              <h4 className="modal-title">{title}</h4>
            </div>}
            <div className="modal-body">{children}</div>
            {footer && <div className="modal-footer">
              <button type="button" onClick={onClose} className="button">
                Close
              </button>
            </div>}
          </div>
        </div>
      </div>
    </CSSTransition>,
    document?.getElementById("root") as any
  );
};

export default Modal;
