import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from "@firebase/firestore";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./post.css";

const Post = (props) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const { username, postImage, postCaption } = props.post;
    const postId = props.postId;
    useEffect(() => {
        let subscribe;
        if (postId) {
            const q = query(
                collection(db, "posts", postId, "comments"),
                orderBy("timestamp", "desc")
            );
            subscribe = onSnapshot(q, (snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            if (subscribe) subscribe();
        };
    }, [postId]);
    const postComment = (e) => {
        e.preventDefault();
        addDoc(collection(db, "posts", postId, "comments"), {
            username: props.username,
            text: comment,
            timestamp: serverTimestamp(),
        })
            .then(() => setComment(""))
            .catch((error) => alert(error.message));
    };
    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    src="https://stat1.bollywoodhungama.in/wp-content/uploads/2021/07/Tara-Sutaria-looks-scintillating-in-stunning-black-strapless-dress.jpg"
                >
                    {username.charAt(0)}
                </Avatar>
                <h3>{username}</h3>
            </div>
            <img className="post_image" src={postImage} alt="" />
            <h4 className="post_text">
                <Avatar
                    className="post_textAvatar"
                    src="https://stat1.bollywoodhungama.in/wp-content/uploads/2021/07/Tara-Sutaria-looks-scintillating-in-stunning-black-strapless-dress.jpg"
                >
                    {username.charAt(0)}
                </Avatar>
                <strong>{username}</strong>
                {postCaption}
            </h4>
            <div className="post_comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>
            {props.username && (
                <form className="post_comment">
                    <input
                        type="text"
                        className="post_input"
                        placeholder="Enter a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="post_button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        Comment
                    </button>
                </form>
            )}
        </div>
    );
};

export default Post;
