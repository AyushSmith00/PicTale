import { useState, useEffect } from 'react'
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Layout from './components/Layout.jsx';
function App() {
  const [loading, setloading] = useState(true)

  return (
    <Layout>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
      </Routes>
    </Layout>
  )
}

export default App