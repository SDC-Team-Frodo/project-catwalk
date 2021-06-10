import React, { useState, useEffect, useContext } from 'react';
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
    <div>
      {display ? (
        <section>
          <h2>
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
              }}
            >
              Report
            </button>
          </div>
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
        </section>
      ) : <h3>Reported</h3>}
    </div>
  );
};

export default Answer;
