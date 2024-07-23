import React, {useRef} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {
    const [posts, setPosts] = React.useState([
        {id: 1, title: 'Post Item 1', body: 'Lorem ipsum dolor sit amet.'},
        {id: 2, title: 'Post Item 2', body: 'Lorem ipsum dolor sit amet.'},
        {id: 3, title: 'Post Item 3', body: 'Lorem ipsum dolor sit amet.'},
    ]);

    const [selectedSort, setSelectedSort] = React.useState('')

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setPosts([...posts].sort((a,b) => a[sort].localeCompare(b[sort])))
    }

  return (
    <div className="App">
        <PostForm create={createPost}/>
        <hr style={{margin: '15px 0'}}/>
        <div>
            <MySelect
                value={selectedSort}
                onChange={sortPosts}
                defaultValue="Сортировка"
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'},
                ]}
            />
        </div>
        {posts.length !== 0
        ?
            <PostList remove={removePost} posts={posts} title="Список постов 1" />
        :
            <h1 style={{textAlign: 'center'}}>
                Посты не найдены!
            </h1>
        }
    </div>
  );
}

export default App;
