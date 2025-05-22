import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'
import Link from 'next/link'


const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt='' width={50} height={50} />
          <h1 className={styles.logoText}>My Blog</h1>
        </div>
        <p className={styles.desc}> My Blog is a modern blog platform where users can write, publish, and manage
          posts with ease. Whether you&apos;re a developer,
          writer, or storyteller, My Blog gives you the tools to express your
          ideas through a clean and responsive interface. </p>
        <div className={styles.incons}>
          <Image src='/facebook.png' alt='' width={18} height={18} />
          <Image src='/instagram.png' alt='' width={18} height={18} />
          <Image src='/tiktok.png' alt='' width={18} height={18} />
          <Image src='/youtube.png' alt='' width={18} height={18} />


        </div>

      </div>
      <div className={styles.link}>
        <div className={styles.list}>
          <span>Link</span>
          <Link href='/'>Homepage</Link>
          <Link href='/blog'>Blog</Link>
          <Link href='/'>About us</Link>
          <Link href='/'>Contact</Link>
        </div>
        <div className={styles.list}>
          <span>Tags</span>
          <Link href='/'>Style</Link>
          <Link href='/'> Fashion </Link>
          <Link href='/'>Food</Link>
          <Link href="/">Travel</Link>
          <Link href="/">Coding</Link>
        </div>
        <div className={styles.list}>
          <span>Social</span>
          <Link href='/'>Facebook</Link>
          <Link href='/'>Instagram</Link>
          <Link href='/'>Tiktok</Link>
          <Link href='/'>Youtube</Link>
        </div>
      </div>

    </div>
  )
}

export default Footer