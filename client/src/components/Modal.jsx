/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';

const Modal = (props) => {
  const { modalId, header, body, footer, btnName, btnId, isImage, image } = props;
  const [display, setDisplay] = useState(false);

  if (display) {
    return (
      <div>
        <div
          id="backDrop"
          type="button"
          onClick={() => {
            setDisplay(false);
          }}
        />
        <div className="modal" id={modalId}>
          <div id="header">
            {/* <button
              id="closeButton"
              type="button"
              onClick={() => {
                setDisplay(false);
              }}
            >
              Close
            </button> */}
            {header}
          </div>
          <div id="body">
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
    <div>
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
