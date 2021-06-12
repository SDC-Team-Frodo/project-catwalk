import { createContext } from 'react';
import mockData from '../components/QAWidget/mockData';

const QuestionsContext = createContext(mockData.results);

export default QuestionsContext;
