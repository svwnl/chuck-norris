import React from 'react';


const Joke = ({jokes, toggleFavorite, removeJoke}) => {

  return (
    jokes.map((joke, index) => <div className={"card"} key={index}><p>
        <small className={"text-green"}>[{joke.id}]</small><br/>{joke.joke}</p>
        <br/>
        <button className={joke.favorite ? "favorite" : ""} onClick={() => toggleFavorite(joke.id)}><i
          className={"fa fa-3x fa-heart"}></i>
        </button>
        &nbsp;
        <button onClick={() => removeJoke(joke.id)}><i className={"fa fa-3x fa-skull"}></i></button>
      </div>
    ));
}

export default Joke;
