import mongoose from 'mongoose';

// JSON Schema for admins
const PostSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  pubDate: {
    type: String,
    unique: true,
    required: true,
  },
  'dc:creator': {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  contentSnippet: {
    type: String,
    required: true,
  },
  guid: {
    type: String,
    unique: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  isoDate: {
    type: String,
    required: true,
  },
});

const PostsModel = mongoose.model('Posts', PostSchema);

export default PostsModel;
