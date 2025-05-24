import React from 'react'
import styles from './category.module.css'
import Link from 'next/link'
import Image from 'next/image'

const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
const getData = async () => {
 const res = await fetch(`${baseUrl}/api/categories`, {
      cache: 'no-store'
  })
  if (!res.ok){
    throw new Error("Failed")
  }
 return res.json("Fetched")
}
const Category = async () => {
  const data=await getData()
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Catagories</h1>
      <div className={styles.categories}>
        {data?.map(items=>(
          <Link href={`/blog?cat=${items.slug}` } className={`${styles.category} ${styles[items.slug]}`}
          key={items._id}
          >
          {items.img&&(<Image src={items.img} alt='' width={32} height={32} className={styles.image} />)}
          {items.title}
        </Link>
        ))}
        

      </div>
    </div>
  )
}

export default Category
