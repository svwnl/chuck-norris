import React from 'react';
import ReactHtmlParser from 'react-html-parser';


const Joke = ({jokes, toggleFavorite, removeJoke, reachedFavoritesMax}) => {

  return (
    jokes.map((joke, index) => <div className={"card"} key={index}><p>{ReactHtmlParser(joke.joke)} <small
        className={"text-green float-right"}>[{joke.id}]</small></p>
        <button className={joke.favorite ? "icon favorite" : (reachedFavoritesMax ? "icon disabled" : "icon")}
                onClick={() => toggleFavorite(joke.id)}><i
          className={"fa fa-3x fa-heart"}></i>
        </button>
        &nbsp;
        <button className={"icon"} onClick={() => removeJoke(joke.id)}><i className={"fa fa-3x fa-skull"}></i></button>
      </div>
    ));
}

export default Joke;
