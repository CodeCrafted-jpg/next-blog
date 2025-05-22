import React from 'react'
import styles from './card.module.css'
import Pagination from '../pagnation/pagination'
import Card from '../card/Card'

// Default fetcher for public posts
const defaultFetcher = async (page, cat) => {
  const res = await fetch(`http://localhost:3000/api/post?page=${page}&cat=${cat || ''}`, {
    cache: 'no-store'
  });
  return res.json();
};

const CardList = async ({ page, cat, customFetcher = null, title = "Recent Posts" }) => {
  const fetcher = customFetcher || defaultFetcher;
  const { posts, count } = await fetcher(page, cat);

  console.log("CardList received posts:", posts); // Add this to debug

  const POST_PER_PAGE = 2;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};


export default CardList;
