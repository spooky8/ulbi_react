import React, {useEffect, useRef} from "react";
import {usePosts} from "../hooks/UsePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../Utils/pages";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import Loader from "../components/UI/Loader/Loader";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = React.useState([]);

    const [filter, setFilter] = React.useState({sort: '', query: ''});
    const [modal, setModal] = React.useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalPages, setTotalPages] = React.useState(0);
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);

    const lastElement = useRef()

    const [fetchPosts, isPostLoading, postError] = useFetching( async (limit, page) => {
        const responce = await PostService.getAll(limit, page);
        setPosts([...posts, ...responce.data]);
        const totalCount = responce.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })

    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const changePage = (page) => {
        setPage(page);
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'},
                ]}
            />
            {postError && (
                <h1>Произошла ошибка: ${postError}</h1>
            )}
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1" />
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
            {isPostLoading && <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}> <Loader /> </div>}
            <Pagination
                page={page}
                totalPages={totalPages}
                changePage={changePage}
            />
        </div>
    );
}

export default Posts;
