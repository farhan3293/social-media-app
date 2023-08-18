import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { post as IPost } from './main';

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[] | null>(null);
  const LikesRef = collection(db, 'likes');
  const LikesDoc = query(LikesRef, where('postId', '==', post.id));

  const getLikes = async () => {
    const data = await getDocs(LikesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(LikesRef, {
        userId: user?.uid,
        postId: post.id,
      });

      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const LikeToDeleteQuery = query(LikesRef, where('postId', '==', post.id), where('userId', '==', user?.uid));
      const likeToDeleteData = await getDocs(LikeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, 'likes', likeId);
      await deleteDoc(likeToDelete);

      if (user) {
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="post-container">
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p className="username">@{post.username}</p>
        <button className="like-button" onClick={hasUserLiked ? removeLike : addLike}>
          <span className="like-icon">{hasUserLiked ? '👎' : '👍'}</span>
          {hasUserLiked ? 'Unlike' : 'Like'}
        </button>
        {likes && <p className="like-count">Likes: {likes.length}</p>}
      </div>
    </div>
  );
};
