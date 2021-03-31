import React, {useState, useEffect} from 'react';
import Jokes from './Jokes';

const App = () => {

  const [jokes, setJokes] = useState(
    JSON.parse(localStorage.getItem('jokesInLocalStorage')) || []
  );

  useEffect(() => {
    localStorage.setItem('jokesInLocalStorage', JSON.stringify(jokes));
  }, [jokes]);

  return (
    <div>
      <Jokes jokes={jokes} setJokes={setJokes} />
    </div>
  );
};

export default App;
