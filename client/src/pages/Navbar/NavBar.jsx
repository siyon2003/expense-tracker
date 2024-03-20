import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../../redux/user/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("access_token");
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };
  return (
    <div className="navbar">
      <div className="title">EXPENSE TRACKER</div>
      <div className="links-profile">
        <div>
          <Link to={"/dashboard"}>
            <h3 className="l1">HOME</h3>
          </Link>
          <Link to={"/transaction"}>
            <h3 className="l2">ANALYTICS</h3>
          </Link>
        </div>
        <Tooltip title="Logout">
          <IconButton sx={{ marginLeft: "100px" }} onClick={handleLogout}>
            <LogoutIcon
              sx={{
                height: "35px",
                width: "35px",
                borderRadius: "10px",
                fill: "white",

                "&:hover": {
                  textShadow: "0 0 10px red",
                  fill: "red",
                  filter: "drop-shadow(0px 0px 10px red)",
                },
              }}
            ></LogoutIcon>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
export default NavBar;
