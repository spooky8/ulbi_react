import React from "react";
import './styles/App.css'
import PostItem from "./components/PostItem";

function App() {
  return (
    <div className="App">
      <PostItem post={{id: 1, title: 'Post Item 1', body: 'Lorem ipsum dolor sit amet.'}} />
    </div>
  );
}

export default App;
