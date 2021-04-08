import React, {useState, useEffect} from 'react';
import Jokes from './Jokes';
import logo from './chuck-norris.png';

const App = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favoritesMaxed, setFavoritesMaxed] = useState(false);
  const [badJokes, setBadJokes] = useState([]);
  const [jokes, setJokes] = useState(
    JSON.parse(localStorage.getItem('jokesInLocalStorage')) || []
  );

  useEffect(() => {
    countFavorites(jokes) >= 10 ? setFavoritesMaxed(true) : setFavoritesMaxed(false);
    localStorage.setItem('jokesInLocalStorage', JSON.stringify(jokes));
  }, [jokes]);

  const getData = (number, setFavorite) => {
    setLoading(true);
    fetch(`http://api.icndb.com/jokes/random/${number}`)
      .then(response => response.json())
      .then((data) => parseJokes(data, setFavorite))
      .then(() => setLoading(false))
      .catch(setError)
  }

  const parseJokes = (data, favorite) => {
    data.value.map((joke) => {
      return joke.favorite = favorite
    });

    // Array should only contain unique jokes
    let j = jokes;
    let dataLength = data.value.length;
    for (let i = 0; i < dataLength; i++) {
      if (!(data.value[i].id in j)) {
        if (!badJokes.has(data.value[i].id)) {
          j.unshift(data.value[i]);
        } else {
          console.log("bad joke: " + data.value[i].id)
        }
      }
    }
    setJokes([...j]);
  }

  const countFavorites = (jokes) => {
    return jokes.filter((jokes) => jokes.favorite === true).length
  }

  const setBadJoke = (jokeId) => {
    let badJokesSet = new Set(badJokes);
    badJokesSet.add(jokeId);
    setBadJokes(badJokesSet);
  }

  return (
    <div className={"container"}>
      <div className={"row flex-space-around"}>
        <div className={"col flex-end"}><h3>Chuck</h3></div>
        <div><img src={logo} className={"logo"} alt="Chuck Norris"/></div>
        <div className={"col"}><h3>Norris</h3></div>
      </div>
      <div>{loading && "Loading"}</div>
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      <Jokes jokes={jokes} setJokes={setJokes} getData={getData} favoritesMaxed={favoritesMaxed}
             badJokes={badJokes} setBadJoke={setBadJoke}/>
    </div>
  );
};

export default App;
