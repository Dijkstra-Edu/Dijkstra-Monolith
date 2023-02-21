import client from "./client"

export const getPosts  = async(pageNo, limit) => {
    try {
        const {data} = await client.get(`/post/posts?pageNo=${pageNo}&limit=${limit}`);
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

export const delPosts  = async(postId) => {
    try {
        const {data} = await client.delete(`/post/${postId}`);
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

export const searchPosts  = async(query) => {
    try {
        const {data} = await client.get(`/post/search?title=${query}`);
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