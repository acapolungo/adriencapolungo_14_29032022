import React from 'react';
import styles from '../Modal/modal.module.css';

// header - which one can customize the header
// text - which one can customize the text
// modal - Boolean property which will decide wheather the modal is open or not.
// modalStyle - With which one can customize the styling of visible modal window.
// backdropStyle - With which one can customize the styling of the backdrop of modal window.
// onClose - Event handler with which one can write logic to close the modal.

const Modal = ({header, text, closeModal, headerStyle, modalStyle, backdropStyle }) => {

    return (
        <>
            <div style={backdropStyle} className={`${styles.modal__wrap}`}>
                <div style={modalStyle} className={styles.modal}>
                <button
                    onClick={closeModal}
                    style={{ borderRadius: '50%', border: 'none', width: 25, height: 25, position: 'absolute', top: 0, right: 10, margin: '0.8rem', fontSize: '20px', color:'#08d', cursor:'pointer' }}
                    className={styles.close__btn}
                >x</button>
                    <div style={headerStyle}>
                        <h2>{header}</h2>
                    </div>
                    <div className="content__text">
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;