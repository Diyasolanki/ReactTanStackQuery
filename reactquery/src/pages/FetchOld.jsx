import axios from "axios";
import { useEffect, useState } from "react";

export const FetchOld = () => {
    const [posts, setPostes] = useState([]);

    const getPostdata = async () => {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
            if (res.status === 200) {
                setPostes(res.data);
            }

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getPostdata();
    }, [])

    return (
        <>
            <div>
                <ul className="section-accordion">
                    {posts?.map((curElem) => {
                        const { id, title, body } = curElem;
                        return (
                            <li key={id}>
                                <p>{title}</p>
                                <p>{body}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};