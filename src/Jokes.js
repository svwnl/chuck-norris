import React from 'react';
import Joke from './Joke'
import BadJoke from "./BadJoke";

export default class Jokes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      counting: false
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
    }
  }

  removeJoke = (jokeId) => {
    this.props.setBadJoke(jokeId)
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
          <div className={"flex-1 column"}>
            <div className={"btn margin-right sandybrown text-center flex-1 stretch"}
                 onClick={() => (this.props.getData(10, false))}>Get 10 random
              jokes<br/><small>Love them or hate them</small></div>
          </div>
          <div className={"flex-1 column"}>
            <div
              className={"btn margin-left salmon text-center flex-1 stretch" + (this.props.favoritesMaxed ? " disabled" : "")}
              onClick={this.toggleCounting}>{this.props.favoritesMaxed ? "Maximum favorites reached" : (this.state.counting ? 'Stop' : 'Start') + " adding random favorites"}<br/><small>1
              joke every 5 sec.</small></div>
          </div>
        </div>
        <br/>
        {Array.isArray(this.props.jokes) &&
        <Joke jokes={this.props.jokes}
              toggleFavorite={this.toggleFavorite}
              removeJoke={this.removeJoke}
              reachedFavoritesMax={this.props.favoritesMaxed}/>}
        <BadJoke badJokes={[...this.props.badJokes]}/>
      </>
    );
  }
}
