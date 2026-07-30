import { useState, useEffect } from 'react'
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreatePost from './pages/CreatePost.jsx';
import Layout from './components/Layout.jsx';
import Post from './pages/Post.jsx';


function App() {
  const [loading, setloading] = useState(true)

  return (
    <Layout>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/create' element={<CreatePost/>}/>
          <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Layout>
  )
}

export default App