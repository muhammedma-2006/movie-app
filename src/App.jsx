import {useEffect, useState} from 'react';
import Search from './components/Search';

const API_BASE_URL = 'https://api.themoviedb.org/3' ;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_OPTIONS ={
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
} 

const App = () => {
    const [searchItem, setSearchItem] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [moviesList, setMoviesList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const endpoint =`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.status_message || 'Failed to fetch movies');
            }
            if (data.response === 'False') {
                setErrorMessage(data.error || 'No movies found');
                setMoviesList([]);
                return
            }
            setMoviesList(data.results);
           
        } catch (error) {
            console.error('Error fetching movies:', error);
            setErrorMessage('Error fetching movies. Please try again later.')   ;

        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies();
    }, []);
    return (
        <main>
            <div className='pattern'/>

            <div className="wrapper">
                <header>
                    <img src="./hero-img.png" alt="hero image" />
                    <h1 className='text-white'>Find <span className='text-gradient'>Movies</span> you Love Without Hasssle</h1>
                </header>
                <Search searchItem={searchItem} setSearchItem={setSearchItem} />
            </div>
            <section className='all-movies'>
                <h2>All Movies</h2>
                {loading ? (
                    <p>Loading movies...</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    moviesList.map((movie) => (
                        <p key={movie.id} className='text-white'>{movie.title}</p>
                    ))
                )
                }
            </section>
        </main>
    );
}
export default App;