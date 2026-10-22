//displays error message
function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>Error</h3>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
