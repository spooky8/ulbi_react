import React, {useEffect} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/UsePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";

function App() {
    const [posts, setPosts] = React.useState([]);

    const [filter, setFilter] = React.useState({sort: '', query: ''});
    const [modal, setModal] = React.useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalCount, setTotalCount] = React.useState(0);
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);

    const [fetchPosts, isPostLoading, postError] = useFetching( async () => {
        const responce = await PostService.getAll(limit, page);
        setPosts(responce.data);
        setTotalCount(responce.headers['x-total-count']);
    })

    useEffect(() => {
        fetchPosts()
    }, []);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
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
        {postError && (
            <h1>Произошла ошибка: ${postError}</h1>
        )}
        {isPostLoading
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}> <Loader /> </div>
            : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1" />
        }
    </div>
  );
}

export default App;
