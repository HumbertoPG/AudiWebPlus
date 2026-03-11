import { Link } from "react-router-dom";

export default function Sidebar(){

  return (

    <div className="sidebar">

      <div className="logo">

        <h2>Audi</h2>
        <p>Center Angelópolis</p>

      </div>

      <nav>

        <Link to="/home">Inicio</Link>

        <Link to="/models">Modelos</Link>

      </nav>

    </div>

  )

}