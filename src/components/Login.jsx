import { useContext, useEffect, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { StateContext } from "../context/state";

function LogIn() {
  const { isLogin, setIsLogIn } = useContext(StateContext);
  const navigate = useNavigate();
  const loginUrl = "http://127.0.0.1:8000/api/user/token/";
  const userprofileUrl = "http://127.0.0.1:8000/api/user/profile/";
  const [show, setShow] = useState();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [allProfiles, setAllProfiles] = useState([]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    fetch(userprofileUrl).then((res) =>
      res.json().then((data) => {
        setAllProfiles(data);
      })
    );
  }, [formData]);
  function handleLogin(e) {
    e.preventDefault();

    axios
      .post(loginUrl, {
        username: formData.username,
        password: formData.password,
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        const loggedInUserId = JSON.parse(localStorage.getItem("user")).id;

        if (response.status === 200) {
          isLogin.is_loggedin = true;
        }

        console.log(allProfiles);
        if (allProfiles.length === 0) {
          navigate("/profileupdate");
        } 
        else {
          allProfiles.forEach((element) => {
            if (Object.values(element).includes(loggedInUserId)) {
              console.log(element);
              console.log("user has profile");
              localStorage.setItem("userprofile", JSON.stringify(element));
              navigate("/booking");
            } else {
              console.log("no profile");
              navigate("/profileupdate");
            }
          });
        }
        
      });

    // console.log(isLogin.is_loggedIn);

    const errors = {};
    (formData.username === undefined || formData.username === "") &&
      (errors.username = "Please enter your username");
    (formData.password === undefined || formData.password === "") &&
      (errors.password = "Please enter your Password");

    setFormErrors(errors);
    console.log(errors);
    // console.log(formData);
  }

  return (
    <div className="text-xl bg-[url('assets/images/signin.png')] bg-no-repeat bg-contain bg-center h-[100vh]  ">
      <div className="text-center w-[50%] mx-auto">
        <h1 className="text-5xl font-bold mt-0 pt-36 pb-8">
          Log in to your account
        </h1>
        {/* <form action="" className="flex flex-col justify-center items-center"> */}
        <form action="" className="flex flex-col">
          <div className="flex flex-col gap-16">
            {formErrors.email && (
              <p className="text-red-500">{formErrors.email}</p>
            )}

            <input
              type="text"
              placeholder="Username"
              className="rounded-[5px] w-[80%] self-center py-6 px-6 border-2 border-gray-300 outline-none"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            {formErrors.password && (
              <p className="text-red-500">{formErrors.password}</p>
            )}
            <div className="text-left bg-red rounded-[5px] py-6 px-6 border-2 border-gray-300 flex w-[80%] self-center">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="w-[100%] outline-none"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <div onClick={() => setShow((prev) => !prev)}>
                {show ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </div>
            </div>
          </div>
          <div className="flex my-16 justify-between w-[80%] self-center">
            <div className="flex gap-4">
              <input type="checkbox" className="w-6 h-6" />
              <p>Remember me</p>
            </div>
            <div>
              <p>Forgot Your Password?</p>
            </div>
          </div>
          <button
            className="bg-[#318bd4] rounded-[5px] py-8 px-6 text-white text-2xl font-weight w-[80%] self-center"
            onClick={(e) => handleLogin(e)}
          >
            Sign in
          </button>
        </form>
        
        <p className="">
          Don't have an account yet?
          <Link to="/register">
            <span className="text-blue-400 cursor-pointer">Sign Up free</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
