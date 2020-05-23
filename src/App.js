import React, { useReducer } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [ postData, postDispatch ] = useReducer(
    (state, action)=>{
      switch(action.type) {
        case 'CREATING_POST':
          return {
            ...state, creating: action.creating
          }
        case 'CREATE_POST':
          const count = state.posts.length;
          return {
            ...state, posts: state.posts.concat({id: (count + 1), title: `Post ${count + 1}`})
          }
        default:
          return state;
      } 
    },
    { posts: [], creating: false}
  );
  const createPost = () => {
    postDispatch({
      type: 'CREATING_POST',
      creating: true
    })
    setTimeout(()=> {
      postDispatch({
        type: 'CREATE_POST'
      });
      postDispatch({
        type: 'CREATING_POST',
        creating: false
      })
    }, 1000);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h3>Welcome</h3>
        <logo />
        <section>
          {
            !postData.creating
            ? (<button onClick={createPost} className="btn btn-success">
              Create Post
            </button>)
            :(<div><svg class="RXRPc" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="GsHm5" fill="none" stroke-width="6" stroke-linecap="round" stroke="hsl(86, 47%, 48%)" cx="33" cy="33" r="30"></circle></svg></div>)
          }
        </section>
        <section>
          {postData.posts.map(post => (
            <div key={post.id}>{ post.title }</div>
          ))}
        </section>
      </header>
    </div>
  );
}

export default App;
