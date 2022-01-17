import React, { useState } from "react";
import { Button, Modal, Input, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addBoard } from "../../store/action/boardAction";

export default function AddBoardModal() {
  const [visible, setVisible] = useState(false);
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  function createBoard() {
    // console.log(values);
    form.validateFields().then(async (values) => {
      dispatch(addBoard({
        name: values.title,
        description: values.description
      }));
      setVisible(false);
    })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

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
