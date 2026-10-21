import React from "react";
import { Button } from "react-bootstrap";
import AvatarNoFound from "../../../assets/png/avatar-no-found.png";
import { S3_URL } from "../../../utils/constant";

import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user, loggedUser } = props;

  const version = new Date().getTime();

  const bannerUrl = user?.banner
    ? `${S3_URL}${user.banner}?v=${version}`
    : null;

  const avatarUrl = user?.avatar
    ? `${S3_URL}${user.avatar}?v=${version}`
    : AvatarNoFound;
  const userId = user?.id ?? user?._id;
  const loggedUserId = loggedUser?.id ?? loggedUser?._id;
  const isOwnProfile =
    userId && loggedUserId && String(userId) === String(loggedUserId);

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      />
      {user && (
        <div className="options">
          <Button
            disabled
            title="Las acciones de perfil están desactivadas en esta demo"
            aria-describedby="demo-read-only-notice"
          >
            {isOwnProfile ? "Editar perfil" : "Seguir / dejar de seguir"}
          </Button>
        </div>
      )}
    </div>
  );
}
