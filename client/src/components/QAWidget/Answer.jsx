/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react';
import request from '../../requests';
import formatDate from '../../helpers/formatDate';
import Modal from '../Modal';

const Answer = (props) => {
  const { answer, index } = props;
  const [display, setDisplay] = useState(true);
  const [helpfulCount, setHelpfulcount] = useState(answer.helpfulness);
  const [yesClicked, setYesClicked] = useState(false);

  useEffect(() => {
    if (yesClicked) {
      setHelpfulcount(helpfulCount + 1);
    }
  }, [yesClicked]);

  return (
    <div className="answer">
      {display ? (
        <section>
          <h2 className="AnswerText">
            {index === 0 && (
              'A: '
            )}
            {answer.body}
          </h2>
          <div id="userInfoAndHelpful">
            {'by:  '}
            {answer.answerer_name}
            {',  '}
            {formatDate(answer.date)}
            Helpful?
            <button
              type="button"
              onClick={() => {
                setYesClicked(true);
              }}
            >
              {`Yes(${helpfulCount})`}
            </button>
            |
            <button
              type="button"
              onClick={() => {
                setDisplay(false);
                request.put(`qa/answers/${answer.id}/helpful`, {
                });
              }}
            >
              Report
            </button>
          </div>
          <div id="answerImageDiv">
            {answer.photos.length > 0 && (
              answer.photos.map((photo, i) => (
                <Modal
                  key={i}
                  modalId={`answerPhoto${i}`}
                  body={(
                    <img className="Image" src={photo} />
                  )}
                  isImage="true"
                  image={<img className="answerImage" src={photo} />}
                />
              ))
            )}
          </div>
        </section>
      ) : <h3>Reported</h3>}
    </div>
  );
};

export default Answer;
