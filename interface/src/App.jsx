import { useState } from 'react'
import Header from "./Components/Header/Header.jsx";
import './App.css'
import { BrowserRouter,Route } from 'react-router-dom';
import CountryNews from './Components/Countrynews.jsx';
import AllNews from './Components/Allnews.jsx';
import TopHeadlines from './Components/TopheadLines.jsx';
import { Routes } from 'react-router-dom';


function App() {
  return(<>
  <div className='w-full'>
    <BrowserRouter future={{ v7_startTransition: true }}>
    <Header/>
    <Routes>
          <Route path="/" element={<AllNews />} />
          <Route path="/top-headlines" element={<TopHeadlines />} />
          <Route path="/country/:iso" element={<CountryNews />} />
     </Routes>
       {/* <Cards />  */}
        {/* <Footer />   */}
    </BrowserRouter>

  </div>
        

      </>
    
  );  
}

export default App
