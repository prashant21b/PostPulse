#Blog Content Management System (MERN Stack)
Blog CMS

This is a Blog Content Management System (CMS) built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The CMS allows users to read, create, like, comment, and edit blog posts. It also supports user authentication with bcrypt and JSON Web Tokens (JWT), and file uploads using Multer.

#Table of Contents
Features
Requirements
Installation
Usage
Endpoints
File Upload
Authentication
Contributing
License
Features
Read Post: Users can view blog posts and read their contents.

Create Post: Authenticated users can create new blog posts with a title, content, and optional file attachments.

Like on a Post: Authenticated users can like blog posts to show their appreciation.

Comment on a Post: Authenticated users can leave comments on blog posts.

Edit a Post: Authenticated users can edit their own blog posts.

Login and Signup: User authentication is implemented with bcrypt for password hashing and JSON Web Tokens (JWT) for secure access.

File Upload: The system supports file uploads using Multer, allowing users to attach images or other files to their blog posts.

Requirements
Make sure you have the following installed on your system:

Node.js (https://nodejs.org)
MongoDB (https://www.mongodb.com)


File Upload
To upload files (e.g., images) for a blog post, use the /api/posts/:id/upload endpoint with a multipart/form-data request. Make sure you include the appropriate Authorization header with a valid JWT token.

Authentication
This CMS uses JWT-based authentication to secure the endpoints. To create a new user account, use the /api/v1/register endpoint. To log in, use the /api/v1/login endpoint. The server will respond with a JWT token that you need to include in the Authorization header for accessing protected routes.

Contributing
Contributions to this project are welcome. Feel free to open issues and submit pull requests.

Fork the repository.
Create your feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.
License
This project is licensed under the MIT License. Feel free to use and modify the code as per the terms of the license.
