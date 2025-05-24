"use client";
import React, { useState } from "react";
import styles from "./comments.module.css";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Trash2 } from "lucide-react"; // You can use any icon library

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message);
    throw err;
  }
  return data;
};

const Comments = ({ postSlug }) => {
  const { data: session, status } = useSession();
  const { data, mutate, isLoading } = useSWR(
    `/api/comments?postSlug=${postSlug}`,
    fetcher
  );
  const [desc, setDesc] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    setDesc(""); // clear input
    mutate(); // refresh comment list
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await fetch(`/api/comments?id=${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>

      {status === "authenticated" ? (
        <>
          <textarea
            placeholder="Write a comment...."
            className={styles.input}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </>
      ) : (
        <Link className={styles.login} href="/login">
          Login
        </Link>
      )}

      <div className={styles.comments}>
        {isLoading ? (
          "Loading..."
        ) : (
          data?.map((item) => (
            <div className={styles.comment} key={item.id}>
              <div className={styles.user}>
                {item?.user.image && (
                  <Image
                    src={item.user.image}
                    alt=""
                    className={styles.image}
                    width={50}
                    height={50}
                  />
                )}
                <div className={styles.userInfo}>
                  <span className={styles.username}>{item.user.name}</span>
                  <span className={styles.date}>
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>
                {/* Show delete icon if current user is comment owner */}
                {session?.user?.email === item.userEmail && (
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    title="Delete your comment"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <p className={styles.description}>{item.desc}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
