import "./styles/layout.css";
import "./styles/ElementStyle.css";
import "./styles/animation.css";
import Header from "./components/Header";
import CarList from "./components/CarList";
import CarInfo from "./components/CarInfo";
import User from "./components/User";
import Footer from "./components/Footer";
import ErrorMessage from "./components/ErrorMessage";
import { useState } from "react";
import { useReducer } from "react";
import postReducer from "./reducer/car-reducer";
import CarFormReducer from "./reducer/car-form-reducer";
import { useEffect } from "react";
import { CarReducerConstant } from "./constants/car-reducer-constant";
import CarFormConstant from "./constants/car-form-constant";
import { fetchCurrentSession } from "./controller/user-controller";
import { fetchPost } from "./controller/car-controller";

function App() {
  const [userInfo, setUserinfo] = useState({});
  const [postInfo, dispatchPostInfo] = useReducer(postReducer, []);
  const [postFormInfo, dispatchPostFormInfo] = useReducer(CarFormReducer, {
    state: CarFormConstant.CREATE,
    formInfo: {
      title: "",
      content: "",
      cover: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchCurrentSession().then((res) => {
      setUserinfo(res);
    });
  }, []);

  useEffect(() => {
    
    dispatchPostFormInfo({
      type: CarFormConstant.CLEAR,
    });
    fetchPost().then((res) => {
      const action = {
        type: CarReducerConstant.GET_POST,
        payload: res,
      };
      dispatchPostInfo(action);
    });
  }, [userInfo]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchPost().then((res) => {
        const action = {
          type: CarReducerConstant.GET_POST,
          payload: res,
        };
        dispatchPostInfo(action);
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <ErrorMessage errorMessage={errorMessage} />
      <CarList
        userInfo={userInfo}
        postInfo={postInfo}
        dispatchPostInfo={dispatchPostInfo}
        dispatchPostFormInfo={dispatchPostFormInfo}
        setErrorMessage={setErrorMessage}
      />
      {userInfo?.userId && (
        <CarInfo
          postFormInfo={postFormInfo}
          dispatchPostFormInfo={dispatchPostFormInfo}
          dispatchPostInfo={dispatchPostInfo}
          setErrorMessage={setErrorMessage}
        />
      )}
      <User
        userInfo={userInfo}
        setUserinfo={setUserinfo}
        setErrorMessage={setErrorMessage}
      />
      <Footer />
    </div>
  );
}

export default App;
