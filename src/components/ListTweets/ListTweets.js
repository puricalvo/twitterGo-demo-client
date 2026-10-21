import { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import moment from "moment";
import AvatarNoFound from "../../assets/png/avatar-no-found.png";
import { S3_URL } from "../../utils/constant";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import { getUserApi } from "../../api/user";

import "./ListTweets.scss";

export default function ListTweets({ tweets }) {
  return (
    <div className="list-tweets">
      {map(tweets, (tweet, index) => (
        <Tweet key={index} tweet={tweet} />
      ))}
    </div>
  );
}

function Tweet({ tweet }) {
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(AvatarNoFound);

  const version = new Date().getTime();
  useEffect(() => {
    getUserApi(tweet.userid).then((response) => {
      if (response) {
        setUserInfo(response);

        setAvatarUrl(
          response?.avatar
            ? `${S3_URL}${response.avatar}?v=${version}`
            : AvatarNoFound,
        );
      }
    });
  }, [tweet]);

  const imageFullUrl = tweet?.imagen ? `${S3_URL}${tweet.imagen}` : null;
  const displayName =
    [userInfo?.nombre, userInfo?.apellidos].filter(Boolean).join(" ") ||
    "Usuario de Twittor";

  return (
    <div className="tweet">
      <Image className="avatar" src={avatarUrl} roundedCircle />
      <div className="tweet-content">
        <div className="name">
          {displayName}
          <span className="fecha">{moment(tweet.fecha).calendar()}</span>
        </div>

        <div
          className="mensaje"
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(tweet.mensaje),
          }}
        />

        {imageFullUrl && (
          <Image src={imageFullUrl} className="image-tweet" fluid />
        )}

      </div>
    </div>
  );
}
