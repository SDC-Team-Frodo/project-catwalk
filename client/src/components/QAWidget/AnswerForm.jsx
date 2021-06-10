import React, { useState, useEffect } from 'react';

const AnswerForm = () => {
  const [answer, setAnswer] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [subClicked, setSubClicked] = useState(false);

  useEffect(() => {
    if (subClicked) {
      console.log(answer);
      console.log(nickName);
      console.log(email);
      setAnswer('');
      setNickName('');
      setEmail('');
      setSubClicked(false);
    }
  }, [subClicked]);

  return (
    <div id="answerForm">
      <div>
        <label className="formInput" htmlFor="Answer">
          Your Answer *Mandatory
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
          What Is Your Nickname *Mandatory
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
        <h4>For privacy reasons, do not use your full name or email address</h4>
      </div>
      <div>
        <label className="formInput" htmlFor="email">
          Your Email *Mandatory
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
        <h4>For authentication reasons, you will not be emailed</h4>
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
