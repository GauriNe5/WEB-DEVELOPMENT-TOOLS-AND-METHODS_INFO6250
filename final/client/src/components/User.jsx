import { useState } from "react";
import { UserConstant } from "../constants/user-constant.js";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../controller/user-controller.js";

function User({ userInfo, setUserinfo, setErrorMessage }) {
  const username = userInfo?.username;
  const [userDivState, setUserDivState] = useState(UserConstant.LOGIN);
  const [usernameInput, setUsernameInput] = useState("");

  /**
   * 
   * @param {Event} e 
   */
  function onLoginSubmit(e) {
    setErrorMessage(""); 
    e.preventDefault();
    userLogin({ username: e.target.username.value })
      .catch(({ error }) => {
        setErrorMessage(error);
        setUsernameInput("");
        return Promise.reject(error);
      })
      .then((res) => {
        setUserinfo(res);
        setUserDivState(UserConstant.WELCOMESTATE);
        setUsernameInput("");
      });
  }

  /**
   * 
   * @param {Event} e 
   */
  function onRegisterSubmit(e) {
    setErrorMessage(""); 
    e.preventDefault();
    userRegister({ username: e.target.username.value })
      .catch(({ error }) => {
        setErrorMessage(error);
        setUsernameInput("");
        return Promise.reject(error);
      })
      .then((res) => {
        setUserinfo(res);
        setUserDivState(UserConstant.WELCOMESTATE);
        setUsernameInput("");
      });
  }

  /**
   * @param {Event} e 
   */
  function onLogout(e) {
    setErrorMessage(""); 
    e.preventDefault();
    userLogout().then(() => {
      setUserinfo();
      setUserDivState(UserConstant.LOGIN);
    });
  }

  /**
 
   * @param {Event} e 
   */
  function onUsernameInputChange(e) {
    setUsernameInput(e.target.value);
  }

  /**
   
   * @param {Event} e Event Object
   */
  function onSwitchLogIn(e) {
    e.preventDefault();
    setErrorMessage("");
    setUserDivState(UserConstant.LOGIN);
  }

  /**
  
   * @param {Event} e Event object
   */
  function onSwitchRegister(e) {
    e.preventDefault();
    setErrorMessage("");
    setUserDivState(UserConstant.REGISTER);
  }

  const userDivPageSelectorForm = (
    <>
      <form className="user-page-selector">
        <button onClick={onSwitchLogIn}>Log In</button>
        <button onClick={onSwitchRegister}>Sign Up</button>
      </form>
    </>
  );

  const userLoginForm = (
    <>
      <form className="user-login" onSubmit={onLoginSubmit}>
        <h2 className="user-header">Log In</h2>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            placeholder="John"
            className="username-input"
            onChange={onUsernameInputChange}
            value={usernameInput}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );

  const userRegisterForm = (
    <>
      <form className="user-register" onSubmit={onRegisterSubmit}>
        <h2 className="user-header">Register a new account</h2>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            placeholder="John"
            className="username-input"
            onChange={onUsernameInputChange}
            value={usernameInput}
          />
        </label>
        <button type="submit">Sign up</button>
      </form>
    </>
  );

  const userWelcomeInfo = (
    <>
      <form className="user-info" onSubmit={onLogout}>
        <h2 className="user-header">Welcome {username}!</h2>
        <button type="submit">Signout</button>
      </form>
    </>
  );

  return (
    <div className="user-div">
      {userInfo?.username && userWelcomeInfo}
      {!userInfo?.username &&
        [UserConstant.LOGIN, UserConstant.REGISTER].includes(userDivState) &&
        userDivPageSelectorForm}
      {!userInfo?.username &&
        userDivState === UserConstant.LOGIN &&
        userLoginForm}
      {!userInfo?.username &&
        userDivState === UserConstant.REGISTER &&
        userRegisterForm}
    </div>
  );
}

export default User;
