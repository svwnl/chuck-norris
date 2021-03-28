import React from 'react';
import Joke from './Joke'

export default class Jokes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      counting: false,
      jokes: [],
      loading: false,
      error: '',
      reachedFavoritesMax: false
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  counter = () => {
    if (this.countFavorites() < 10) {
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
    this.setState({loading:true})
    console.log('get ' + number + 'jokes(s) ' + (setFavorite ? " and set favorite" : "" ));
    fetch(`http://api.icndb.com/jokes/random/${number}`)
      .then(response => response.json())
      .then((data) => this.setJokes(data, setFavorite))
      .then(() => this.setState({loading:false}))
      .catch((err) => this.setState({ error:err, loading: false}))
  }

  setJokes = (data, setFavorite) => {
    data.value.map((joke) => { joke.favorite = setFavorite } );

    // Array should only contain unique jokes
    let jokes = this.state.jokes;
    let dataLength = data.value.length;
    for (let i = 0; i < dataLength; i++) {
      if (!(data.value[i].id in jokes)) {
          jokes.push(data.value[i]);
      }
    }
    // let jokes = [...this.state.jokes, ...data.value]
    this.setState({jokes:jokes});
    this.props.setValueInLocalStorage(jokes);
  }

  countFavorites = () => {
    return this.state.jokes.filter((obj) => obj.favorite === true).length
  }

  toggleFavorite = (jokeId) => {
    let jokes = this.state.jokes;
    let jokeIndex = jokes.findIndex((joke => joke.id == jokeId));
    jokes[jokeIndex].favorite = !jokes[jokeIndex].favorite;
    this.setState({jokes: jokes})
  }

  removeJoke = (jokeId) => {
    let filtered = this.state.jokes.filter((obj) => obj.id !== jokeId);
    this.setState({jokes: filtered})
  }

  render() {
    return (
      <div className={"container"}>
        <h3>Chuck Norris</h3>
        <p>Get 10 random jokes</p>
        <button onClick={() => (this.getData(10, false))}>Get 10 jokes</button>
        <p>Add one random joke to the favourites list every 5 seconds</p>
        <button onClick={this.toggleCounting}>{this.state.counting ? 'Pause' : 'Start'}</button>
        {this.state.error && <pre>{JSON.stringify(this.state.error, null, 2)}</pre>}
        <h2>Jokes {this.state.loading && "Loading" }</h2>
        <Joke jokes={this.state.jokes} toggleFavorite={this.toggleFavorite} removeJoke={this.removeJoke} count={this.state.count} />
      </div>
    );
  }
}
