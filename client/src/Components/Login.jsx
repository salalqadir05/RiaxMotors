import React, { useState } from 'react';
import styled from "styled-components";
import secondlogo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { loginUserRoute } from '../utlis';  // Ensure this is the correct path to your login API route

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""  // Ensure lowercase "password" to match API requirements
  });

  const toastOptions = {
    position: "bottom-left",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Validate form fields before submission
  const validateForm = () => {
    const { username, password } = credentials;

    if (username === "") {
      toast.error("Username is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const { username, password } = credentials;

        // Hard-coded login check for the example
        if (username === "hassam" && password === "pass1234") {
          navigate("/registerbike");
        } else {
          toast.error("Your username or password is incorrect", toastOptions);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again later.", toastOptions);
      }
    }
  };

  return (
    <>
      <Container>
        <div className="content">
          <img src={secondlogo} alt="logo" />
          <h3>Riaz Motors Portal</h3>
          <div className="l-form">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__div">
                <input 
                  type="text" 
                  className="form__input" 
                  name="username" 
                  onChange={handleChange} 
                  autoComplete="username" 
                  placeholder=" " 
                />
                <label htmlFor="username" className="form__label">Username</label>
              </div>

              <div className="form__div">
                <input 
                  type="password" 
                  className="form__input" 
                  name="password"  
                  onChange={handleChange} 
                  autoComplete="current-password" 
                  placeholder=" " 
                />
                <label htmlFor="password" className="form__label">Password</label>
              </div>

              <button className="btn" type="submit">Log In</button>
            </form>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;

  .content {
    width: 90%;
    max-width: 500px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    padding-bottom: 45px;
    text-align: center;
  }

  img {
    width: 100px;
    margin-bottom: 20px;
  }

  h3 {
    color: blue;
    margin-bottom: 20px;
  }

  .form {
    width: 100%;
  }

  .form__div {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .form__input {
    width: 84%;
    padding: 1rem;
    border: 2px solid blue;
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
    background: none;
    transition: border-color 0.3s;
  }

  .form__input:focus {
    border-color: darkblue;
  }

  .form__label {
    position: absolute;
    left: 2.5rem;
    top: 1rem;
    color: blue;
    transition: 0.3s;
    background-color: #fff;
    padding: 0 5px;
    pointer-events: none;
  }

  .form__input:not(:placeholder-shown).form__input:not(:focus) + .form__label,
  .form__input:focus + .form__label {
    top: -0.75rem;
    left: 3rem;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .btn {
    width: 85%;
    padding: 15px;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }

  .btn:hover {
    background-color: darkblue;
  }
  
  @media (max-width: 768px) {
    .content {
      width: 100%;
      padding: 15px;
    }

    img {
      width: 80px;
    }

    h3 {
      font-size: 1.5rem;
    }

    .form__input {
      font-size: 0.9rem;
    }

    .btn {
      font-size: 0.9rem;
    }
  }
`;

export default Login;
