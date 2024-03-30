import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      {error?.status === 404 && <p>Page not found.</p>}
      {error?.status === 401 && <p>Unauthorized access. Please login.</p>}
      {error && <p>An unexpected error occurred: {error.message}</p>}
    </div>
  );
}
