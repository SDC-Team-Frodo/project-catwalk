import React, { useState, useEffect } from 'react';
import formatDate from '../../helpers/formatDate';
import Modal from '../Modal';

const Answer = (props) => {
  const { answer, index } = props;
  const [answerState, setAnswerState] = useState(answer);
  const [helpfulCount, setHelpfulcount] = useState(answerState.helpfulness);
  const [yesClicked, setYesClicked] = useState(false);

  useEffect(() => {
    console.log(answer);
    setAnswerState(answer);
  }, [answer]);

  useEffect(() => {
    setHelpfulcount(answerState.helpfulness);
    setYesClicked(false);
  }, [answerState]);

  useEffect(() => {
    if (yesClicked) {
      setHelpfulcount(helpfulCount + 1);
    }
  }, [yesClicked]);

  return (
    <div>
      <h2>
        {index === 0 && (
          'A: '
        )}
        {answerState.body}
      </h2>
      <h5>
        by:
        {answerState.answerer_name}
        ,
        {formatDate(answerState.date)}
        Helpful?
        <span
          onClick={() => {
            setYesClicked(true);
          }}
        >
          Yes(
          {helpfulCount}
          )
        </span>
        Report
      </h5>
      <div id="answerImageDiv">
        {answerState.photos.length > 0 && (
          answerState.photos.map((photo, i) => {
            return (
              <Modal
                key={i}
                modalId={`answerPhoto${i}`}
                body={(
                  <img src={photo} />
                )}
                isImage="true"
                image={<img className="answerImage" src={photo} />}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Answer;
