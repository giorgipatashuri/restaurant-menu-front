import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import AdminPage from './pages/admin/AdminPage';
import EditPage from './pages/edit/EditPage';
import Menu from './pages/menu/MenuPage';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Menu />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/edit/:id' element={<EditPage />} />
      </Routes>
    </div>
  );
}

export default App;
