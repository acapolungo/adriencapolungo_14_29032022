import React, { useEffect, useRef } from 'react';
import styles from '../Modal/modal.module.css';

// modalStyle - With which one can customize the styling of visible modal window.
// backdropStyle - With which one can customize the styling of the backdrop of modal window.
// onClose - Event handler with which one can write logic to close the modal.
// show - Boolean property which will decide wheather the modal is open or not.

const Modal = ({ header, text, modal, onClose, modalStyle, backdropStyle }) => {
    const modalRef = useRef(null);
    useEffect(
        () => {
            if (modal) {
                modalRef.current.classList.add(styles.visible);
            }
            else {
                modalRef.current.classList.remove(styles.visible);
            }
        },
        [
            modal
        ]
    );
    return (
        <React.Fragment>
            <div ref={modalRef} style={backdropStyle} className={`${styles.modal__wrap}`}>
                <button
                    onClick={onClose}
                    style={{ borderRadius: '50%', border: 'none', width: 40, height: 40, position: 'absolute', top: 20, right: 30, margin: '1rem', fontSize: '20px' }}
                    className={styles.close__btn}
                >x</button>
                <div style={modalStyle} className={styles.modal}>
                    <div className="content__header">
                        <h2>{header}</h2>
                    </div>
                    <div className="content__text">
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Modal;
