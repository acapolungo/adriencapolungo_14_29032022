import React, { useEffect, useRef } from 'react';
import styles from '../Modal/modal.module.css';

// modalStyle - With which one can customize the styling of visible modal window.
// backdropStyle - With which one can customize the styling of the backdrop of modal window.
// onClose - Event handler with which one can write logic to close the modal.
// show - Boolean property which will decide wheather the modal is open or not.

const Modal = ({ title, content, modal, onClose, modalStyle, backdropStyle }) => {
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
                    style={{ borderRadius: '50%', border: 'none', width: 40, height: 40, position: 'absolute', top: 0, right: 0, margin: '1rem', fontSize: '20px' }}
                    className={styles.close__btn}
                >x</button>
                <div style={modalStyle} className={styles.modal}>
                    {/* {children} */}
                    <div style={{ color: 'white', backgroundColor: '#15172b', height: '10%', padding: 15 }}>
                        <h2>{title}</h2>
                    </div>
                    <div style={{ color: 'white', height: '10%', padding: 15, fontSize: '20px' }}>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Modal;