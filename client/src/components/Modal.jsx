import React, { useState, useEffect } from 'react';

const Modal = (props) => {
  const { header, body, footer, btnName, btnId } = props;
  const [display, setDisplay] = useState(false);

  // useEffect(() => {
  //   if (display === true) {

  //   }
  // }, [display]);
  if (display) {
    return (
      <div id="modal">
        <div id="header">
          <button
            id="closeButton"
            type="button"
            onClick={() => {
              setDisplay(false);
            }}
          >
            Close
          </button>
          {header}
        </div>
        <div id="body">
          {body}
        </div>
        <div id="footer">
          {footer}
        </div>
      </div>
    );
  }
  return (
    <button
      id={btnId}
      type="button"
      onClick={() => {
        setDisplay(true);
      }}
    >
      {btnName}
    </button>
  );
};

export default Modal;
