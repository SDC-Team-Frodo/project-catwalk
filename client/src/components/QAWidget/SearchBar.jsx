import React, { useState, useEffect, useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import QuestionList from './QuestionList';
import searchFunc from './search';

const SearchBar = (props) => {
  const data = useContext(QuestionsContext);
  const [allQuestions, setAllQuestions] = useState(JSON.stringify(data));
  const [searchClicked, setSearchClicked] = useState(false);
  const [relevantQuestions, setRelevantQuestions] = useState(allQuestions);
  const [testQuestions, setTestQuestions] = useState([1, 2, 3, 4, 5]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (searchClicked === true) {
      setRelevantQuestions(JSON.stringify(searchFunc(search, JSON.parse(allQuestions), 3)));
      console.log(JSON.stringify(searchFunc(search, JSON.parse(allQuestions), 3)));
      setSearchClicked(false);
    }
  }, [search, searchClicked]);
  return (
    <div>
      <div id="searchDiv">
        <input
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
