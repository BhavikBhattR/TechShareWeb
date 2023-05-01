import { useState } from 'react';

import Login from './components/account/Login';
import DataProvider from './context/DataProvider.js';
import Home from './components/Home/Home.js';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom'
import Header from './components/header/Header';


const PrivateRoute = ({isAuthenticated, ...props}) => {

  return isAuthenticated ?
    <>
      <Header/>
      <Outlet/>
    </> 
    : <Navigate replace to='/login'/>
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
                </Routes>
              </div>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
