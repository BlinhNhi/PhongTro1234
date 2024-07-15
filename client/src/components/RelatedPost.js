import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ItemSmall from "./ItemSmall";
import * as actions from "../stores/actions";

function RelatedPost({ newPost }) {
    const dispatch = useDispatch();
    const { newPosts, newsOutStanding } = useSelector(state => state.post);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        newPost ? dispatch(actions.getNewPosts()) : dispatch(actions.getOutStandingPost())
    }, []);

    useEffect(() => {
        newPost ? setPosts(newPosts) : setPosts(newsOutStanding)
    }, [newPosts, newsOutStanding])
    console.log(newsOutStanding);
    console.log(posts);
    return (
        <div className="w-full bg-white rounded-md p-4">
            <h3 className="font-semibold text-lg mb-4">{newPost ? 'Tin Mới Đăng' : 'Tin Nổi Bật'}</h3>
            <div className="w-full flex flex-col gap-2">
                {
                    posts.length > 0 && posts.map((item, index) => {
                        return (
                            <ItemSmall
                                key={index}
                                createAt={item.createdAt}
                                price={item?.attributes?.price}
                                title={item?.title}
                                image={JSON.parse(item?.images.image)}
                                star={item?.star}
                            ></ItemSmall>
                        )
                    })
                }

            </div>
        </div>
    );
}

export default RelatedPost;
