import { Router } from 'express';

import { PostsController, UsersController, OptionsController } from './../controllers';
import { authenticated } from '../shared/middleware/Authenticated';

const multer  = require('multer');
const upload = multer();

const router = Router();

router.post('/auth/login', UsersController.authLogin);
router.post('/adicionar/novo-usuario', authenticated, UsersController.addNewUser);
router.post('/obter/user/nome', authenticated, UsersController.getUserByUserName);
//router.post('/obter/user/email');
router.get('/get-posts', authenticated, PostsController.getPosts);
router.get('/get-posts-mock', authenticated, PostsController.getPostsMock);
router.post('/remove-post', authenticated, PostsController.removePost);
// router.post('/remove-comentario', authenticated, PostsController.);
router.post('/add-comment', authenticated, PostsController.addComment);
router.post('/postar', authenticated, upload.single("arquivo"), PostsController.postIn);
router.post('/obter/options/options-register', authenticated, OptionsController.getRegister);
router.post('/obter/options/options-sidenav', OptionsController.getSidenav);

export { router };
