import React from 'react';
import styles from './singlePage.module.css';
import Menu from '../../../components/Menu/Menu';
import Image from 'next/image';
import Comments from '../../../components/comments/Comments';
import DeletePostButton from '../../../components/deletePost/DeletePostButton'; // client component

// This function runs on the server side in Next.js App Router
const getData = async (slug) => {
  // Use process.env.NEXTAUTH_URL to get the base URL of your deployed application.
  // The '|| "http://localhost:3000"' provides a fallback for local development.
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${baseUrl}/api/post/${slug}`, {
      cache: 'no-store', // Ensures fresh data on each request
    });

    // Check if the response was successful
    if (!res.ok) {
      // If the response is not OK (e.g., 404, 500), log the error
      console.error(`Failed to fetch post data: ${res.status} ${res.statusText}`);
      // For now, returning null will allow the UI to show "Post not found".
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching post data:', error);
    return null; // Return null on network errors or other fetch issues
  }
};

const Singlepage = async ({ params }) => {
  const { slug } = params;
  const data = await getData(slug);

  // Handle case where data might not be found or an error occurred during fetch
  if (!data) {
    return (
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <h1 className={styles.errorTitle}>Post not found or an error occurred.</h1>
          <p className={styles.errorMessage}>Please check the URL or try again later.</p>
        </div>
        <div className={styles.content}>
          <Menu />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <div className={styles.titleRow}>
            <h1>{data?.title}</h1>
            {/* The DeletePostButton is a client component, ensure it's imported correctly */}
            <DeletePostButton slug={slug} postUserEmail={data?.userEmail} className={styles.deleteButton} />
          </div>

          <div className={styles.user}>
            {data?.user.image && (
              <div className={styles.userImageContainer}>
                <Image src={data.user.image} alt="User Avatar" fill className={styles.avatar} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              {/* Consider formatting the date from data?.createdAt if available */}
              <span className={styles.date}>{new Date(data?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="Post Image" fill className={styles.image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
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