const Login = () => {
  // const navigate = useNavigate();

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

      </div>
    </div>
  );
};

export default Login;
