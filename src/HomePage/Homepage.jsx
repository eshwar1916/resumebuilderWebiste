import React, { useState } from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaFileAlt, FaInfoCircle, FaDownload } from 'react-icons/fa'; // Import icons
import ReactParticles from '../Reactparticle';
function HomePage() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
            navigate('/build-resume');
        
    };

    return (
        <><ReactParticles /><div className="homepage">
            {/* Header Section */}
            <header>
                <nav>
                    <div className="logo">Resume Craft</div>
                    <div className={`menu ${menuOpen ? 'active' : ''}`}>
                        <a href="#import-linkedin" className="menu-item">
                            <FaLinkedin /> Import from LinkedIn
                        </a>
                        <a href="#view-templates" className="menu-item">
                            <FaFileAlt /> View Templates
                        </a>
                        <a href="#about-us" className="menu-item">
                            <FaInfoCircle /> About Us
                        </a>
                        <a href="#downloaded-files" className="menu-item">
                            <FaDownload /> Downloaded Files
                        </a>
                    </div>
                    <div className="menu-icon" onClick={toggleMenu}>
                        &#9776;
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="hero" id="home">
                <div className="hero-content">
                    <div className="content-box">
                        <h1>Craft Your Dream Career</h1>
                        <p>A simplified way to build a professional resume and prepare for your future.</p>
                        <a href="#build" className="cta-btn" onClick={handleSubmit}>BUILD YOUR RESUME</a>
                    </div>
                </div>
            </section>
        </div></>
    );
}

export default HomePage;
