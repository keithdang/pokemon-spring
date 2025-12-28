import {Link} from 'react-router-dom'
import { useAuth } from './security/AuthContext'

function HeaderComponent() {

    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated

    function logout() {
        authContext.logout()
    }

    return (
        
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-md">
                        {isAuthenticated && <Link className="navbar-brand ms-2 fs-2 fw-bold text-black" to="/trainerpokemon">Pokemon</Link>}
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#pokemonNavbar"
                            aria-controls="pokemonNavbar"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="pokemonNavbar">
                            <ul className="navbar-nav me-auto">
                     
                                {/* <li className="nav-item">
                                    {isAuthenticated 
                                            && <Link className="nav-link" to="/todos">List</Link>}                                    
                                </li> */}
                                <li className="nav-item">
                                    {isAuthenticated 
                                            && <Link className="nav-link" to="/pokemon">All Pokemon</Link>}                                    
                                </li>
                                <li className="nav-item">
                                    {isAuthenticated 
                                            && <Link className="nav-link" to="/battle">Battle</Link>}                                    
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {!isAuthenticated &&
                                    <Link className="nav-link" to="/login">Login</Link> }
                            </li>
                            <li className="nav-item">
                                {isAuthenticated &&
                                    <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

    )
}

export default HeaderComponent