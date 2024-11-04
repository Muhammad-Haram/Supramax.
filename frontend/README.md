            <nav className={`mega-menu-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="menu-header">
                    <a href="#" className="logo">LB.</a>
                    <div className="icons" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? "close" : "open"}
                    </div>
                </div>

                <ul>
                    <li>
                        <a className="menu-title" href="#">Home</a>
                    </li>
                    <li className="has-submenu">
                        <a className="menu-title" href="#">Products</a>
                        <div className="submenu-container">
                            <div className="submenu">
                                <div className="col-3">
                                    {/* Laptop Submenu */}
                                    <div className="submenu-column">
                                        <h4>Laptop</h4>
                                        <img src="images/laptop.jpg" alt="Laptop" />
                                        <ul>
                                            <li><a href="#">Dell XPS 13</a></li>
                                            <li><a href="#">Apple MacBook Air</a></li>
                                            <li><a href="#">ASUS ZenBook UX425</a></li>
                                        </ul>
                                    </div>
                                    {/* Camera Submenu */}
                                    <div className="submenu-column">
                                        <h4>Camera</h4>
                                        <img src="images/camera.jpg" alt="Camera" />
                                        <ul>
                                            <li><a href="#">Sony Alpha a7 III</a></li>
                                            <li><a href="#">Canon EOS R6</a></li>
                                            <li><a href="#">Nikon Z6 II</a></li>
                                        </ul>
                                    </div>
                                    {/* Audio Equipment Submenu */}
                                    <div className="submenu-column">
                                        <h4>Audio Equipments</h4>
                                        <img src="images/audio.jpg" alt="Audio Equipments" />
                                        <ul>
                                            <li><a href="#">Bose QuietComfort 35 II Wireless Headphones</a></li>
                                            <li><a href="#">Audio-Technica ATH-M50x</a></li>
                                            <li><a href="#">Rode VideoMic Pro+</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="has-submenu">
                        <a className="menu-title" href="#">Services</a>
                        <div className="submenu-container">
                            <div className="submenu grid">
                                <ServiceLink title="Consulting" />
                                <ServiceLink title="App Design" />
                                <ServiceLink title="Security" />
                                <ServiceLink title="Data Storage" />
                                <ServiceLink title="Web Development" />
                                <ServiceLink title="SEO" />
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>