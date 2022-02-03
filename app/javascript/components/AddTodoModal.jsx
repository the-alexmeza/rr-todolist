import React, { Component } from "react";
import { Button, Form, Input, Modal, Select } from "antd";

const { Option } = Select;

class AddTodoModal extends Component {
  formRef = React.createRef();
  state = {
    visible: false,
  };

  onFinish = (values) => {
    const url = "api/v1/todos/create";
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((data) => {
        if (data.ok) {
          this.handleCancel();
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then(() => {
        this.props.reloadTodos();
      })
      .catch((err) => console.error("Error: " + err));
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Add Task
        </Button>

        <Modal
          title="Add new task"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Enter a title." }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="body"
              label="Body"
              rules={[{ required: true, message: "Enter a body." }]}
            >
              <Input placeholder="Body" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default AddTodoModal;
