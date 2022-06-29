import { Link } from "react-router-dom";

const MenuAppComp = () => {
  return (
    <ul className="menuApp">
      <li>
        <Link to={"/"}>Accueil</Link>
      </li>
      <li>
        <Link to={"/page-1"}>Page 1</Link>
      </li>
      <li>
        <Link to={"/page-2"}>Page 2</Link>
      </li>
      <li>
        <Link to={"/page-3"}>Page 3</Link>
      </li>
    </ul>
  );
};

export default MenuAppComp;
