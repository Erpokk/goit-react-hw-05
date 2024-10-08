const apiKey = import.meta.env.VITE_TMDB_KEY;


const getApiOptions =  {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
};

export default getApiOptions;