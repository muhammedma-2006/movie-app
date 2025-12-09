import {useEffect, useState} from 'react';
import Search from './components/Search';
import Spinner from './components/spinner';
import MovieCard from './components/movieCard';
import {useDebounce} from 'react-use';
import { updateSearchCounter, getTrendingMovies } from './appwrite';



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
    const [debouncedSearchItem, setDebouncedSearchItem] = useState('');
    const [trendingMovies, setTrendingMovies] = useState([]);

    useDebounce(
        () => setDebouncedSearchItem(searchItem),
        750,
        [searchItem]
    );

    const fetchMovies = async (query) => {
        setLoading(true);
        setErrorMessage('');
        try {
            const endpoint = query
            ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);
           
            
            if (!response.ok) {
                throw new Error(data.status_message || 'Failed to fetch movies');
            }

            const data = await response.json();

            if (data.response === 'False') {
                setErrorMessage(data.error || 'No movies found');
                setMoviesList([]);
                return
            }

            setMoviesList(data.results || []);

            if (query && data.results && data.results.length > 0) {
                await updateSearchCounter(query, data.results[0]);
            }

        } catch (error) {
            console.error('Error fetching movies:', error);
            setErrorMessage('Error fetching movies. Please try again later.')   ;

        }finally {
            setLoading(false);
        }
    }

    const fetchTrendingMovies = async () => {
        try{
            const Movies = await getTrendingMovies();
            setTrendingMovies(Movies);
        }
        catch (error){
            console.error("Error fetching trending movies:", error);
        }
    }

    useEffect(() => {
        fetchMovies(debouncedSearchItem);
    }, [debouncedSearchItem]);

    useEffect(() => {
        fetchTrendingMovies();
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

                {trendingMovies.length > 0 && (
                <section className='trending'>
                    <h2>Trending</h2>
                    <ul>
                        {trendingMovies.map((movie, index) => (
                            <li key={movie.$id}>
                                <p>{index + 1}</p>
                                <img src={movie.poster_url} alt={movie.title} />
                            </li>
                        ))}
                    </ul>
                </section>
                )}

                <section className='all-movies'>
                    <h2 className='mt-[40px]'>All Movies</h2>
                    {loading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className='text-red-500'>{errorMessage}</p>
                    ) : (
                        <ul>
                            {moviesList.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    
                    )
                    }
                </section>
            </div>
        </main>
    );
}
export default App;