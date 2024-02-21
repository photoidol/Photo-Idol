const asyncHandler = require("express-async-handler");
const PostsModel = require("../../models/posts/PostsModel");
const slugify = require("slugify");
const cloudinary = require("cloudinary").v2;
const AssetLimitConfigModel = require("../../models/posts/AssetLimitConfigModel");
const Filter = require("bad-words");
const UserModel = require("../../models/users/UserModel");
const { PostsLimit } = require("../../models/SettingModel");
const { default: mongoose } = require("mongoose");

const createPosts = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  const userId = req.user.id;
  const userRole = req.user.role;

  // post limit
  const postsLimitConfig = await PostsLimit.findOne();
  if (!postsLimitConfig) {
    return res.status(500).json({ message: "Posts limit configuration not found" });
  }
  const userPostCount = await PostsModel.countDocuments({ user: userId });

  // Check if the user is an admin or has reached the post limit
  if (userRole !== "admin" && userPostCount >= postsLimitConfig.assetLimit) {
    return res.status(400).json({
      error: `You have reached the maximum post limit (${postsLimitConfig.assetLimit} posts).`,
    });
  }

  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title);
  const isProfanedescription = filter.isProfane(req.body.description);
  if (isProfane || isProfanedescription) {
    res.status(204);
    throw new Error("Creation failed because the content contains profane words, and your post cannot be posted due to content guidelines.");
  }

  if (!title || !description || !category) {
    res.status(404);
    throw new Error("All fields must be provided for this About to be created.");
  }

  // Check if a post with the same category already exists for non-admin users
  if (userRole !== "admin") {
    const existingPost = await PostsModel.findOne({
      user: userId,
      category: category,
    });
    if (existingPost) {
      res.status(400);
      throw new Error("A post with the same category already exists.");
    }
  }

  const originalSlug = slugify(title, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    strict: true,
  });

  let slug = originalSlug;
  let suffix = 1;

  while (await PostsModel.findOne({ slug })) {
    slug = `${suffix}-${originalSlug}`;
    suffix++;
  }

  //Handle Image upload
  let fileData = {};
  if (req.file) {
    //step 2 : save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Photo Idol/Posts",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image colud not be uploaded");
    }
    //step 1 :
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      publicId: uploadedFile.public_id,
    };
  }

  const data = await PostsModel.create({
    user: userId,
    title,
    slug: slug,
    description,
    category,
    assets: fileData,
  });
  res.status(201).json({ message: "Posts created successfully", data });
});

const getallPostofUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const posts = await PostsModel.find({ user: userId })
      .populate("user")
      .populate({
        path: "user",
        select: "avatar name email bio",
      })
      .populate("likes")
      .populate("category");
    res.status(200).json({ total: posts.length, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching user's posts." });
  }
});

// for admin dahsboard
const getallPost = asyncHandler(async (req, res) => {
  const posts = await PostsModel.find({})
    .populate("user")
    .populate({
      path: "user",
      select: "avatar name email bio role paid",
    })
    .populate("likes")
    .populate("category")
    .sort("-createdAt");

  res.status(201).json({ total: posts.length, posts: posts });
});

const getallPosts = asyncHandler(async (req, res) => {
  let filter = {};

  // Check if there's a category filter in the query parameters
  if (req.query.category) {
    filter.category = req.query.category;
  }

  // Check if there's a title search in the query parameters
  if (req.query.title) {
    filter.title = { $regex: req.query.title, $options: "i" };
  }

  // Pagination configuration
  const perPage = 5; // Number of posts per page
  const page = parseInt(req.query.page) || 1; // Current page number

  // Count total posts from users with paid status
  const totalPaidPosts = await PostsModel.aggregate([
    { $match: filter },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $match: { "userDetails.paid": true },
    },
    {
      $count: "totalPaidPosts",
    },
  ]);

  // If no paid posts found, set totalPaidPosts to 0
  const totalPosts = totalPaidPosts.length > 0 ? totalPaidPosts[0].totalPaidPosts : 0;

  // Calculate total pages based on total paid posts
  const totalPages = Math.ceil(totalPosts / perPage);
  const skip = (page - 1) * perPage;

  // Retrieve paid posts
  const posts = await PostsModel.aggregate([
    { $match: filter },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $match: { "userDetails.paid": true },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        content: 1,
        createdAt: 1,
        updatedAt: 1,
        user: {
          name: { $arrayElemAt: ["$userDetails.name", 0] },
          email: { $arrayElemAt: ["$userDetails.email", 0] },
          avatar: { $arrayElemAt: ["$userDetails.avatar", 0] },
          paid: { $arrayElemAt: ["$userDetails.paid", 0] },
        },
      },
    },
    { $skip: skip },
    { $limit: perPage },
  ]);

  res.status(200).json({
    totalPaidPosts: totalPosts,
    totalPages,
    currentPage: page,
    posts: posts,
  });
});

