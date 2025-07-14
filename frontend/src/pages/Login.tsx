import { useNavigate } from 'react-router-dom';
import type { CredentialResponse } from '@react-oauth/google';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { environment } from '../environment'; 

const Login = () => {
  const navigate = useNavigate();

const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
  if (credentialResponse.credential) {
    localStorage.setItem('google_token', credentialResponse.credential);
    navigate('/dashboard');
  }
};

  const handleGoogleError = () => {
    alert('Google Login Failed');
  };

  return (
    <div className="bg-slate-900 h-screen flex items-center justify-center">
      <div className="card">
        <a className="login">Log in</a>
        <div className="inputBox">
          <input type="text" required />
          <span className="user">Username</span>
        </div>
        <div className="inputBox">
          <input type="password" required />
          <span>Password</span>
        </div>
        <button className="enter">Enter</button>
        <div className="mt-6 flex flex-col items-center">
          <GoogleOAuthProvider clientId={environment.googleClientId}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              width="100%"
              theme="filled_black"
              text="continue_with"
              shape="pill"
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
