import React from 'react'
import styles from './card.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Card = ({ item, key }) => {
  // Safely format createdAt to YYYY-MM-DD string
  const formattedDate = item.createdAt
    ? (typeof item.createdAt === 'string'
        ? item.createdAt.substring(0, 10)
        : new Date(item.createdAt).toISOString().substring(0, 10))
    : ''

  return (
    <div className={styles.container} key={key}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt='' fill />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>{formattedDate}</span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        <p className={styles.desc}>{item.desc.substring(0, 60)}</p>
        <Link href={`/posts/${item.slug}`}>Read More</Link>
      </div>
    </div>
  )
}

export default Card
