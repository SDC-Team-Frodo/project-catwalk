import React, { useState, useEffect, useContext } from 'react';
import formatDate from '../../helpers/formatDate';
import QuestionsContext from '../../contexts/QuestionsContext';
import Modal from '../Modal';

const Answer = (props) => {
  const { answer, index } = props;
  const [helpfulCount, setHelpfulcount] = useState(answer.helpfulness);
  const [yesClicked, setYesClicked] = useState(false);

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
        {answer.body}
      </h2>
      <h5>
        by:
        {answer.answerer_name}
        ,
        {formatDate(answer.date)}
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
        {answer.photos.length > 0 && (
          answer.photos.map((photo, i) => {
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
