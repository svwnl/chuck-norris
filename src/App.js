import React, {useState, useEffect} from 'react';
import Jokes from './Jokes';
import logo from './chuck-norris.png';


const App = () => {

  const [jokes, setJokes] = useState(
    JSON.parse(localStorage.getItem('jokesInLocalStorage')) || []
  );

  useEffect(() => {
    localStorage.setItem('jokesInLocalStorage', JSON.stringify(jokes));
  }, [jokes]);

  return (
    <div className={"container"}>
      <div className={"row"}>
        <div className={"col flex-end"}><h3>Chuck</h3></div>
        <div><img src={logo} className={"logo"} alt="Chuck Norris"/></div>
        <div className={"col"}><h3>Norris</h3></div>
      </div>
      <Jokes jokes={jokes} setJokes={setJokes}/>
    </div>
  );
};

export default App;
