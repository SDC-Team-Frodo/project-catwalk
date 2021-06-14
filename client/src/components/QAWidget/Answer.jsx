/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react';
import request from '../../requests';
import formatDate from '../../helpers/formatDate';
import Modal from '../Modal';

const Answer = (props) => {
  const { answer, index } = props;
  const [display, setDisplay] = useState(true);
  const [yesClicked, setYesClicked] = useState(false);

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
            <span className={answer.answerer_name !== 'Seller' ? 'answerName' : 'answerNameBold'}>
              {answer.answerer_name}
            </span>
            {',  '}
            {formatDate(answer.date)}
            Helpful?
            <button
              type="button"
              onClick={() => {
                if (!yesClicked) {
                  request.put(`qa/answers/${answer.id}/helpful`, {
                    answer_id: answer.id,
                    count: 100,
                  }).then((res) => {
                    setYesClicked(true);
                  }).catch((err) => {
                    console.error(err);
                    alert('Couldn\'t Complete Request');
                  });
                }
              }}
            >
              {`Yes(${!yesClicked ? answer.helpfulness : answer.helpfulness + 1})`}
            </button>
            |
            <button
              type="button"
              onClick={() => {
                request.put(`qa/answers/${answer.id}/report`, {
                  answer_id: answer.id,
                }).then((res) => {
                  setDisplay(false);
                }).catch((err) => {
                  console.error(err);
                  alert('Couldn\'t Complete Request');
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
