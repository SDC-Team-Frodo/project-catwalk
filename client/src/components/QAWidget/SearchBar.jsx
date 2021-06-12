/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import QuestionList from './QuestionList';
import searchFunc from './search';

const SearchBar = () => {
  const data = useContext(QuestionsContext);
  const [allQuestions, setAllQuestions] = useState(JSON.stringify(data));
  const [searchClicked, setSearchClicked] = useState(false);
  const [relevantQuestions, setRelevantQuestions] = useState(allQuestions);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setAllQuestions(JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    setRelevantQuestions(allQuestions);
  }, [allQuestions]);

  useEffect(() => {
    if (searchClicked === true) {
      setRelevantQuestions(JSON.stringify(searchFunc(search, JSON.parse(allQuestions),
        search.split(' ').length === 1 ? 1 : search.split(' ').length - 1)));
      setSearchClicked(false);
    }
  }, [search, searchClicked]);

  return (
    <div>
      <div id="searchDiv">
        <input
          id="Qinput"
          type="text"
          value={search}
          placeholder="Search For a Question"
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
        />
        <img
          id="search"
          src="https://img.icons8.com/android/24/000000/search.png"
          alt="search"
          type="button"
          onClick={() => {
            setSearchClicked(true);
          }}
        />
      </div>
      <div id="QAListDiv">
        <QuestionsContext.Provider value={relevantQuestions}>
          <QuestionList />
        </QuestionsContext.Provider>
      </div>
    </div>
  );
};

export default SearchBar;
