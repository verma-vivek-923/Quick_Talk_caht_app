import React, { useState } from "react";
import { CloudSnow, Pencil } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import avatar_list from "../data/avatar_list";
import SaveChanges from "./SaveChanges";
import { toast } from "react-hot-toast";
import { LoadingCircle } from "../components/Loading";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const { profile, setProfile } = useAuth();
  const [preview, setPreview] = useState(profile?.image?.url);
  const { maleAvatars, femaleAvatars } = avatar_list();

  // //console.log(profile.name);
  // //console.log(profile.email);
  // //console.log(profile.phone);

  const selected_avatars =
    profile?.gender === "male" ? maleAvatars : femaleAvatars;

  // //console.log(selected_avatars);

  const [userData, setUserData] = useState({
    name: profile?.name,
    email: profile?.email,
    phone: profile?.phone,
    avatar_Id: profile?.image?.url || "",
  });

  const [editField, setEditField] = useState({
    name: false,
    email: false,
    phone: false,
    avatar: false,
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const toggleEdit = (field) => {
    //console.log("first");
    setEditField({ ...editField, [field]: !editField[field] });
  };

  //console.log(userData);

  const firstInitial = userData.name?.charAt(0)?.toUpperCase() || "U";
  const firstLastInitial =
    userData.name
      ?.trim()
      .split(" ")
      .slice(0, 2) // first two words (first + last name)
      .map((word) => word.charAt(0).toUpperCase())
      .join("") || "UN";

  const handleBlur = (field) => {
    toggleEdit(field); // Save on blur
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoadingSave(true);

    const updated = await SaveChanges(userData, profile._id);
    //console.log(updated);
    setProfile(updated?.updated_profile);
    toast.success("Changes Saved");
    setLoadingSave(false);
    // //console.log(updated);
  };

  const isChanged = () => {
    if (!profile) return false;

    return (
      userData.name !== profile?.name ||
      userData.email !== profile?.email ||
      userData.avatar_Id !== profile?.image?.url
      // add more fields if needed
    );
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/user/logout`);
      toast.success("Logout Successfull");
      setProfile("");
      navigateTo("/login");
      localStorage.removeItem("user");
      setLoading(false);
    } catch (error) {
      //console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="bg-gray-800 rounded-xl h-[100dvh] p-6 w-full max-w-md space-y-6 shadow-xl">
        <div className="dropdown dropdown-bottom md:dropdown-right flex items-center justify-between ">
          <div className="ring-2 ring-gray-500 ring-offset-2 ring-offset-base-100 bg-gray-600 h-24 w-24 rounded-full flex items-center overflow-hidden justify-center text-4xl text-gray-300">
            <img
              src={preview}
              alt=""
              className="w-full h-full object-cover object-center rounded-full"
            />
          </div>
          <button onClick={() => toggleEdit("avatar")}>
            <div
              tabIndex={0}
              role="button"
              className="ml-2 flex gap-2 items-center text-gray-400 hover:text-white"
            >
              <span>Change </span> <Pencil size={16} />
            </div>
          </button>

          {editField.avatar && (
            // <div className="dropdown">
            <div
              tabIndex={0}
              className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md"
            >
              <div className="card-body">
                {/* <p>This is a card. You can use any element as a dropdown.</p> */}

                {/* <div className="grid grid-cols-3 gap-4 mt-2">
                  {selected_avatars.map((avatar) => (
                    <img
                      key={avatar.id}
                      src={avatar.url}
                      alt={avatar.id}
                      onClick={() => {
                        toggleEdit("avatar");
                        setUserData({ ...userData, avatar_Id: avatar.id });
                        setPreview(avatar.url)
                        // updateProfile();
                      }}
                      className={`w-16 h-16 rounded-full cursor-pointer border-2 hover:border-blue-500 ${
                        userData.avatar_Id === avatar.id
                          ? "border-blue-400"
                          : ""
                      }`}
                    />
                  ))}
                </div> */}
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div
                    onClick={() => {
                      toggleEdit("avatar");
                      setUserData({ ...userData, avatar_Id: "name_first" });
                      setPreview(
                        `https://ui-avatars.com/api/?name=${firstInitial}&background=random&color=fff&bold=true$rounded=true`
                      ); // no image preview, use initials
                      // no image preview, use initials
                    }}
                    className={`w-16 h-16 rounded-full cursor-pointer border-2 flex items-center justify-center font-bold text-xl bg-blue-700 text-white hover:border-blue-500 ${
                      userData.avatar_Id === "initial1" ? "border-blue-400" : ""
                    }`}
                  >
                    {firstInitial}
                  </div>
                  <div
                    onClick={() => {
                      toggleEdit("avatar");
                      setUserData({ ...userData, avatar_Id: "n_first_last" });
                      setPreview(
                        `https://ui-avatars.com/api/?name=${firstLastInitial}&background=random&color=fff&bold=true`
                      );
                    }}
                    className={`w-16 h-16 rounded-full cursor-pointer border-2 flex items-center justify-center font-bold text-xl bg-green-700 text-white hover:border-blue-500 ${
                      userData.avatar_Id === "initial2" ? "border-blue-400" : ""
                    }`}
                  >
                    {firstLastInitial}
                  </div>

                  {selected_avatars.map((avatar) => (
                    <img
                      key={avatar.id}
                      src={avatar.url}
                      alt={avatar.id}
                      onClick={() => {
                        toggleEdit("avatar");
                        setUserData({ ...userData, avatar_Id: avatar.id });
                        setPreview(avatar.url);
                      }}
                      className={`w-16 h-16 rounded-full cursor-pointer border-2 hover:border-blue-500 ${
                        userData.avatar_Id === avatar.id
                          ? "border-blue-400"
                          : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            // </div>
          )}
        </div>

        {/* Name */}
        <div className="flex justify-between items-center">
          {editField.name ? (
            <input
              name="name"
              value={userData.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
              autoFocus
              className="bg-gray-700 text-white border-b-2 border-gray-500 focus:outline-none focus:border-blue-400 px-2 py-1 rounded w-full"
            />
          ) : (
            <h2 className="text-xl font-semibold">{userData.name}</h2>
          )}
          <button
            onClick={() => toggleEdit("name")}
            className="ml-2 text-gray-400 hover:text-white"
          >
            <Pencil size={16} />
          </button>
        </div>

        {/* email */}
        <div className="flex justify-between items-center">
          <div className="w-full">
            <p className="text-sm text-gray-400">Email</p>
            {editField.email ? (
              <input
                name="email"
                value={userData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                autoFocus
                className="bg-gray-700 text-white border-b-2 border-gray-500 focus:outline-none focus:border-blue-400 px-2 py-1 rounded w-full"
              />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>
          <button
            onClick={() => toggleEdit("email")}
            className="ml-2 text-gray-400 hover:text-white"
          >
            <Pencil size={16} />
          </button>
        </div>

        {/* Phone */}
        <div className="flex justify-between items-center">
          <div className="w-full">
            <p className="text-sm  text-gray-400">Phone number</p>
            {editField.phone ? (
              <input
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                onBlur={() => handleBlur("phone")}
                autoFocus
                className="bg-gray-700 text-white border-b-2 border-gray-500 focus:outline-none focus:border-blue-400 px-2 py-1 rounded w-full"
              />
            ) : (
              <p className="tracking-wider">+91 {userData.phone}</p>
            )}
          </div>
          <button
            onClick={() => toggleEdit("phone")}
            className="ml-2 text-gray-400 hover:text-white"
          >
            <Pencil size={16} />
          </button>
        </div>

        {/* Logout Button */}
        {isChanged() && (
          <button
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary/40 text-white py-2 px-4 rounded"
          >
            {!loadingSave ? (
              "Save Changes"
            ) : (
              <div className="flex justify-center items-center space-x-2">
                <LoadingCircle />
                <span>Saving...</span>
              </div>
            )}
          </button>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          {!loading ? (
            "Log out"
          ) : (
            <div className="flex justify-center items-center space-x-2">
              <LoadingCircle />
              <span>Loging out...</span>
            </div>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Chat history on this computer will be cleared when you log out.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
