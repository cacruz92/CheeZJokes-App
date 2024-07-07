import React from "react";
import "./Joke.css";

const Joke = ({text, key, votes, upvote, downvote}) => {
    return(
        <div className="Joke">
            <div className="Joke-votearea">
                <button onClick={upvote}>
                    <i className="fas fa-thumbs-up" />
                </button>

                <button onClick={downvote}>
                    <i className="fas fa-thumbs-down" />
                </button>

                {votes}
            </div>
            <div className="Joke-text">{text}</div>
        </div>
    )
}

export default Joke;