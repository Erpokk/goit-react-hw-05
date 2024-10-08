import axios from "axios";
import { useEffect, useState } from "react";
import getApiOptions from '../../src/utils/apiConfig.js'

import usePagination from "../../src/hooks/usePagination";

import css from './Homepage.module.css'

import MovieList from "../../src/components/MovieList/MovieList";
import Pagination from "../../src/components/Pagination/Pagination";

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [ttlPages, setTtlPage] = useState(0)


    const savedPage = JSON.parse(sessionStorage.getItem('page')) || 1
    
    const { curPage, handleNextPage, handlePrevPage } = usePagination(savedPage, ttlPages);

    const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${curPage}`;

    useEffect(() => {   
    const fetchMovies = async () => {
        try {
            const response = await axios.get(url, getApiOptions);
            setMovies(response.data.results); 
            setTtlPage(response.data.total_pages)
        } catch (error) {
            console.error(error); 
        }
    };
    
    fetchMovies(); 
    }, [curPage]);
    
    return (
        <section className="section">
            <h1 className={css.homeTitle}>Trending Movies</h1>
            <MovieList movies={movies}/>           
            <Pagination
                curPage={curPage}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                ttlPages={ttlPages}
            />
        </section>
    )
}

export default HomePage;