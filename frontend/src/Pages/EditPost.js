import React, { useState, useEffect } from 'react';
import './editblog.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { baseURL } from '../url';

const EditBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(location.state.title);
  const [content, setContent] = useState(location.state.content);
  const [categories, setCategories] = useState(location.state.categories);
  const [imageUrl, setImageUrl] = useState(location.state.photo.url);
  const [publicKey, setPublicKey] = useState(location.state.photo.public_id);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('jwtToken')) {
      navigate('/');
    }
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleCategoriesChange = (e) => {
    setCategories(e.target.value);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/api/v1/editpost`, {
        id: location.state._id,
        title,
        content,
        categories,
        imageUrl,
        publicKey,
      });
      setIsEditMode(false);
      navigate('/blogs'); // Navigate to the blogs page after updating
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  const ImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    setImage(file);
    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${baseURL}/api/v1/upload-image`, formData);
      setImageUrl(response.data.url);
      setPublicKey(response.data.public_id);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  return (
    <div className="form-ctn">
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>Edit Blog Post</h2>
      <div className="form">
        <form className="frm" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              disabled={!isEditMode}
              required
            />
          </div>
          <div>
            <label>Categories:</label>
            <input
              type="text"
              value={categories}
              onChange={handleCategoriesChange}
              disabled={!isEditMode}
            />
          </div>
          <div>
            <label>Content:</label>
            <div style={{ height: '200px', overflowY: 'scroll', backgroundColor: "white" }}>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleContentChange}
                readOnly={!isEditMode}
              />
            </div>
          </div>
          <div>
            <label>Image:</label>
            <input type="file" name="image" onChange={ImageUpload} disabled={!isEditMode} />
            {loading && <p>Uploading...</p>}
          </div>
          {isEditMode && (
            <div>
              <button type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Submit'}
              </button>
            </div>
          )}
        </form>
        {!isEditMode && (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default EditBlog;
