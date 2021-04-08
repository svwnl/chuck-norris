import React from 'react';

const BadJoke = ({badJokes}) => {

  if (badJokes.length < 1) {
    return <>
      <div className={"row flex-center text-green"}><i className={"fa fa-2x fa-leaf"}> </i></div>
    </>
  } else {
    return (
      <>
        <div className={"row flex-center text-gray"}><p>Joke graveyard</p></div>
        <div className={"row flex-center flex-wrap"}>
          {badJokes.map((joke, index) => <div className={"bad-joke"} key={index}>
              <i className={"fa fa-2x fa-skull"}> </i><br/>
              <small>{joke}</small>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default BadJoke;
