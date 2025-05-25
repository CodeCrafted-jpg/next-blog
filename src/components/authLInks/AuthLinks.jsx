"use client";
import Link from "next/link";
import styles from "./authLink.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);

  const { status } = useSession();

  // Function to close menu and optionally sign out
  const handleLogout = () => {
    setOpen(false);
    signOut();
  };

  return (
    <>
      {/* Desktop Links */}
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <Link href="/profile" className={styles.link}>
            Profile
          </Link>
          <span className={styles.link} onClick={signOut}>
            Logout
          </span>
        </>
      )}

      {/* Burger Icon */}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {/* Responsive Menu */}
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/" onClick={() => setOpen(false)}>
            Homepage
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>

          {status === "unauthenticated" ? (
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          ) : (
            <>
              <Link href="/write" onClick={() => setOpen(false)}>
                Write
              </Link>
              <Link href="/profile" onClick={() => setOpen(false)}>
                Profile
              </Link>
              <span className={styles.link} onClick={handleLogout}>
                Logout
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
