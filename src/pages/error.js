import '../css/error.css';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-icon">❌</div>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

export default ErrorPage;
