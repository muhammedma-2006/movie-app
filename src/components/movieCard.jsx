import React from "react";

const MovieCard = ({ movie: { title, poster_path, release_date, vote_average ,original_language} }) => {
    return(
        <div className="movie-card">
            <img src={poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : './No-Poster.png'} alt="No Image Available" />
            <div className= "mt-4">
                <h3>{title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src="./star.svg" alt="star icon" />
                        <p>{vote_average.toFixed(1)}</p>
                    </div>
                    <span>•</span>
                    <p className="lang"> {original_language.toUpperCase()}</p>
                    <span>•</span>
                    <p className="year">{release_date}</p>
                    
                </div>
            </div>
        </div>
    )
}
  
export default MovieCard
