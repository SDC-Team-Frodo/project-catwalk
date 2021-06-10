import React, { useState, useEffect } from 'react';
import isEmail from './isEmail';

const QuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [subClicked, setSubClicked] = useState(false);
  const [validQ, setValidQ] = useState(false);
  const [validN, setValidN] = useState(false);
  const [validE, setValidE] = useState(false);

  useEffect(() => {
    if (subClicked) {
      if (
        validQ
        && validN
        && validE
      ) {
        // Need to make the api request
        console.log('Question:', question);
        console.log('NickName:', nickName);
        console.log('Email:', email);
        // then do this stuff
        setQuestion('');
        setNickName('');
        setEmail('');
        setSubClicked(false);
      }
    }
  }, [subClicked]);

  useEffect(() => {
    question.length > 2 ? setValidQ(true) : setValidQ(false)
    nickName.length > 2 ? setValidN(true) : setValidN(false)
    isEmail(email) ? setValidE(true) : setValidE(false)
  }, [question, nickName, email]);

  return (
    <div id="questionForm">
      <div>
        <label className="formInput" htmlFor="Question">
          Your Question
          <span className={validQ ? 'valid' : 'inValid'}>{' * Mandatory'}</span>
        </label>
        <textarea
          rows="3"
          cols="100"
          wrap="hard"
          id="Question"
          placeholder="Write your question here"
          onChange={(e) => {
            setQuestion(e.target.value);
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
          placeholder="Example: jackson11!"
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
          type="email"
          id="email"
          placeholder="Example: billbillbill@email.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <h4 className="disclaimer">*For authentication reasons, you will not be emailed*</h4>
      </div>
      <button
        className="hoverGrey"
        type="button"
        id="submitQBtn"
        onClick={() => {
          setSubClicked(true);
        }}
      >
        Submit!
      </button>
    </div>
  );
};

export default QuestionForm;
