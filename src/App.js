import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import Home from './components/Home';

export default function App() {
  return (

    <div className='bg-background-dark min-h-screen'>
      <Navbar />
      <Home />
    </div>
  )
}