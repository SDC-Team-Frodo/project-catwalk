/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import isEmail from './isEmail';
import request from '../../requests';
// import ProductContext from '../../ProductContext';

const AnswerForm = (props) => {
  const { question_id } = props;
  // const product = useContext(ProductContext);
  const [answer, setAnswer] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [subClicked, setSubClicked] = useState(false);
  const [validA, setValidA] = useState(false);
  const [validN, setValidN] = useState(false);
  const [validE, setValidE] = useState(false);

  useEffect(() => {
    if (subClicked) {
      if (
        validA
        && validN
        && validE
      ) {
        // Need to make the api request
        request.post(`qa/questions/${question_id}/answers`, {
          body: answer,
          name: nickName,
          email,
          photos: [],
        }).then((res) => {
          setAnswer('');
          setNickName('');
          setEmail('');
          setSubClicked(false);
          console.log(res);
        }).catch(() => alert('couldn\'t send answer'));
      }
    }
  }, [subClicked]);

  useEffect(() => {
    answer.length > 2 ? setValidA(true) : setValidA(false);
    nickName.length > 2 ? setValidN(true) : setValidN(false);
    isEmail(email) ? setValidE(true) : setValidE(false);
  }, [answer, nickName, email]);

  return (
    <div id="answerForm">
      <div>
        <label className="formInput" htmlFor="Answer">
          Your Answer
          <span className={validA ? 'valid' : 'inValid'}>{' * Mandatory'}</span>
        </label>
        <textarea
          rows="3"
          cols="100"
          wrap="hard"
          id="Question"
          placeholder="Write your question here"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
      </div>
      <div>
        <label className="formInput" htmlFor="nickName">
          What Is Your Nickname
          <span className={validN ? 'valid' : 'inValid'}>{' * Mandatory'}</span>
        </label>
        <input
          type="text"
          id="nickName"
          placeholder="Example: jack543!!"
          value={nickName}
          onChange={(e) => {
            setNickName(e.target.value);
          }}
        />
        <h4 className="disclaimer">*For privacy reasons, do not use your full name or email address*</h4>
      </div>
      <div>
        <label className="formInput" htmlFor="email">
          Your Email
          <span className={validE ? 'valid' : 'inValid'}>{' * Mandatory'}</span>
        </label>
        <input
          type="text"
          id="email"
          placeholder="Example: billbillbill@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <h4 className="disclaimer">*For authentication reasons, you will not be emailed*</h4>
      </div>
      <button
        className="hoverGrey"
        type="button"
        id="submitABtn"
        onClick={() => {
          setSubClicked(true);
        }}
      >
        Submit!
      </button>
    </div>
  );
};

export default AnswerForm;