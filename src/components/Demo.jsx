import { useState, useEffect } from 'react';

import { copy, linkIcon, loader, tick } from '../assets';
import { set } from 'mongoose';

const Demo = () => {
  const [article, setArticle] =  useState({
    url: '',
    summary: '',
  })

  const handleSubmit = async (e) => {
    alert('submitted');
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* search component */}
      <div className = "flex flex-col w-full gap-2">
        <form className = "relative flex justify-center items-center"
        onSubmit={handleSubmit}>

      <img
      src={linkIcon}
      alt="link_icon"
      className="absolute left-0 my-2 ml-3 w-5"
      />

      <input
      type="url"
      placeholder='Enter a link to summarize'
      value={article.url}
      onChange={(e) => setArticle({...
        article, url: e.target.value})}
      required
      className="url_input peer"
      />

      <button type="submit" className='submit_btn'>↵</button>
        </form>

        {/* browse url history */}
      </div>
      {/* Display results */}
     
      
    </section>

 
  )
}

export default Demo