import React, { useState } from "react";
import '../styles/topBar.css'
import { useNavigate } from "react-router-dom";
// import logo from '../assets/logo.png';

const TopBar = () => {
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
    const [activeItem, setActiveItem] = useState(0);
    const navigate = useNavigate();
    const navbarItems = [
        {
            name: 'Home',
            path: '/'
        },
    ]

    const onNavbarToggleClicked = () => {
        setIsNavbarCollapsed(!isNavbarCollapsed);
    }

    const handleNavbarItemClick = (index: number, path: string) => {
        setActiveItem(index);
        navigate(path);
    }


    return (
        <nav className="navbar fixed-top navbar-expand-lg">
            <div className="container-fluid">
            <a className="navbar-brand" href="#">
                {/* <img src={logo} style={{height: '60px'}}></img> */}
            </a>
            <button 
            className={isNavbarCollapsed ? "navbar-toggler collapsed" : "btn-close"} 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent" 
            aria-controls="navbarContent" 
            aria-expanded="false" 
            aria-label={isNavbarCollapsed ? "Toggle navigation" : "Close"}
            onClick={onNavbarToggleClicked}
            >
                {isNavbarCollapsed && <span className="navbar-toggler-icon"></span>}
            </button>
            <div className="navbar-collapse collapse justify-content-end" id="navbarContent">
                <div className="navbar-nav">
                    {navbarItems.map((item, index) => (
                        <a 
                        key={index} 
                        className={`nav-item ${activeItem === index ? "active" : ""}`} 
                        href={item.path} 
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavbarItemClick(index, item.path)}}>
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
            </div>
        </nav>
    );
}

export default TopBar;