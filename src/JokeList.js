import React, {useState, useEffect } from "react";
import Joke from "./Joke";
import axios from "axios";
import "./JokeList.css"

const JokeList = ({num = 5}) => {
    const [jokes, setJokes] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getJokes() {
          let j = [...jokes];
          let seenJokes = new Set();
          try {
            while (j.length < num) {
              let res = await axios.get("https://icanhazdadjoke.com", {
                headers: { Accept: "application/json" }
              });
              let { ...jokeObj } = res.data;
    
              if (!seenJokes.has(jokeObj.id)) {
                seenJokes.add(jokeObj.id);
                j.push({ ...jokeObj, votes: 0 });
              } else {
                console.error("duplicate found!");
              }
            }
            setJokes(j);
            setIsLoading(false)
          } catch (err) {
            console.error(err);
          }
        }
    
        if (jokes.length === 0) getJokes();
      }, [jokes, num]);



    const generateNewJokes = () => {
        setJokes([]);
        setIsLoading(true);
    };

    const vote = (id, delta) => {
        setJokes(allJokes =>
          allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
        );
      }

    if(isLoading){
        return(
        <div className="loading">
            <i className="fas fa-4x fa-spinner fa-spin" />
        </div>
        )
    }

    let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

    return(
        <div className="JokeList">
            <button className="JokeList-getmore" onClick={generateNewJokes}>
                Get New Jokes
            </button>
            {sortedJokes.map(joke => (
                <Joke 
                text={joke.joke} 
                key={joke.id} 
                votes={joke.votes} 
                upvote={() => vote(joke.id, 1)}
                downvote={() => vote(joke.id, -1)} 
                />
            ))}
        </div>
    )

}

export default JokeList;
