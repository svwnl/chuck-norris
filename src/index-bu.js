import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';



//const favorites = [];


function Counter({count}){
  return <div>{count}</div>
}


function GitHubUser({login}){

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [counting, setCounting] = useState(false);
  const [count, setCount] = useState(0);


  function countDown() {
    // add a joke

    console.log('Interval triggered ' + count);
    setCount(count + 7);
    //
    // // favorites >= 10
    // if(count >= 10) {
    //   console.log("stop counting" + count);
    //   stopCounter();
    // }

    // stopCounter()

  }

  const startCounter = () => {
    //interval = setInterval(countDown, 1000);
    console.log("start");
    setCounting(true);
    const interval = setInterval(updateCounter, 1000);
  };

  const stopCounter = () => {
    console.log("stop");
    clearInterval(interval);
    setCounting(false);
  };

  const toggleCounting = () => {
    //if (counting) {
     // stopCounter()
    //} else {
      startCounter()
    //}
  };

  const updateCounter = () => {
    console.log('updateCounter')
    setCount(count + 1);
  }

  useEffect(() => {
      fetch(`https://api.github.com/users/${login}`)
        .then(response => response.json())
        .then(setData)
        .then(() => setLoading(false))
        .catch(setError)
    }, [login]
  );

  if(data){
    return (
      <div>
        <h1>{data.login}</h1>
        <img src={data.avatar_url} width={100} alt={"img"} />
        {JSON.stringify(data)}


        <button onClick={toggleCounting}>Haal 1 random joke op {count}</button>
        <Counter count={count} />
      </div>);
  }
  return null;

}



// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

function App() {
  return <GitHubUser login={"svwnl"}/>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
