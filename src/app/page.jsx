
import Link from "next/link";
import styles from "./homepage.module.css";
import Featured from "../components/featured/featured"
import CategoryList from "../components/category/category";
import CardList from "../components/cardList/cardList";
import Menu from "../components/Menu/menu";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList page={page}/>
        <Menu />
      </div>
    </div>
  );
}
