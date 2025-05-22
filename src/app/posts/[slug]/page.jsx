import React from 'react';
import styles from './singlePage.module.css';
import Menu from '../../../components/Menu/menu';
import Image from 'next/image';
import Comments from '../../../components/comments/Comments';
import DeletePostButton from '../../../components/deletePost/DeletePostButton'; // client component

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/post/${slug}`, {
    cache: 'no-store',
  });
  return res.json();
};

const Singlepage = async ({ params }) => {
  const { slug } = params;
  const data = await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <div className={styles.titleRow}>
            <h1>{data?.title}</h1>
            {/* Only logicless props here */}
            <DeletePostButton slug={slug} postUserEmail={data?.userEmail} className={styles.deleteButton}  />
          </div>

          <div className={styles.user}>
            {data?.user.image && (
              <div className={styles.userImageContainer}>
                <Image src={data.user.image} alt="" fill className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>15.5.25</span>
            </div>
          </div>
        </div>

        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comments}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default Singlepage;
