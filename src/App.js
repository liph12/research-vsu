import React from 'react';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Error from './components/error';
import Enrolls from './components/enrolls';
import QRScanner from './components/qrscanner';
import { Route, Routes, Link } from 'react-router-dom';
import RequireAuth from './components/require-auth';
import { AuthProvider } from './components/auth';

function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path='/login' element={ <Login /> } />
      <Route element={ <RequireAuth /> }>
        <Route path='/dashboard' element={ <Dashboard /> } />
        <Route path='/enrolls' element={ <Enrolls /> } />
        <Route path='/scanqr' element={ <QRScanner /> } />
        <Route path='*' element={ <Error /> } />
      </Route>
    </Routes>
    </AuthProvider>
  );
}

export default App;
