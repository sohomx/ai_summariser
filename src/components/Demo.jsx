import { useState, useEffect } from 'react';

import { copy, linkIcon, loader, tick } from '../assets';
import { set } from 'mongoose';
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  const [article, setArticle] =  useState({
    url: '',
    summary: '',
  })

  const [allarticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocallStorage = JSON.parse(localStorage.getItem('articles'));

    if (articlesFromLocallStorage) {
      setAllArticles(articlesFromLocallStorage);
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { data } = await getSummary({ articleUrl: article.url });

    if(data?.summary) {
      const newArticle = ({ ...article, summary: data.summary });
      const updatedAllArticles = [newArticle, ...allarticles]

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
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
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>

      </div>
      {/* Display results */}
     
      
    </section>

 
  )
}

export default Demo