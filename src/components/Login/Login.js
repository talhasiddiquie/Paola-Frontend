import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import InstagramLogin from "react-instagram-login";

const GoogleBtn = (props) => (
  <button className="social-btn google" {...props}>
    <span>G</span> <p>Login with Google</p>
  </button>
);

const FacebookBtn = (props) => (
  <button className="social-btn facebook" {...props}>
    <span>f</span> <p>Login with Facebook</p>
  </button>
);

const Login = () => {
  return (
    <div className="modal-login">
      <p className="modal-header">
        <AccountCircleIcon />
        Login
        {/* {paypalActive ? (
          <IconButton
            className="modal-back-icon"
            size="large"
            // onClick={() => setPaypalActive(false)}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        ) : null} */}
      </p>

      <div className="modal-login-buttons">
        <GoogleLogin
          render={(renderProps) => (
            <GoogleBtn
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            />
          )}
          buttonText="Login with Google"
          clientId="41469262574-ampn849nr350ubpk1th3a5telqhvtbkc.apps.googleusercontent.com"
          // onSuccess={responseGoogle}
          // onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin
          render={(renderProps) => (
            <FacebookBtn
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            />
          )}
          appId="1088597931155576"
          autoLoad={true}
          fields="name,email,picture"
          // onClick={componentClicked}
          // callback={responseFacebook}
        />
        {/* <InstagramLogin
          clientId="5fd2f11482844c5eba963747a5f34556"
          buttonText="Login with Instagram"
          // onSuccess={responseInstagram}
          // onFailure={responseInstagram}
        /> */}
      </div>
    </div>
  );
};

export default Login;
