import React from 'react';

const QuestionForm = (props) => {

  return (
    <div id="questionForm">
      <div>
        <label className="formInput" htmlFor="Question">
          Your Question----------------
        </label>
        <input
          type="text"
          id="Question"
          placeholder="Write your question here"
        />
      </div>
      <div>
        <label className="formInput" htmlFor="nickName">
          What Is Your Nickname-----
        </label>
        <input
          type="text"
          id="nickName"
          placeholder="Example: jackson11!"
        />
        <h4>For privacy reasons, do not use your full name or email address</h4>
      </div>
      <div>
        <label className="formInput" htmlFor="email">
          Your Email--------------------
        </label>
        <input
          type="text"
          id="email"
          placeholder="Example: billbillbill@email.com"
        />
        <h4>For authentication reasons, you will not be emailed</h4>
      </div>
      <button
        type="button"
        id="submitQBtn"
      >
        Submit!
      </button>
    </div>
  );
};

export default QuestionForm;
