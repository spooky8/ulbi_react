import React, {useMemo} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
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
    const [searchQuery, setSearchQuery] = React.useState('');

    const sortedPosts = useMemo(() => {
        if(selectedSort) {
            return [...posts].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]))
        }
        else return posts
    }, [selectedSort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery, sortedPosts]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort);
    }

  return (
    <div className="App">
        <PostForm create={createPost}/>
        <hr style={{margin: '15px 0'}}/>
        <div>
            <MyInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
            />
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
        {sortedAndSearchedPosts.length !== 0
        ?
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1" />
        :
            <h1 style={{textAlign: 'center'}}>
                Посты не найдены!
            </h1>
        }
    </div>
  );
}

export default App;
