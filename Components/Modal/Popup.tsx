import React, { FC } from "react";
import { Button, Modal } from "antd";
import style from "./Popup.module.scss";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../store/actions/Editor";

type Props = {
  children: React.ReactNode;
  title: string;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  className?: string;
};
export const Popup: FC<Props> = ({
  children,
  title = "",
  isModalVisible,
  setIsModalVisible,
  className = "",
  id,
}) => {
  const dispatch = useDispatch();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    dispatch(deleteItem(id));
  };

  return (
    <>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className={className}
        footer={[
          <div className={style.popupFooter} key={"popupFooter"}>
            <div className={style.start} key="startfooter">
              <Button
                key="link"
                className={style.deleteButton}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>

            <div className={style.end} key="endfooter">
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>

              <Button key="submit" type="primary" onClick={handleOk}>
                Submit
              </Button>
            </div>
          </div>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};
