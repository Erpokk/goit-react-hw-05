import axios from "axios";
import { useEffect, useState } from "react";
import  usePagination from '../../src/hooks/usePagination'

import css from '../MoviesPage/MoviesPage.module.css';

import MovieList from "../../src/components/MovieList/MovieList";
import Pagination from "../../src/components/Pagination/Pagination";
import getApiOptions from '../../src/utils/apiConfig.js'

const MoviesPage = () => {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState(() => sessionStorage.getItem('query') || '');
    const [movies, setMovies] = useState([]);
    const [ttlPages, setTtlPage] = useState(0)

    let savedPage = JSON.parse(sessionStorage.getItem('page')) || 1


    const { curPage, handleNextPage, handlePrevPage, setCurPage } = usePagination(savedPage, ttlPages);
    const url = `https://api.themoviedb.org/3/search/movie?language=en-US&query=${query}&page=${curPage}`;

    useEffect(() => {
        const fetchMovies = async () => {
            if (!query) return;
            try {
                const response = await axios.get(url, getApiOptions);
                setMovies(response.data.results);
                setTtlPage(response.data.total_pages);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMovies();

    }, [query, curPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        
        sessionStorage.setItem('query', search )
        setQuery(search);
        setCurPage(1);
    };
    
    return (
        <section className="section">
            <h1 className={css.homeTitle}>Search Movies</h1>
            <form onSubmit={handleSearch} className={css.formContainer}>
                <label htmlFor="movieSearch"></label>
                <input
                    type="text"
                    id="movieSearch"
                    name="movieSearch"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a movie..."
                    className={css.input} 
                />
                <button type="submit" className={css.button}>Search</button> {/* Применяем стиль к кнопке */}
            </form>

            <MovieList movies={movies} />
            {movies.length != 0 && (<Pagination
                curPage={curPage}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                ttlPages={ttlPages}
            />)}
            
           
        </section>
    );
};

export default MoviesPage;