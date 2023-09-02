import { addComment } from './AddComment';
import { getPosts } from './GetPosts';
import { getPostsMock } from './GetPostsMock';
import { postIn } from './Post';
import { removePost } from './RemovePost';

export const PostsController = {
    addComment,
    getPosts,
    removePost,
    postIn,
    getPostsMock
}