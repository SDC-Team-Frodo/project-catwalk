import React, { useState, useEffect, useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import QuestionList from './QuestionList';
import searchFunc from './search';

const SearchBar = () => {
  const data = useContext(QuestionsContext);
  const [allQuestions] = useState(JSON.stringify(data));
  const [searchClicked, setSearchClicked] = useState(false);
  const [relevantQuestions, setRelevantQuestions] = useState(allQuestions);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (searchClicked === true) {
      setRelevantQuestions(JSON.stringify(searchFunc(search, JSON.parse(allQuestions), 3)));
      setSearchClicked(false);
    }
  }, [search, searchClicked]);

  useEffect(() => {
  }, [relevantQuestions]);
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
        <button
          id="search"
          type="button"
          className="hoverGrey"
          onClick={() => {
            setSearchClicked(true);
          }}
        >
          Search!
        </button>
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
