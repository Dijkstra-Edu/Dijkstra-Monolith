const Post = require("../Models/post");
const FeaturedPost = require("../Models/featuredPost");

const cloudinary = require("../Cloud/index");
const { isValidObjectId } = require("mongoose");

const FEATUREDPOSTCOUNT = 5 //Imma using 5, 4 recommended
const addToFeaturedPost = async (postId) => {
    const alreadyExists = await FeaturedPost.findOne({ post: postId });

    if (alreadyExists) return; // res.status(401).json({error: 'Please use unique Slug'})
    const featuredPost = new FeaturedPost({ post: postId })
    await featuredPost.save()

    //Removing old after x number of featured posts
    const fPosts = await FeaturedPost.find({}).sort({ createdAt: -1 })
    fPosts.forEach(async (post, index) => {
        if (index >= FEATUREDPOSTCOUNT) await FeaturedPost.findByIdAndDelete(post._id)
    })
};

const removeFromFeaturedPost = async (postId) => {
    await FeaturedPost.findOneAndDelete({ post: postId });
};

const isFeaturedPost = async (postId) => {
    const post = await FeaturedPost.findOne({ post: postId });
    return post ? true : false;
};

//CRUD
exports.createPost = async (req, res) => {//Await only works if async, generally requires try and catch if async is used
    //console.log(req.file);
    const { title, meta, content, slug, author, tags, featured } = req.body
    const { file } = req;
    const alreadyExists = await Post.findOne({ slug });

    if (alreadyExists) return res.status(401).json({ error: 'Please use unique Slug' })
    const newPost = new Post({ title, meta, content, slug, author, tags });

    if (file) { //File verification - because
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path);
        newPost.thumbnail = { url: secure_url, public_id };
    }

    await newPost.save();

    //We could use featured within models - However for convenience - 4 posts, if new post added, oldest one gets removed
    if (featured) await addToFeaturedPost(newPost._id)

    res.json(
        {
            post:
            {
                id: newPost._id,
                title,
                tags,
                meta,
                slug,
                content,
                thumbnail: newPost.thumbnail?.url,
                author: newPost.author
            }
        });
    //res.send("API is WOrking");
};

exports.getPost = async (req, res) => {
    const { slug } = req.params;
    if (!slug) return res.status(401).json({ error: "Invalid Request" });

    const post = await Post.findOne({ slug });
    if (!post) return res.status(404).json({ error: "Post Not found" });

    const featured = await isFeaturedPost(post._id);

    const { title, meta, content, author, tags, createdAt } = post

    res.json(
        {
            post:
            {
                id: post._id,
                title,
                tags,
                meta,
                slug,
                featured,
                content,
                thumbnail: post.thumbnail?.url,
                author: author,
                createdAt
            }
        });
};

exports.deletePost = async (req, res) => {
    const { postId } = req.params;
    if (!isValidObjectId(postId)) return res.status(401).json({ error: "Invalid Request" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post Not found" });

    const public_id = post.thumbnail?.public_id
    if (public_id) {
        const { result, error } = await cloudinary.uploader.destroy(public_id);

        if (result !== 'ok') return res.status(404).json({ error: "Could not remove thumbnail" });
    }

    await Post.findByIdAndDelete(postId);
    await removeFromFeaturedPost(postId);
    res.json({ message: "Post removed successfully" });
};

exports.updatePost = async (req, res) => {
    const { title, meta, content, slug, author, tags, featured } = req.body
    const { file } = req; //If thumbnail exists, we'll need to be able to change it

    const { postId } = req.params;
    if (!isValidObjectId(postId)) return res.status(401).json({ error: "Invalid Request" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post Not found" });

    const public_id = post.thumbnail?.public_id
    if (public_id && file) {
        const { result, error } = await cloudinary.uploader.destroy(public_id);

        if (result !== 'ok') return res.status(404).json({ error: "Could not remove thumbnail" });
    }

    if (file) { //File verification - because
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path);
        post.thumbnail = { url: secure_url, public_id };
    }

    post.title = title;
    post.meta = meta;
    post.content = content;
    post.slug = slug;
    post.author = author;
    post.tags = tags;

    if (featured) await addToFeaturedPost(post._id);
    else await removeFromFeaturedPost(post._id);

    await post.save();

    res.json(
        {
            post:
            {
                id: post._id,
                title,
                tags,
                meta,
                slug,
                featured,
                content,
                thumbnail: post.thumbnail?.url,
                author: post.author
            }
        });
};

exports.getFeaturedPosts = async (req, res) => {
    const fPosts = await FeaturedPost.find({}).sort({ createdAt: -1 }).limit(5).populate('post');
    res.json({
        posts: fPosts.map(({ post }) => ({
            id: post._id,
            title: post.title,
            //tags: post.tags,
            meta: post.meta,
            slug: post.slug,
            //content: post.content,
            thumbnail: post.thumbnail?.url,
            author: post.author
        }))
    });
};

exports.getPosts = async (req, res) => { //Flexible Route
    //http://localhost:4848/api/post/posts?pageNo=0&limit=10 -> Parameters called are pageNo (val = 0) & limit (val = 10)
    const { pageNo = 0, limit = 10 } = req.query; //default pageNo, limit
    const posts = await Post.find({})
        .sort({ createdAt: -1 })
        .skip(parseInt(pageNo) * parseInt(limit))
        .limit(limit); //For loading more data in app, via skip()

    res.json({
        posts: posts.map((post) => ({
            id: post._id,
            title: post.title,
            tags: post.tags,
            meta: post.meta,
            slug: post.slug,
            //content: post.content,
            thumbnail: post.thumbnail?.url,
            author: post.author,
            createdAt: post.createdAt
        }))
    });
};

exports.searchPost = async (req, res) => { //Flexible Route
    /*http://localhost:4848/api/post/search?title=title 6 -> Gets us "This is the title 6" & "This is the title 6 lalalalala" i.e. 
    anything that matches search query*/
    const { title } = req.query; //default pageNo, limit
    if (!title.trim()) return res.status(401).json({ error: 'Search Query is Missing' });

    const posts = await Post.find({ title: { $regex: title, $options: "i" } });
    res.json({
        posts: posts.map((post) => ({
            id: post._id,
            title: post.title,
            //tags: post.tags,
            meta: post.meta,
            slug: post.slug,
            //content: post.content,
            thumbnail: post.thumbnail?.url,
            author: post.author
        }))
    });
};

exports.getRelatedPosts = async (req, res) => { //Flexible Route

    const { postId } = req.params;

    if (!isValidObjectId(postId)) return res.status(401).json({ error: 'Invalid Request' });

    const post = await Post.findById(postId);
    if (!(post)) return res.status(404).json({ error: 'Post Not Found' });

    const relatedPosts = await Post.find({
        tags: { $in: [...post.tags] },
        _id: { $ne: post._id },
    }).sort("createdAt: -1").limit(5);

    res.json({
        posts: relatedPosts.map((post) => ({
            id: post._id,
            title: post.title,
            //tags: post.tags,
            meta: post.meta,
            slug: post.slug,
            //content: post.content,
            thumbnail: post.thumbnail?.url,
            author: post.author
        }))
    });
};

exports.uploadImage = async (req, res) => {
    const { file } = req;
    if (!file) return res.status(401).json({ error: 'Image file is Missing!' });
    const { secure_url: url } = await cloudinary.uploader.upload(file.path);

    res.status(201).json({image: url});
};