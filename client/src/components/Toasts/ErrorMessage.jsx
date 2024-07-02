import "./errormessage.css";
function ErrorMessage() {
  return (
    <div className="notifications-container">
      <div className="error-alert">
        <div className="flex">
          <div className="error-prompt-container">
            <p className="error-prompt-heading">Something is wrong (:</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
