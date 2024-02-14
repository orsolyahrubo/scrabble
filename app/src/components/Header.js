import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faUser,
    faHandPointUp,
} from '@fortawesome/free-solid-svg-icons';
import './Header.scss';

export default function Header() {

    const loginIcon = <FontAwesomeIcon icon={faUser} />;
    const homeIcon = <FontAwesomeIcon icon={faHouse} />;
    const register = <FontAwesomeIcon icon={faHandPointUp} />;

    return (
        <div className="container-lg">
            <nav className="navbar navbar-default navbar-expand-xl
      bg-body-tertiary border-bottom border-dark-subtle mb-5"
            >
                <div className="container-fluid">
                    <NavLink className="navbar-brand p-0" to="/">
                        Home
                        {' '}
                        <i>{homeIcon}</i>
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse justify-content-end"
                        id="navbarNav"
                    >
                        <ul className="navbar-nav mb-2 mb-lg-0 gap-2">
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link btn px-3" to="/">
                                        Home
                                        <i>{homeIcon}</i>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link btn px-3" to="/register">
                                        Registration
                                        <i>{register}</i>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link btn px-3" to="/login">
                                        Login
                                        <i>{loginIcon}</i>
                                    </NavLink>
                                </li>
                            </>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}