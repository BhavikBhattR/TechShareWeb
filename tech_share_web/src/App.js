import { useState } from 'react';

import Login from './components/account/Login';
import DataProvider from './context/DataProvider.js';
import Home from './components/Home/Home.js';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom'
import Header from './components/header/Header';
import CreatePost from './components/CreatePost';
import DetailView from './components/details/DetailView';
import UpdatePost from './components/UpdatePost';
import About from './About/About';
import Contact from './Contact/Contact';

const clearSessionBeforeLogOut = () => {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
}

const PrivateRoute = ({isAuthenticated, ...props}) => {

  return isAuthenticated ?
    <>
      <Header/>
      <Outlet/>
    </> 
    : <Navigate replace to='/login' onBeforeNavigate={clearSessionBeforeLogOut} />
}

function App() {

  const [isAuthenticated, authenticate] = useState(false);

  return (
    <BrowserRouter>
      <DataProvider>
              <div style={{marginTop: 64}}>
                <Routes>
                <Route path='/login' element={<Login authenticate={authenticate}/>}></Route>

                <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                    <Route path='/' element={<Home/>}></Route>
                </Route>

                <Route path='/createPost' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                    <Route path='/createPost' element={<CreatePost/>}></Route>
                </Route>

                <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                    <Route path='/details/:id' element={<DetailView />}></Route>
                </Route>

                <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                    <Route path='/update/:id' element={<UpdatePost />}></Route>
                </Route>

                <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                    <Route path='/about' element={<About />}></Route>
                </Route>

                <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                    <Route path='/contact' element={<Contact />}></Route>
                </Route>

                </Routes>
              </div>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
