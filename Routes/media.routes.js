const {
    CreatePost,
    UpdatePost,
    DeletePost,
    GetPostById,
    GetPosts,
    uploadFile,
} = require("../Controllers/mediapost.controller");
const AuthMiddleware = require("../Middlewares/auth.middleware");
const fileUploaderMiddleware = require("../Middlewares/fileUploaderMiddleware");
const mediaUploaderMiddleware = fileUploaderMiddleware('media');

const MediaRoutes = (app) => {

    // media routes : auth required
    app.get("/media/posts", AuthMiddleware, GetPosts);
    app.get("/media/post/:id", AuthMiddleware, GetPostById);
    app.post("/media/createPost", AuthMiddleware, CreatePost); // ngo auth required
    app.put("/media/update/:id", AuthMiddleware, UpdatePost); // ngo auth required
    app.delete("/media/delete/:id", AuthMiddleware, DeletePost); // ngo auth required

    // Helper route for uploading images for media posts
    app.post("/media/upload", AuthMiddleware, mediaUploaderMiddleware, uploadFile);
}

module.exports = MediaRoutes;