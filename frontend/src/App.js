import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Home } from './Pages/Home'
import  Login  from './Pages/Login'
import Register  from './Pages/Register'
import { Blogs } from './Pages/Blogs'
import Header from './Components/Header'
import Footer from './Components/Footer'
import CreateBlogs from './Pages/CreateBlogs'
import BlogPost from './Pages/BlogPost'
 import EditBlog from './Pages/EditPost'
import Profile from './Pages/Profile'
import ForgotPassword from './Pages/ForgotPassword'
export const App = () => {
  return (

    <div>
     <Header/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/create' element={<CreateBlogs/>}></Route>
      <Route path='/blogpost' element={<BlogPost/>}></Route>
      <Route path='/blogs' element={<Blogs/>}></Route>
      <Route path='/editblog' element={<EditBlog/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
    </Routes>
    <Footer/>
    </div>
  )
}
