import React from "react";
import Avatar from "@mui/material/Avatar";
import avatarImg from "assets/images/avatar.png";

export default function AvatarComponent({ name }: { name?: string }) {
  return (
    <Avatar
      style={{ width: 35, height: 35 }}
      alt={name}
      // src={`${user?.photoURL}`}
      src={avatarImg}
    />
  );
}
