import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
// import Loading from "../components/loading";
import { IoHome } from "react-icons/io5";
function SignupForm() {
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [gender, setGender] = useState("");
  // const [otp, setOtp] = useState("");
  // const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  const changephotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(); // object is
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result); //reader.
      setPhoto(file);
    };
  };

  // const handleSendOtp = async (e) => {
  //   e.preventDefault();
  //   setLoadingSend(true);

  //   if (!email || !mobile || !role || !education || !photo) {
  //     toast.error("Fill All Fields");
  //     setLoadingSend(false);
  //     return;
  //   }

  //   const form_data = new FormData();
  //   form_data.append("email", email);
  //   form_data.append("context","register");

  //   try {
  //     const { data } = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/user/forgot-password`,
  //       form_data,
  //       {
  //         withCredentials: true,
  //         header: {
  //           "Content-Type": "multipart/form-data",
  //         },

  //       }
  //     );
  //     toast.success("OTP Send to your Email");
  //     setLoadingSend(false);
  //     document.getElementById("my_modal_3").showModal();
  //     // setDisabled(false);
  //   } catch (error) {
  //     const message = error?.response?.data?.message;
  //     if (message) {
  //       //console.log(error);
  //       //console.log(message);
  //       toast.error("Error : " + message);
  //     }
  //     setLoadingSend(false);
  //   }
  // };

  // const handleVerify = async (e) => {
  //   e.preventDefault();
  //   setLoadingVerify(true);

  //   const form_data = new FormData();
  //   form_data.append("email", email);
  //   form_data.append("otp", otp);
  //   form_data.append("context","register");

  //   try {
  //     const { data } = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/user/verifyotp`,
  //       form_data,
  //       {
  //         header: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     // toast.success("Validate Succesfully");
  //     await handleSubmit();
  //     setLoadingVerify(false);
  //     setOtp("");
  //     // setDisabled(true);
  //     // setShow(true);
  //   } catch (error) {
  //     setLoadingVerify(false);
  //     const message = error?.response?.data.message;
  //     toast.error(message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("cpassword", password);
    formData.append("phone", mobile);
    formData.append("gender", gender);
    // formData.append("education", education);
    formData.append("photo", photo);

    setLoadingSend(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        formData, //sending form data to /signup endpoint
        {
          withCredentials: true, // This option allows sending cookies and other credentials (like authorization tokens) along with the request.
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Sign Up Successfull");
      // console.log(data.create_user);
      // setProfile(data.create_user);
      // setLoadingSend(false);
      localStorage.setItem("user", "loggedIn");
      navigateTo("/");
      setTimeout(() => {
        window.location.pathname = "/";
      }, 1500);
    } catch (error) {
      const err = error?.response?.data?.message;
      if (err) {
        toast.error(err + "!");
      } else {
        toast.error("sign in error");
      }
      setLoadingSend(false);
    }
  };

  return (
    <div className="flex text-gray-700 flex-col relative items-center justify-center min-h-screen bg-slate-100">
      <Link
        to={"/"}
        className=" absolute top-4 left-4 px-2 md:px-10 flex items-center space-x-1"
      >
        <IoHome />
        <span>Home</span>
      </Link>

      <h1 className="text-4xl font-bold  mb-4">
        Found<span className="text-blue-600">Hub</span>
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl text-center font-semibold mb-1">
          Create a new account
        </h2>
        <p className="text-gray-600 text-center mb-4">It's quick and easy.</p>
        <form onSubmit={handleSubmit}>
          {/* <div className="flex gap-2 mb-3 justify-between">
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-2 focus:bg-slate-100 border border-gray-300 rounded-md w-1/2"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <select
              name="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="p-2 border focus:bg-slate-100 border-gray-300 rounded-md w-1/2"
            >
              <option value="">Your Education</option>
              <option value="bca">BCA</option>
              <option value="bsc">B.Sc.</option>
              <option value="ba">BA</option>
              <option value="mca">MCA</option>
              <option value="ma">MA</option>
              <option value="msc">M.Sc.</option>
            </select>
          </div> */}
          {/* <div className="flex  items-center ">
            <div className="w-14 h-14 rounded-full flex justify-center items-center overflow-hidden photo">
              {
                <img
                  className={`${
                    imagePreview ? "block" : "hidden"
                  } object-cover  object-center w-full h-full`}
                  src={imagePreview ? `${imagePreview}` : "Image Preview"}
                  alt="Img"
                />
              }
            </div>

            <div className="w-4/5">
              <input
                type="file"
                className="file-input w-full p-2 px-4 focus:bg-slate-100"
                onChange={changephotoHandler}
              />
            </div>
          </div> */}

          <div className="flex w-full mb-2 max-w-md border border-gray-300 rounded">
            <input
              type="text"
              name={name}
              placeholder="Your Full Name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 focus:outline-none focus:bg-slate-100"
            />
          </div>

          <div className="flex w-full mb-2 max-w-md border border-gray-300 rounded">
            <div className="flex items-center px-4 border-r border-gray-300 bg-gray-100 text-gray-700 font-medium">
              +91
            </div>
            <input
              type="text"
              name="mobile"
              placeholder="Phone Number *"
              inputMode="numeric"
              maxLength="11"
              value={mobile}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");
                if (val.length > 10) val = val.slice(0, 10);
                if (val.length > 5) val = val.slice(0, 5) + " " + val.slice(5);
                setMobile(val);
              }}
              className="w-full p-2 focus:outline-none focus:bg-slate-100"
              required
            />
          </div>

          <div className="flex w-full mb-2 max-w-md border border-gray-300 rounded">
            <input
              type="text"
              name={email}
              autoComplete="off"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 focus:outline-none focus:bg-slate-100"
            />
          </div>

          <div className="flex w-full mb-2 max-w-md border border-gray-300 rounded">
            <input
              type="password"
              name={password}
              autoComplete="off"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 focus:outline-none focus:bg-slate-100"
            />
          </div>

          <div className="flex gap-4 items-center">
            <label>Gender : </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                required
                className="radio radio-xs radio-primary"
              />
              Male
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                required
                className="radio radio-xs radio-primary"
              />
              Female
            </label>
          </div>

          {/* <div className="flex w-full mb-2 max-w-md border border-gray-300 rounded">
            <input
              type="password"
              name={cpassword}
              autoComplete="off"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              required
              className="w-full p-2 focus:outline-none focus:bg-slate-100"
            />
          </div> */}

          <button
            disabled={loadingSend}
            type="submit"
            className="w-full bg-green-600 mt-2 text-white py-2 rounded-md font-semibold hover:bg-green-700"
          >
            {!loadingSend ? (
              "SignUp"
            ) : (
              <div className="flex justify-center items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.28.805 4.373 2.143 6.027l1.857-1.736z"
                  ></path>
                </svg>
                <span>Registering...</span>
              </div>
            )}
          </button>
          <p className="text-center mt-4">
            Already registered?{" "}
            <Link to={"/login"} className="text-blue-600 hover:underline">
              Login Now
            </Link>
          </p>
        </form>
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        open modal
      </button> */}
    </div>
  );
}

export default SignupForm;
