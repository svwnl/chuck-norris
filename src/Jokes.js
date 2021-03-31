import React from 'react';
import Joke from './Joke'

export default class Jokes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favoriteMaximum: 10,
      count: 0,
      counting: false,
      loading: false,
      error: '',
      reachedFavoritesMax: false
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  counter = () => {
    if (this.countFavorites() < this.state.favoriteMaximum) {
      this.setState({reachedFavoritesMax: false})
      this.setState(prevState => (
        {count: prevState.count + 1}
      ));
      this.getData(1, true);
    } else {
      this.stopCounter();
      this.setState({reachedFavoritesMax: true})
    }
  };

  startCounter = () => {
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

  getData = (number, setFavorite) => {
    this.setState({loading: true})
    console.log('get ' + number + 'jokes(s) ' + (setFavorite ? " and set favorite" : ""));
    fetch(`http://api.icndb.com/jokes/random/${number}`)
      .then(response => response.json())
      .then((data) => this.setJokes(data, setFavorite))
      .then(() => this.setState({loading: false}))
      .catch((err) => this.setState({error: err, loading: false}))
  }

  setJokes = (data, favorite) => {
    data.value.map((joke) => {
      return joke.favorite = favorite
    });

    // Array should only contain unique jokes
    let jokes = this.props.jokes;
    let dataLength = data.value.length;
    for (let i = 0; i < dataLength; i++) {
      if (!(data.value[i].id in jokes)) {
        jokes.push(data.value[i]);
      }
    }
    this.props.setJokes([...jokes]);
  }

  countFavorites = () => {
    return this.props.jokes.filter((jokes) => jokes.favorite === true).length
  }

  toggleFavorite = (jokeId) => {
    let jokes = this.props.jokes;
    let jokeIndex = jokes.findIndex((joke => joke.id === jokeId));
    jokes[jokeIndex].favorite = !jokes[jokeIndex].favorite;
    this.props.setJokes([...jokes])
  }

  removeJoke = (jokeId) => {
    let filtered = this.props.jokes.filter((jokes) => jokes.id !== jokeId);
    this.props.setJokes([...filtered])
  }

  render() {
    return (
      <>
        <div className={"row"}>
          <h2>Jokes {this.state.loading && "Loading"}</h2>
        </div>
        <div className={"row"}>
          <div>
            <button className={"btn sandybrown"} onClick={() => (this.getData(this.state.favoriteMaximum, false))}>Get {this.state.favoriteMaximum} random jokes<br/><small>Could be your new favorites</small></button>
          </div>
          <div className={"col flex-end"}>
            <button className={"btn salmon"} onClick={this.toggleCounting}>{this.state.counting ? 'Stop' : 'Start'} adding favorites<br/><small>1 random joke every 5 sec.</small></button>
          </div>
        </div>
<br/>
        {this.state.error && <pre>{JSON.stringify(this.state.error, null, 2)}</pre>}
        {Array.isArray(this.props.jokes) &&
        <Joke jokes={this.props.jokes} toggleFavorite={this.toggleFavorite} removeJoke={this.removeJoke}
              count={this.state.count} />}
      </>
    );
  }
}
