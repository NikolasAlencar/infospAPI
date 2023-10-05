import { addComment } from './AddComment';
import { getNotifications } from './GetNotifications';
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
    removeComment,
    getNotifications
}