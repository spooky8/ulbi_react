import React, {useRef} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {
    const [posts, setPosts] = React.useState([
        {id: 1, title: 'Post Item 1', body: 'Lorem ipsum dolor sit amet.'},
        {id: 2, title: 'Post Item 2', body: 'Lorem ipsum dolor sit amet.'},
        {id: 3, title: 'Post Item 3', body: 'Lorem ipsum dolor sit amet.'},
    ]);

    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');

    const AddNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            id: Date.now(),
            title,
            body,
        }
        setPosts([...posts, newPost]);
    }

  return (
    <div className="App">
        <form>
            <MyInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Название поста"
            />
            <MyInput
                value={body}
                onChange={(e) => setBody(e.target.value)}
                type="text"
                placeholder="Описание поста"
            />
            <MyButton onClick={AddNewPost} >Создать пост</MyButton>
        </form>
        <PostList posts={posts} title="Список постов 1" />
    </div>
  );
}

export default App;
