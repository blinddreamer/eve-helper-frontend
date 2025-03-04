import { useLocation, useNavigate } from "react-router-dom";

function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Error Occurred</h2>
      <p>{location.state?.message || "An unknown error occurred."}</p>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}

export default ErrorPage;