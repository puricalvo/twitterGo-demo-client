import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faUser,
  faUsers,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { logoutApi } from "../../api/auth";
import useAuth from "../../hooks/userAuth";
import LogoWhite from "../../assets/png/logo-white.png";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
  const { setRefreshCheckLogin } = props;
  const user = useAuth();

  const logout = () => {
    logoutApi();
    setRefreshCheckLogin(true);
    window.location.replace("");
  };

  return (
    <div className="left-menu">
      <img className="logo" src={LogoWhite} alt="Twittor" />

      <Link to="/">
        <FontAwesomeIcon icon={faHouseChimney} /> <span>Inicio</span>
      </Link>
      <Link to="/users">
        <FontAwesomeIcon icon={faUsers} /> <span>Usuarios</span>
      </Link>
      <Link to={`/${user?._id}`}>
        <FontAwesomeIcon icon={faUser} /> <span>Perfil</span>
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} /> <span>Cerrar sesión</span>
      </Link>

    </div>
  );
}
