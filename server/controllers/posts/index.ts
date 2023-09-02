import { addComment } from './AddComment';
import { getPosts } from './GetPosts';
import { getPostsMock } from './GetPostsMock';
import { postIn } from './Post';
import { removeComment } from './RemoveComment';
import { removePost } from './RemovePost';

export const PostsController = {
    addComment,
    getPosts,
    removePost,
    postIn,
    getPostsMock,
    removeComment
}