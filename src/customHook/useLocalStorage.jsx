import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useUserIdFromLocalStorage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const userInfoString = localStorage.getItem("user_info");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  if (userInfo && userInfo.user && userInfo.user._id) {
    setUserId(userInfo.user._id);
  } else {
    navigate("/login");
  }

  return userId;
}

export default useUserIdFromLocalStorage;