const getPost = asyncHandler(async (req, res) => {
  const post = await PostsModel.findOne({ slug: req.params.slug }).populate("user").populate("category").populate("likes");
  if (!post) {
    res.status(404);
    throw new Error("Posts not found");
  }
  post.numOfViews += 1;
  await post.save();

  res.status(200).json(post);
});

const deletePosts = asyncHandler(async (req, res) => {
  let postId;

  if (req.body && req.body.id) {
    postId = req.body.id;
  } else if (req.params && req.params.id) {
    postId = req.params.id;
  }

  if (!postId) {
    res.status(400);
    throw new Error("Post not found. Please ensure you've provided the correct post ID information.");
  }
  const post = await PostsModel.findOne({ _id: postId });
  if (!post) {
    res.status(404);
    throw new Error("Post not found. Please ensure you've provided the correct post information.");
  }

  if (post.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403);
    throw new Error("You are not authorized to delete this post.");
  }

  // Delete the cover from Cloudinary
  if (post.assets && post.assets.publicId) {
    try {
      const result = await cloudinary.uploader.destroy(post.assets.publicId);
      if (result.result !== "ok") {
        res.status(500).json({ message: "Error deleting cover from Cloudinary" });
        return;
      }
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while deleting the cover image from Cloudinary.",
      });
      return;
    }
  }

  // Delete the cover file from the local device
  /*  if (About.cover && About.cover.fileName) {
    const fileName = About.cover.fileName;
    console.log(fileName);
    const localFilePath = `uploads/${fileName}`;

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    } else {
      return res.status(404).json({ message: "The cover image file does not exist on the local device." });
    }
  }
 */

  await post.deleteOne();
  res.status(200).json({ message: "The post has been successfully deleted." });
});

// update product
const updatePosts = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const { title, category, description } = req.body;
  let fileData = {};

  try {
    const post = await PostsModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to update this post." });
    }

    // Check if the new category already exists for non-admin users
    if (req.user.role !== "admin") {
      const existingPost = await PostsModel.findOne({
        user: req.user._id,
        category: category,
      });
      if (existingPost && existingPost._id.toString() !== postId) {
        return res.status(400).json({ message: "A post with the same category already exists." });
      }
    }

    // Update slug if title changes and title is provided
    if (title && title !== post.title) {
      const originalSlug = slugify(title, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
        strict: true,
      });

      let slug = originalSlug;
      let suffix = 1;

      while (await PostsModel.findOne({ slug })) {
        slug = `${originalSlug}-${suffix}`;
        suffix++;
      }

      post.title = title;
      post.slug = slug;
    }

    // Handle uploading new image if exists
    if (req.file) {
      try {
        const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Photo Idol/Posts",
          resource_type: "image",
        });
        fileData = {
          fileName: req.file.originalname,
          filePath: uploadedFile.secure_url,
          fileType: req.file.mimetype,
          publicId: uploadedFile.public_id,
        };

        // Remove previous images
        if (post.assets && post.assets.publicId) {
          try {
            const result = await cloudinary.uploader.destroy(post.assets.publicId);
            if (result.result !== "ok") {
              res.status(500).json({ message: "Error deleting cover from Cloudinary" });
              return;
            }
          } catch (error) {
            res.status(500).json({
              message: "An error occurred while deleting the cover image from Cloudinary.",
            });
            return;
          }
        }
      } catch (error) {
        return res.status(500).json({ message: "Image could not be uploaded." });
      }
    }

    // Update post details
    post.title = title || post.title;
    post.category = category || post.category;
    post.description = description || post.description;
    post.assets = Object.keys(fileData).length === 0 ? post.assets : fileData;

    // Save the updated post
    const updatedPost = await post.save();

    res.status(200).json({ message: "Post updated successfully", data: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the post." });
  }
});

const userPostsSearch = asyncHandler(async (req, res) => {
  try {
    const { userId, email } = req.query;

    const query = userId ? { user: userId } : {};
    if (email) {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      query.user = user._id;
    }
    const postCount = await PostsModel.find(query);
    res.status(200).json({ totalPost: postCount.length, postCount });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving post count", error: error.message });
  }
});

const toggleLike = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "Resource ID is invalid!" });
  }

  try {
    const resource = await PostsModel.findById(id);

    if (!resource) {
      return res.status(404).json({ error: "Resource not found!" });
    }

    if (resource.likes.includes(userId)) {
      await PostsModel.updateOne({ _id: id }, { $pull: { likes: userId } });
      return res.json({ status: "removed" });
    } else {
      await PostsModel.updateOne({ _id: id }, { $addToSet: { likes: userId } });
      return res.json({ status: "added" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred." });
  }
});

module.exports = {
  createPosts,
  getallPostofUser,
  getallPosts,
  getallPost,
  getPost,
  deletePosts,
  updatePosts,
  userPostsSearch,
  toggleLike,
};
