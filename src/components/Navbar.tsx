'use client'
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import  "../app/navbar.css";
const Navbar = () => {

    return (

      <>

          <nav className="navbar navbar-expand-lg bg-body-tertiary ps-1" data-bs-theme="dark">
              <div className="container-fluid">
                  <a className="navbar-brand" href="#">Navbar</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                          aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse flex justify-content-center" id="navbarSupportedContent">

                      <div>
                          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                              <li className="nav-item">
                                  <Link className="nav-link" aria-current="page" href="/Home">Home</Link>
                              </li>

                              <li className="nav-item">
                                  <Link className="nav-link" aria-current="page" href="/Add">Add</Link>
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link" aria-current="page" href="/Data">Data</Link>
                              </li>
                          </ul>

                          <div className={"userContainerCollapse"}>
                              <p className={"text-white my-auto"}>User:</p>
                          </div>

                      </div>

                  </div>

                  <div className={"userContainer"}>
                      <p className={"text-white my-auto"}>User:</p>
                  </div>
              </div>
          </nav>



      </>
    )
}

export default Navbar;