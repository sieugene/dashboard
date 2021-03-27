import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React, { FC } from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const DropdownItem: FC<Props> = ({ className, children }) => {
  const menu = (
    <Menu>
      <Menu.Item>{children}</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} className={className ?? ""}>
      <EllipsisOutlined />
    </Dropdown>
  );
};
