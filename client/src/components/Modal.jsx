/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useContext } from 'react';
import ModalOff from '../contexts/ModalOffContext';

const Modal = (props) => {
  const {
    modalId, header, body, footer, btnName, btnId, btnPlus, isImage, image,
  } = props;
  const [display, setDisplay] = useState(false);
  const { modalOff, setModalOff } = useContext(ModalOff);
  useEffect(() => {
    if (modalOff) {
      console.log('this worked');
      setDisplay(false);
      setModalOff(false);
    }
  }, [modalOff]);

  if (display) {
    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <h1
          id="CloseBtn"
          type="button"
          onClick={() => {
            setDisplay(false);
          }}
        >
          X
        </h1>
        <div
          id="backDrop"
          type="button"
          onClick={() => {
            setDisplay(false);
          }}
        />
        <div className="modal" id={modalId}>
          <div id="header">
            {header}
          </div>
          <div className="modalBody">
            {body}
          </div>
          <div id="footer">
            {footer}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="modal-container">
      { !isImage && (
      <button
        id={btnId}
        type="button"
        className="hoverGrey"
        onClick={() => {
          setDisplay(true);
        }}
      >
        {btnName}
        {btnPlus}
      </button>
      )}
      { isImage && (
        // eslint-disable-next-line object-curly-spacing
        <div
          id="modalImgDiv"
          type="button"
          onClick={() => {
            setDisplay(true);
          }}
        >
          {image}
        </div>
      )}
    </div>
  );
};

export default Modal;
