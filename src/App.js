import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { AddPostForm } from './features/posts/AddPostForm'
import { EditPostForm } from './features/posts/EditPostForm'

import { PostsList } from './features/posts/PostsList'

import { SinglePostPage } from './features/posts/SinglePostPage'

function App() {
    return (
        <Router>
            <Navbar />
            <div className="App">
                {/* Renders the first child <Route> or <Redirect> that matches the location. */}
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <React.Fragment>
                                <AddPostForm />
                                <PostsList />
                            </React.Fragment>
                        )}
                    />
                    <Route
                        exact
                        path="/posts/:postId"
                        component={SinglePostPage}
                    />
                    <Route
                        exact
                        path="/editedPost/:postId"
                        component={EditPostForm}
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}

export default App
