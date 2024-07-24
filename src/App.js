import React, {useMemo} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";

function App() {
    const [posts, setPosts] = React.useState([
        {id: 1, title: 'Post Item 1', body: 'Lorem ipsum dolor sit amet.'},
        {id: 2, title: 'Post Item 2', body: 'Lorem ipsum dolor sit amet.'},
        {id: 3, title: 'Post Item 3', body: 'Lorem ipsum dolor sit amet.'},
    ]);

    const [filter, setFilter] = React.useState({sort: '', query: ''});

    const sortedPosts = useMemo(() => {
        if(filter.sort) {
            return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        else return posts
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()));
    }, [filter.query, sortedPosts]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

  return (
    <div className="App">
        <PostForm create={createPost}/>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1" />
    </div>
  );
}

export default App;
