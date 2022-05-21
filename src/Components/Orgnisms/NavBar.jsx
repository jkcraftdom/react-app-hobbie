import React from 'react'
import {Link} from 'react-router-dom'
import pages from '../../Funciones/config'

export default class NavBar extends React.Component {
  render(){
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {
                pages.map((page,i) => {
                  let classLink = i === 0 ? 'nav-link active': 'nav-link'
                  return (
                    <li className='nav-item' key={i}>
                      <Link className={classLink} to={page.link}>{page.name}</Link>
                    </li>
                )})
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
