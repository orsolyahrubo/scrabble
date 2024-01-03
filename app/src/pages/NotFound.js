import { Link } from 'react-router-dom';
import { EmojiFrown } from 'react-bootstrap-icons';

export default function NotFound() {
  const sadFace = <EmojiFrown />;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center mt-3">
          <h1>
            Whoops! Couldn't find this page...
            {sadFace}
          </h1>
          <Link data-testid="backToHomePage" className="btn btn-m btn-success me-2" to="/">Back to homepage</Link>
        </div>
      </div>
    </div>
  );
}