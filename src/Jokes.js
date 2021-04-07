import React from 'react';
import Joke from './Joke'
import BadJoke from "./BadJoke";

export default class Jokes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      counting: false,
      badJokes: []
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  counter = () => {
    this.props.favoritesMaxed ? this.stopCounter() : this.props.getData(1, true);
  };

  startCounter = () => {
    this.counter();
    this.interval = setInterval(this.counter, 5000);
    this.setState({counting: true})
  };

  stopCounter = () => {
    clearInterval(this.interval);
    this.setState({counting: false})
  };

  toggleCounting = () => {
    if (this.state.counting) {
      this.stopCounter()
    } else {
      this.startCounter()
    }
  };

  toggleFavorite = (jokeId) => {
    let jokes = this.props.jokes;
    let jokeIndex = jokes.findIndex((joke => joke.id === jokeId));
    if (!this.props.favoritesMaxed || jokes[jokeIndex].favorite === true) {
      jokes[jokeIndex].favorite = !jokes[jokeIndex].favorite;
      this.props.setJokes([...jokes])
    } else {
      console.log('maximum allowed favorites reached');
    }
  }

  setBadJoke = (jokeId) => {
    console.log(this.state.badJokes);
    let badJokesSet = new Set(this.state.badJokes);
    badJokesSet.add(jokeId);
    this.setState({badJokes: badJokesSet});
  }

  removeJoke = (jokeId) => {
    this.setBadJoke(jokeId)
    let filtered = this.props.jokes.filter((jokes) => jokes.id !== jokeId);
    this.props.setJokes([...filtered])
  }

  render() {
    return (
      <>
        <div className={"row flex-space-around"}>
          <h2>Jokes</h2>
        </div>
        <div className={"row flex-space-around"}>
          <div>
            <button className={"btn sandybrown"}
                    onClick={() => (this.props.getData(10, false))}>Get 10 random
              jokes<br/><small>Could be your new favorites</small></button>
          </div>
          <div className={"col flex-end"}>
            <button className={this.props.favoritesMaxed ? "btn salmon disabled" : "btn salmon"}
                    onClick={this.toggleCounting}>{this.state.counting ? 'Stop' : 'Start'} adding favorites<br/><small>1
              random joke every 5 sec.</small></button>
          </div>
        </div>
        <br/>
        {Array.isArray(this.props.jokes) &&
        <Joke jokes={this.props.jokes}
              toggleFavorite={this.toggleFavorite}
              removeJoke={this.removeJoke}
              reachedFavoritesMax={this.props.favoritesMaxed}/>}

        <div className={"row flex-center text-gray"}><p>Joke graveyard</p></div>
        <div className={"row flex-center flex-wrap"}>
          <BadJoke badJokes={[...this.state.badJokes]}/>
        </div>
      </>
    );
  }
}
