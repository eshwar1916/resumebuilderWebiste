import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specializations: '',
    projects: '',
    hobbies: '',
    summary: '',
  });

  // State for handling skills
  const [skills, setSkills] = useState([]); 
  const [currentSkill, setCurrentSkill] = useState('');

  // State for handling education entries
  const [educationList, setEducationList] = useState([{ education: '', percentage: '' }]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSkillInput = (e) => {
    setCurrentSkill(e.target.value);
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter' && currentSkill.trim() !== '') {
      e.preventDefault();
      setSkills((prevSkills) => [...prevSkills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setSkills((prevSkills) => prevSkills.filter(skill => skill !== skillToRemove));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducationList = [...educationList];
    updatedEducationList[index][name] = value;
    setEducationList(updatedEducationList);
  };

  const handleAddEducation = () => {
    setEducationList([...educationList, { education: '', percentage: '' }]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducationList = educationList.filter((_, eduIndex) => eduIndex !== index);
    setEducationList(updatedEducationList);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specializations: '',
      projects: '',
      hobbies: '',
      summary: '',
    });
    setSkills([]);
    setEducationList([{ education: '', percentage: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/resume-templates', { state: { ...formData, skills, educationList } });
  };

  const imageContainerStyle = {
    width: '32%',
    height: '40rem', 
    display: windowWidth >= 800 ? 'block' : 'none',
    backgroundImage: 'url(/assets/developers-gif-showcase.gif)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  };

  return (
    <><div className="beside">
      <div className="resume-builder">
        <div className="form-container">
          <h1>Build Your Resume</h1>
          <form className="scrolllist content-height" >
            <div className="form-row">
              <div className="form-column">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required />
              </div>
              <div className="form-column">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-column">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required />
              </div>
              <div className="form-column">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required />
              </div>
            </div>

            {/* Skills input */}
            <div className="form-row">
              <label>Skills</label>
              <textarea
                name="skills"
                value={currentSkill}
                onChange={handleSkillInput}
                onKeyDown={handleSkillKeyPress}
                placeholder="Type a skill and press Enter"
                required />
              <div className="skills-display">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-badge" onClick={() => handleSkillRemove(skill)}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="form-row">
              <label>Education</label>
              {educationList.map((edu, index) => (
                <div key={index} className="form-row education-row">
                  <input
                    type="text"
                    name="education"
                    value={edu.education}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="Education (e.g., B.Sc Computer Science)"
                    required
                  />
                  <input
                    type="text"
                    name="percentage"
                    value={edu.percentage}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="Percentage/Grade"
                    required
                  />
                  {educationList.length > 1 && (
                    <button type="button" onClick={() => handleRemoveEducation(index)}>
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" style={{backgroundcolor: '#930000b0', height: '5rem',}} onClick={handleAddEducation}>Add Education</button>
            </div>

            <div className="form-row">
              <div className="form-column">
                <label>Specializations</label>
                <textarea
                  name="specializations"
                  value={formData.specializations}
                  onChange={handleInputChange}
                  required />
              </div>
              <div className="form-column">
                <label>Projects</label>
                <textarea
                  name="projects"
                  value={formData.projects}
                  onChange={handleInputChange}
                  required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-column">
                <label>Hobbies</label>
                <textarea
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleInputChange}
                  required />
              </div>
              <div className="form-column">
                <label>Summary</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  required />
              </div>
            </div>

          </form>
            <div className="form-buttons">
              <button type="submit" onClick={handleSubmit}>Submit</button>
              <button type="button" onClick={handleReset}>Reset</button>
              <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </div>
        </div>
      </div>
      <div style={imageContainerStyle}></div>
    </div></>
  );
};

export default ResumeBuilder;
