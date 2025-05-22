import CardList from '../../components/cardList/cardList';
import { getAuthSession } from '../../utils/auth';
import prisma from '../../utils/connect';
import Image from 'next/image';
import styles from './myPostsPage.module.css'; // create this CSS module

const POST_PER_PAGE = 2;

const MyPostsPage = async ({ searchParams }) => {
  const session = await getAuthSession();

  if (!session) {
    return <div>Please login to see your posts.</div>;
  }

  const page = parseInt(searchParams?.page || '1');
  const skip = POST_PER_PAGE * (page - 1);

  const [posts, count] = await prisma.$transaction([
    prisma.post.findMany({
      where: { userEmail: session.user.email },
      take: POST_PER_PAGE,
      skip,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.post.count({ where: { userEmail: session.user.email } }),
  ]);

  return (
    <div className={styles.wrapper}>
      {/* User Profile Info */}
      <div className={styles.profile}>
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || 'User'}
            width={80}
            height={80}
            className={styles.avatar}
          />
        )}
        <h2 className={styles.name}>{session.user.name || 'Anonymous'}</h2>
      </div>

      {/* User's Posts */}
      <CardList
        page={page}
        cat={null}
        customFetcher={async () => ({ posts, count })}
        title="My Posts"
      />
    </div>
  );
};

export default MyPostsPage;
