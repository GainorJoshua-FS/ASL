import './App.css';
import queryString from 'query-string';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Nav from './components/Nav';
import Home from './components/Home';
import Quiz from './components/Quiz';


function App() {

  const [jqg, setJqg] = useState('')

  useEffect(() => {
    async function fetchJqg() {
      const params = queryString.parse(window.location.search.replace(/^\?/, ''))
      localStorage.token = params.token
      const response = await axios('http://localhost:3000/auth/token/', {
        headers:{
          token: localStorage.token
        }
      })
      setJqg(response.data.token)
    }
    fetchJqg()
  }, []);

  if(!jqg) {
    return <Login />;
  }

  return (
    <Router>
      <Nav isLoggedin={jqg ? true:false} />
      <main className="app">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/quizzes/:id' element={<Quiz />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
