import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/user/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  async function logout() {
    await fetch('http://localhost:4000/user/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    navigate("/");

  }

  const username = userInfo?.username;


  return (
    <header>
      <Link to="/" className='logo'>MyBlog</Link>
      <nav>
        {username && (
          <>
            <span>Hello, {username}</span>
            <Link to='/create' >Create new post</Link>
            <button type='submit' onClick={logout}>Logout</button>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

      </nav>
    </header>
  );
}