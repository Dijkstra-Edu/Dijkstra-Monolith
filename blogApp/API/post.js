import client from './client'

export const getFeaturedPost  = async() => {
    try {
        const {data} = await client.get(`/post/featured-posts`);
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data)
        {
            return response.data
        }
        return  {error: error.message || error};
    }
};

export const getLatestPosts  = async(limit, pageNo) => {
    try {
        const {data} = await client.get(`/post/posts?limit=${limit}&pageNo=${pageNo}`);
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data)
        {
            return response.data
        }
        return  {error: error.message || error};
    }
};

