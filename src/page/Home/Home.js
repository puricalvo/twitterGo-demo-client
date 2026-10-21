import { useState, useEffect } from "react";
import { Button, Form, Image, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import BasicLayout from "../../layout/BasicLayout";
import ListTweets from "../../components/ListTweets";
import useAuth from "../../hooks/userAuth";
import AvatarNoFound from "../../assets/png/avatar-no-found.png";
import { S3_URL } from "../../utils/constant";
import { getTweetsFollowersApi } from "../../api/tweet";

import "./Home.scss";

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  const [tweets, setTweets] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingTewwts, setLoadingTewwts] = useState(false);
  const user = useAuth();
  const avatarUrl = user?.avatar ? `${S3_URL}${user.avatar}` : AvatarNoFound;

  useEffect(() => {
    getTweetsFollowersApi(page)
      .then((response) => {
        if (!tweets && response) {
          setTweets(formatModel(response));
        } else {
          if (!response) {
            setLoadingTewwts(0);
          } else {
            const data = formatModel(response);
            setTweets([...tweets, ...data]);
            setLoadingTewwts(false);
          }
        }
      })
      .catch(() => {});
  }, [page]);

  const moreData = () => {
    setLoadingTewwts(true);
    setPage(page + 1);
  };

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="home__title">
        <h2>Inicio</h2>
      </div>
      <div className="home__composer" aria-label="Crear publicación">
        <Image className="home__composer-avatar" src={avatarUrl} roundedCircle alt="" />
        <div className="home__composer-content">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="¿Qué estás pensando?"
            disabled
            aria-label="Texto de la publicación, desactivado en esta demo"
          />
          <div className="home__composer-actions">
            <Button
              variant="outline-secondary"
              disabled
              title="Añadir fotos está desactivado en esta demo"
              aria-describedby="demo-read-only-notice"
            >
              <FontAwesomeIcon icon={faImage} /> Añadir foto
            </Button>
            <Button
              disabled
              title="La publicación está desactivada en esta demo"
              aria-describedby="demo-read-only-notice"
            >
              Twittear
            </Button>
          </div>
        </div>
      </div>
      {tweets && <ListTweets tweets={tweets} />}

      <Button onClick={moreData} className="load-more">
        {!loadingTewwts ? (
          loadingTewwts !== 0 ? (
            "Obtener más Tweets"
          ) : (
            "No hay más tweets"
          )
        ) : (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
      </Button>
    </BasicLayout>
  );
}

function formatModel(tweets) {
  const tweetsTemp = [];

  tweets.forEach((tweet) => {
    tweetsTemp.push({
      _id: tweet._id,
      userid: tweet.userRelationId,
      mensaje: tweet.Tweet.mensaje,
      fecha: tweet.Tweet.fecha,
      imagen: tweet.Tweet.imagen,
    });
  });
  return tweetsTemp;
}
