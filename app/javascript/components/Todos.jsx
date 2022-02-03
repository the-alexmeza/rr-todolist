import { Table, Popconfirm, message } from "antd";
import React, { Component } from "react";
import AddTodoModal from "./AddTodoModal";

class Todos extends Component {
  columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Completed",
      dataIndex: "isComplete",
      key: "isComplete",
    },
    {
      title: "",
      key: "action",
      render: (_text, record) => (
        <Popconfirm
          title="Remove this item?"
          onConfirm={() => this.deleteTodo(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <a href="#" type="danger">
            Delete{" "}
          </a>
        </Popconfirm>
      ),
    },
  ];
  state = {
    todos: [],
  };

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = () => {
    const url = "api/v1/todos/index";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        data.forEach((todo) => {
          const newElement = {
            key: todo.id,
            id: todo.id,
            title: todo.title,
            body: todo.body,
            isComplete: todo.isComplete,
          };

          this.setState((prevState) => ({
            todos: [...prevState.todos, newElement],
          }));
        });
      })
      .catch((err) => message.error("Error: " + err));
  };

  reloadTodos = () => {
    this.setState({ todos: [] });
    this.loadTodos();
  };

  deleteTodo = (id) => {
    const url = `api/v1/todos/${id}`;

    fetch(url, {
      method: "delete",
    })
      .then((data) => {
        if (data.ok) {
          this.reloadTodos();
          return data.json();
        }
        throw new Error("Network error.");
      })
      .catch((err) => message.error("Error: " + err));
  };

  render() {
    return (
      <>
        <Table
          className="table-striped-rows"
          dataSource={this.state.todos}
          columns={this.columns}
        />

        <AddTodoModal reloadTodos={this.reloadTodos} />
      </>
    );
  }
}

export default Todos;
