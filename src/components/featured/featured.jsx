import React from 'react'
import styles from './featured.module.css'
import Image from 'next/image'
import Link from 'next/link'
const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}><b className={styles.b}>Hay,Sayan here!</b>Discover my stories and creative ideas.</h1>
      <div className={styles.post}>
        <div className={styles.imageContainer}>
        <Image src='/p1.jpeg' alt='' fill className={styles.image}/></div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}><u>My Blog — Share Your Voice with the World</u></h1>
          <p className={styles.postDesc}>My Blog is a modern blog platform where users can write, publish, and manage posts with ease. Whether you're a developer, writer, or storyteller,My Blog gives you the tools to express your ideas through a clean and responsive interface.
          </p>
          <Link href={'/posts/my-blog'} className={styles.button}>Read More</Link>
        </div>
      </div>

    </div>
  )
}

export default Featured
