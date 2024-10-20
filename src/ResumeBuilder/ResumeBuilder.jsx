import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projects: '',
    hobbies: '',
    summary: '',
  });

  const [skills, setSkills] = useState([]); 
  const [currentSkill, setCurrentSkill] = useState('');
  const [educationList, setEducationList] = useState([{ college: '', branch: '', cgpa: '' }]);
  const [experienceList, setExperienceList] = useState([{ company: '', domain: '', years: '' }]);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        return value.trim() ? '' : 'First name is required';
      case 'lastName':
        return value.trim() ? '' : 'Last name is required';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^\d+$/.test(value)) return 'Phone number must contain only digits';
        return '';
      case 'projects':
        return value.trim() ? '' : 'Projects field is required';
      case 'hobbies':
        return value.trim() ? '' : 'Hobbies field is required';
      case 'summary':
        return value.trim() ? '' : 'Summary field is required';
      default:
        return '';
    }
  };
  

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);
    return Object.keys(newErrors).every((error) => !error);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (touched[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleInputBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, formData[name]),
    }));
  };

  const handleInputKeyUp = (name) => {
    if (touched[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, formData[name]),
      }));
    }
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
    setEducationList([...educationList, { college: '', branch: '', cgpa: '' }]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducationList = educationList.filter((_, eduIndex) => eduIndex !== index);
    setEducationList(updatedEducationList);
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperienceList = [...experienceList];
    updatedExperienceList[index][name] = value;
    setExperienceList(updatedExperienceList);
  };

  const handleAddExperience = () => {
    setExperienceList([...experienceList, { company: '', domain: '', years: '' }]);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperienceList = experienceList.filter((_, expIndex) => expIndex !== index);
    setExperienceList(updatedExperienceList);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      projects: '',
      hobbies: '',
      summary: '',
    });
    setSkills([]);
    setEducationList([{ college: '', branch: '', cgpa: '' }]);
    setExperienceList([{ company: '', domain: '', years: '' }]);
    setErrors({});
    setTouched({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      const outputData = {
        ...formData,
        skills,
        educationList,
        experienceList,
      };
      console.log(JSON.stringify(outputData)); // Output JSON format to console
      navigate('/resume-templates', { state: outputData });
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

  const isFormValid = Object.keys(errors).every((error) => !error) && Object.values(formData).every(field => field.trim() !== '');

  return (
    <div className="beside">
      <div className="resume-builder">
        <div className={`form-container ${isFormVisible ? 'show' : ''}`}>
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
                  onBlur={() => handleInputBlur('firstName')}
                  onKeyUp={() => handleInputKeyUp('firstName')}
                  required />
                {errors.firstName && <p className="error">{errors.firstName}</p>}
              </div>
              <div className="form-column">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={() => handleInputBlur('lastName')}
                  onKeyUp={() => handleInputKeyUp('lastName')}
                  required />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
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
                  onBlur={() => handleInputBlur('email')}
                  onKeyUp={() => handleInputKeyUp('email')}
                  required />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="form-column">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={() => handleInputBlur('phone')}
                  onKeyUp={() => handleInputKeyUp('phone')}
                  required />
                {errors.phone && <p className="error">{errors.phone}</p>}
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
                    name="college"
                    value={edu.college}
                    onChange={(e) => handleEducationChange(index, e)}
                    onBlur={() => handleInputBlur(`education-${index}`)}
                    onKeyUp={() => handleInputKeyUp(`education-${index}`)}
                    placeholder="College Name"
                    required
                  />
                  <input
                    type="text"
                    name="branch"
                    value={edu.branch}
                    onChange={(e) => handleEducationChange(index, e)}
                    onBlur={() => handleInputBlur(`education-${index}`)}
                    onKeyUp={() => handleInputKeyUp(`education-${index}`)}
                    placeholder="Branch"
                    required
                  />
                  <input
                    type="text"
                    name="cgpa"
                    value={edu.cgpa}
                    onChange={(e) => handleEducationChange(index, e)}
                    onBlur={() => handleInputBlur(`education-${index}`)}
                    onKeyUp={() => handleInputKeyUp(`education-${index}`)}
                    placeholder="CGPA/Percentage"
                    required
                  />
                  {educationList.length > 1 && (
                    <button type="button" onClick={() => handleRemoveEducation(index)}>
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddEducation}
                style={{ display: 'block', margin: '1rem auto' }}>
                Add Education
              </button>
            </div>

            {/* Experience Section */}
            <div className="form-row">
              <label>Experience</label>
              {experienceList.map((exp, index) => (
                <div key={index} className="form-row experience-row">
                  <input
                    type="text"
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, e)}
                    onBlur={() => handleInputBlur(`experience-${index}`)}
                    onKeyUp={() => handleInputKeyUp(`experience-${index}`)}
                    placeholder="Company Name"
                    required
                  />
                  <input
                    type="text"
                    name="domain"
                    value={exp.domain}
                    onChange={(e) => handleExperienceChange(index, e)}
                    onBlur={() => handleInputBlur(`experience-${index}`)}
                    onKeyUp={() => handleInputKeyUp(`experience-${index}`)}
                    placeholder="Domain"
                    required
                  />
                  <input
                    type="text"
                    name="years"
                    value={exp.years}
                    onChange={(e) => handleExperienceChange(index, e)}
                    onBlur={() => handleInputBlur(`experience-${index}`)}
                    onKeyUp={() => handleInputKeyUp(`experience-${index}`)}
                    placeholder="Years of Experience"
                    required
                  />
                  {experienceList.length > 1 && (
                    <button type="button" onClick={() => handleRemoveExperience(index)}>
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddExperience}
                style={{ display: 'block', margin: '1rem auto' }}>
                Add Experience
              </button>
            </div>

            <div className="form-row">
              <div className="form-column">
                <label>Projects</label>
                <textarea
                  name="projects"
                  value={formData.projects}
                  onChange={handleInputChange}
                  onBlur={() => handleInputBlur('projects')}
                  onKeyUp={() => handleInputKeyUp('projects')}
                  required />
                {errors.projects && <p className="error">{errors.projects}</p>}
              </div>
              <div className="form-column">
                <label>Hobbies</label>
                <textarea
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleInputChange}
                  onBlur={() => handleInputBlur('hobbies')}
                  onKeyUp={() => handleInputKeyUp('hobbies')}
                  required />
                {errors.hobbies && <p className="error">{errors.hobbies}</p>}
              </div>
            </div>

            <div className="form-row">
              <label>Summary</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur('summary')}
                onKeyUp={() => handleInputKeyUp('summary')}
                required />
              {errors.summary && <p className="error">{errors.summary}</p>}
            </div>

            <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="submit" onClick={handleSubmit} >Generate Resume</button>
              <button type="button" onClick={handleReset}>Reset</button>
            </div>
          </form>
        </div>
        <div className="image-container" style={imageContainerStyle}></div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
