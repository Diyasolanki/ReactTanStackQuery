import { useQuery, useQueryClient, keepPreviousData, useMutation } from "@tanstack/react-query";
import { fetchPosts, deletePost, updatePost } from "@/API/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    //  Saves that result in its internal cache, using the key ['posts'].
    queryKey: ['posts', pageNumber], //usestate // usinque name for ur req.
    queryFn: () => fetchPosts(pageNumber), //useffect
    placeholderData: keepPreviousData,
  });


  //! mutation function to delete the post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", pageNumber], (curElem) => {
        return curElem?.filter((post) => post.id !== id);
      });
    },
  });
  //! mutation function to update the post
  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId) => {
      // console.log(apiData, postId);
      queryClient.setQueryData(["posts", pageNumber], (postsData) => {
        return postsData?.map((curPost) => {
          return curPost.id === postId
            ? { ...curPost, title: apiData.data.title }
            : curPost;
        });
      });
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <>
      <div>
        <ul className="section-accordion">
          {data?.map((curElem) => {
            const { id, title, body } = curElem;
            return (
              <li key={id}>
                <NavLink to={`/rq/${id}`}>
                  <p>{id}</p>
                  <p>{title}</p>
                  <p>{body}</p>
                </NavLink>
                <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
                <button onClick={() => updateMutation.mutate(id)}>Update</button>
              </li>
            );
          })}
        </ul>

        <div className="pagination-section container">
          <button
            disabled={pageNumber === 0 ? true : false}
            onClick={() => setPageNumber((prev) => prev - 3)}
          >
            Prev
          </button>
          <p>{pageNumber / 3 + 1}</p>
          <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
        </div>

      </div>
    </>
  );
};