import React, { useState } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Subheader from './Subheader';


function Home() {

  return (
    <>
 
      <Header />
      <Subheader/>
      <main className="content">
        <Outlet  />
      </main>
    </>
  );
}

export default Home;
