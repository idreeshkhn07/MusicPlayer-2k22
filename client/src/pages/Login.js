import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";
// const url = ""

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const login = async () => {
    try {
      dispatch(ShowLoading())
      const response = await axios.post("/api/users/login", user);
      dispatch(HideLoading())
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
      dispatch(HideLoading())
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-3 w-96 p-5 shadow border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800"> Welcome back </h1>
        <hr />
        <input
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className= "primary" onClick={login}>
          Login
        </button>
        <Link to="/register" className="text-gray-600">
          Not Register? Click here! 
        </Link>
      </div>
    </div>
  );
}

export default Login;
