import React, { useState,useEffect } from 'react'
import './editblog.css';
import { useLocation } from 'react-router-dom';

const EditBlog= () => {
    const location = useLocation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState(location.state.title);
    const [content, setContent] = useState(location.state.content);
    const [categories, setCategories] = useState(location.state.categories);
    const [photo, setPhoto] = useState(`/${location.state.photo}`);
    console.log("photo",photo);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleCategoriesChange = (e) => {
        setCategories(e.target.value);
    };

    const handleImageChange = (e) => {
        // Get the selected image file from the input field
        const file = e.target.files[0];
        setPhoto(file);
      };

    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleSubmit =async (e) => {
        e.preventDefault();

        // const response=await fetch('http://localhost:4000/api/v1/editpost',{
        //     method:'POST',
        //     headers:{
        //         'Content-Type': 'application/json',
        //     },
        //     body:JSON.stringify({
        //         id:location.state._id,
        //         title:title,
        //         content:content,
        //         categories:categories,
        //         photo:photo
        //     })
        // })
        const formData = new FormData();
    formData.append('id', location.state._id);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('categories', categories);
    if (photo) {
      formData.append('photo',photo);
    }

    // Send the POST request with the FormData object
    const response = await fetch('/api/v1/editpost', {
      method: 'POST',
      body: formData,
    });
        setTitle('');
        setContent('');
        setCategories('');
        setIsEditMode(false);
    };

    return (
        <div>
            
            <form className="blog-form-container" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        disabled={!isEditMode}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                        disabled={!isEditMode}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="categories">Categories:</label>
                    <input
                        type="text"
                        id="categories"
                        value={categories}
                        onChange={handleCategoriesChange}
                        disabled={!isEditMode}
                    />
                </div>
                <div>
                    <label htmlFor="imageUrl">Image:</label>
                    <input type="file" id='imageUrl'  name="image" onChange={handleImageChange} />
                    
                </div>
                {isEditMode && (
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                )}
            </form>
            {!isEditMode && (
                <button onClick={handleEdit}>Edit</button>
            )}
        </div>
    );
};

export default EditBlog;
