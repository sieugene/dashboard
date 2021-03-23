import React, { FC } from "react";
import { Modal } from "antd";

type Props = {
  children: React.ReactNode;
  title: string;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};
export const Popup: FC<Props> = ({
  children,
  title = "",
  isModalVisible,
  setIsModalVisible,
  className = "",
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className={className}
      >
        {children}
      </Modal>
    </>
  );
};
