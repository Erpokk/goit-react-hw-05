const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;


const getApiOptions =  {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
};

export default getApiOptions;