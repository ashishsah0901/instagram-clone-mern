import React from "react";
import "./header.css";
import { auth } from "../../firebase";
import { signOut } from "@firebase/auth";
import { Button } from "@mui/material";

const Header = (props) => {
    const { user, setOpen, setOpenLogin } = props;
    return (
        <div className="header">
            <img
                className="header_logo"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
            />
            {user ? (
                <Button onClick={() => signOut(auth)}>Logout</Button>
            ) : (
                <div className="app_login">
                    <Button onClick={() => setOpen(true)}>Sign up</Button>
                    <Button
                        onClick={() => {
                            setOpenLogin(true);
                            setOpen(true);
                        }}
                    >
                        Sign in
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Header;
