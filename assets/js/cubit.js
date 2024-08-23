import { fetchPosts, createPost, deletePost } from './backend.js';

export const printPosts = async () => {
    try {
        const posts = await fetchPosts();
        console.log('Posts:', posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

export const addPost = async (title, content, uid) => {
    try {
        const postId = await createPost(title, content, uid);
        console.log(`Post created with ID: ${postId}`);
    } catch (error) {
        console.error('Error creating post:', error);
    }
};

export const removePost = async (postId) => {
    try {
        const message = await deletePost(postId);
        console.log(message);
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};
