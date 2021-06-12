/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../../contexts/ProductContext';
import QALoadContext from '../../contexts/QALoadContext';
import request from '../../requests';
import isEmail from './isEmail';

const QuestionForm = () => {
  const product = useContext(ProductContext);
  const load = useContext(QALoadContext);
  const [question, setQuestion] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [subClicked, setSubClicked] = useState(false);
  const [validQ, setValidQ] = useState(false);
  const [validN, setValidN] = useState(false);
  const [validE, setValidE] = useState(false);
  const [displaySent, setDisplaySent] = useState(false);

  useEffect(() => {
    if (subClicked) {
      if (
        validQ
        && validN
        && validE
      ) {
        // Need to make the api request
        request.post('qa/questions', {
          body: question,
          name: nickName,
          email,
          product_id: product.id,
        }).then((res) => {
          // then do this stuff
          setQuestion('');
          setNickName('');
          setEmail('');
          setSubClicked(false);
          console.log(res);
          load();
        }).catch((err) => {
          console.error(err);
          alert('couldn\'t send');
        });
      }
    }
  }, [subClicked]);

  useEffect(() => {
    question.length > 2 ? setValidQ(true) : setValidQ(false);
    nickName.length > 2 ? setValidN(true) : setValidN(false);
    isEmail(email) ? setValidE(true) : setValidE(false);
  }, [question, nickName, email]);

  // if (!displaySent) {
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
          value={question}
          placeholder="Write your question here"
          maxLength="1000"
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
          type="email"
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
        id="submitQBtn"
        onClick={() => {
          setSubClicked(true);
          setDisplaySent(true);
        }}
      >
        {displaySent ? 'Sent!' : 'Submit!'}
      </button>
    </div>
  );
  // }
  // return <h1 className="sent">Sent</h1>;
};

export default QuestionForm;
