import React, { useState } from "react";
import { Button, Modal, Input, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function AddBoardModal() {
  const [visible, setVisible] = useState(false);
  const { TextArea } = Input;
  const [form] = Form.useForm();

  function createBoard() {
    // console.log(values);
    form.validateFields().then((values) => {
      console.log(values);
    })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  }

  function cancel() {
    setVisible(false);
    form.resetFields();
  }
  
  return (
    <div className="addBoardModal">
      <Button 
        type="primary" 
        icon={<PlusOutlined />}
        size="small"
        onClick={()=>setVisible(true)} 
      />

      <Modal
        visible={visible}
        title="Create Board"
        okText="Add"
        cancelText="Cancel"
        onCancel={cancel}
        onOk={createBoard}
      >
        <Form form={form}>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the title!",
              },
            ]}
          >
            <Input 
              placeholder="Title" 
            />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <TextArea placeholder="Description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
