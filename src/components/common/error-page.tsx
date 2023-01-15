import { useRouteError, Link } from "react-router-dom";
import { MdConstruction } from "react-icons/md";
import { TbRouteOff } from "react-icons/tb";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>
        Sorry, Route <TbRouteOff /> under-construction. <MdConstruction />
      </p>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
