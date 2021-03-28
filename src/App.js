import React, {useState, useEffect}  from 'react';
import Jokes from './Jokes';

const App = () => {
  const [value, setValue] = useState(
    localStorage.getItem('jokesInLocalStorage') || []
  );

  useEffect(() => {
    localStorage.setItem('jokesInLocalStorage', value);
  }, [value]);

  const setValueInLocalStorage = (value) => {
    setValue(JSON.stringify(value));
  }

  return (
    <div>
      <Jokes value={value} setValueInLocalStorage={setValueInLocalStorage}/>
    </div>
  );
};

export default App;
