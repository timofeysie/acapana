import React from "react";
import List from "./List";
import Form from "./Form.jsx";
import Post from "../components/Posts.jsx";

const Articles = () => (
  <div className="row mt-5">
    <div className="col-md-4 offset-md-1">
      <div className="col-md-4 offset-md-1">
        <h2>Add</h2>
        <Form />
      </div>
      <h2>Lists</h2>
      <List />
    </div>
    <div className="col-md-4 offset-md-1">
      <h2>List</h2>
      <Post />
    </div>
  </div>
);
export default Articles;
