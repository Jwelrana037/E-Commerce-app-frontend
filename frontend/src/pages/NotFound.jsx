import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <main className="not-found-page">
      <p className="not-found-code">404</p>

      <h1>Page Not Found</h1>

      <p>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link to="/" className="not-found-button">
        Back to Home
      </Link>
    </main>
  );
}

export default NotFound;
