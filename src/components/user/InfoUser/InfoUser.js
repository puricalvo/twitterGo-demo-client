import moment from "moment";
import localization from "moment/locale/es";
import { Location, Link, DateBirth } from "../../../utils/Icons";

import "./InfoUser.scss";

export default function InfoUser(props) {
  const { user } = props;
  const name =
    [user?.nombre, user?.apellidos].filter(Boolean).join(" ") ||
    "Cuenta de demo";
  const birthDate = user?.fechaNacimiento
    ? new Date(user.fechaNacimiento)
    : null;

  return (
    <div className="info-user">
      <h2 className="name">{name}</h2>
      {user?.email && <p className="email">{user.email}</p>}
      {user?.biografia && <div className="description">{user?.biografia}</div>}

      <div className="more-info">
        {user?.ubicacion && (
          <p>
            <Location />
            {user.ubicacion}
          </p>
        )}
        {user?.sitioweb && (
          <a
            href={user.sitioweb}
            alt={user.sitioweb}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link /> {user.sitioweb}
          </a>
        )}
        {birthDate &&
          !Number.isNaN(birthDate.getTime()) &&
          birthDate.getFullYear() > 1 && (
          <p>
            <DateBirth />
            {moment(birthDate)
              .locale("es", localization)
              .format("LL")}
          </p>
        )}
      </div>
    </div>
  );
}
