import React, { useState } from "react";
import { Button, Modal, Input, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addBoard } from "../../store/action/boardAction";

export default function AddGroupModal(props) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  function createBoard() {
    console.log(props.boardId);
    // form.validateFields().then(async (values) => {
    //   dispatch(addBoard({
    //     name: values.title,
    //     description: values.description
    //   }));
    //   setVisible(false);
    // })
    //   .catch((info) => {
    //     console.log("Validate Failed:", info);
    //   });
  };

  function cancel() {
    setVisible(false);
    form.resetFields();
  }
  
  return (
    <div className="addGroupModal">
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
        </Form>
      </Modal>
    </div>
  );
}
