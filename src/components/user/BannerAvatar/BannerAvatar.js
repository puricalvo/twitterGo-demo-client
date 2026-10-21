import React from "react";
import AvatarNoFound from "../../../assets/png/avatar-no-found.png";
import { S3_URL } from "../../../utils/constant";

import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user } = props;

  const version = new Date().getTime();
  //const [reloadFollow, setReloadFollow] = useState(false);

  const bannerUrl = user?.banner
    ? `${S3_URL}${user.banner}?v=${version}`
    : null;

  const avatarUrl = user?.avatar
    ? `${S3_URL}${user.avatar}?v=${version}`
    : AvatarNoFound;

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      />
    </div>
  );
}
