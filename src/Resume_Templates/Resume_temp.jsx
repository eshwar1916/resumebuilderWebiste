import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import './Resume_temp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileWord, faFileAlt, faEye } from '@fortawesome/free-regular-svg-icons';

const ResumeTemplates = () => {
    const location = useLocation();
    const formData = location.state || {}; // Access form data passed from ResumeBuilder  
    const [dialogVisible, setDialogVisible] = useState(false);
    const [viewVisible, setViewVisible] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const handleDownloadClick = (template) => {
        setSelectedTemplate(template);
        setDialogVisible(true);
    };

    const handleViewClick = (template) => {
        setSelectedTemplate(template);
        setViewVisible(true);
    };

    const handleDownload = (format) => {
        const template = document.querySelector('.active-template'); // get the current active template
        if (format === 'pdf') {
            // PDF download logic
            html2pdf().from(template).save();
        }
        else if (format === 'word') {
            // Word download logic using docx
            const doc = new Document();

            doc.addSection({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun(`${formData.firstName} ${formData.lastName}`),
                            new TextRun({
                                text: '\n',
                                break: 1,
                            }),
                            new TextRun('Job Title: ' + (formData.specializations || 'Job Title')),
                            new TextRun({
                                text: '\n',
                                break: 1,
                            }),
                            new TextRun('Email: ' + (formData.email || 'example@mail.com')),
                            new TextRun({
                                text: '\n',
                                break: 1,
                            }),
                            new TextRun('Phone: ' + (formData.phone || '123-456-7890')),
                            new TextRun({
                                text: '\n',
                                break: 1,
                            }),
                            new TextRun('Location: ' + (formData.location || 'City, Country')),
                        ],
                    }),
                ],
            });

            Packer.toBlob(doc).then((blob) => {
                saveAs(blob, 'resume.docx');
            });
        } else if (format === 'gdoc') {
            // Google Docs (open a blank template in Google Docs)
            window.open('https://docs.google.com/document/create', '_blank');
        }
    };

    return (
        <div className="resume-container">
            <div className="template-wrapper">
                <div className="template-container scrolllist content-height">
                    <div className="template1">
                        <section className="resume-card modern-template">
                            <h2>{formData.firstName} {formData.lastName}</h2>
                            <div className="left-sidebar">
                                <img src="profile-placeholder.jpg" alt="Profile" className="profile-pic" />
                                <p>{formData.specializations || 'Job Title'}</p>
                                <div className="contact-info">
                                    <p>Email: {formData.email || 'example@mail.com'}</p>
                                    <p>Phone: {formData.phone || '123-456-7890'}</p>
                                    <p>Location: {formData.location || 'City, Country'}</p>
                                </div>
                            </div>

                            <div className="main-content">
                                <section>
                                    <h3>Work Experience</h3>
                                    <p>{formData.experience || 'Details of your work experience here.'}</p>
                                </section>
                                <section>
                                    <h3>Skills</h3>
                                    <ul>
                                        {formData.skills ? formData.skills.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        )) : <li>Skill 1</li>}
                                    </ul>
                                </section>
                                <section>
                                    <h3>Education</h3>
                                    <p>{formData.education || 'Details of your education here.'}</p>
                                </section>
                            </div>
                        </section>
                        <div className="hover-overlay">
                            <button onClick={() => handleDownloadClick('Template 1')}>Download</button>
                            {/* <button onClick={() => handleViewClick('Template 1')}>
                            <FontAwesomeIcon icon={faEye} /> View
                        </button> */}
                        </div>
                    </div>

                    {/* Template 2 */}
                    <div className="template2">
                        <section className="resume-card basic-template">
                            <div className="header">
                                <h2>{formData.firstName} {formData.lastName}</h2>
                                <p>{formData.specializations || 'Job Title'}</p>
                            </div>
                            <div className="main-content">
                                <section>
                                    <h3>Work Experience</h3>
                                    <p>{formData.experience || 'Details of your work experience here.'}</p>
                                </section>
                                <section>
                                    <h3>Skills</h3>
                                    <ul>
                                        {formData.skills ? formData.skills.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        )) : <li>Skill 1</li>}
                                    </ul>
                                </section>
                                <section>
                                    <h3>Education</h3>
                                    <p>{formData.education || 'Details of your education here.'}</p>
                                </section>
                            </div>
                        </section>
                        <div className="hover-overlay">
                            <button onClick={() => handleDownloadClick('Template 2')}>Download</button>
                            {/* <button onClick={() => handleViewClick('Template 2')}>
                            <FontAwesomeIcon icon={faEye} /> View
                        </button> */}
                        </div>
                    </div>

                    {/* Template 3 */}
                    <div className="template3">
                        <section className="resume-card skill-based-template">
                            <div className="header">
                                <h2>{formData.firstName} {formData.lastName}</h2>
                                <p>{formData.specializations || 'Job Title'}</p>
                            </div>
                            <div className="main-content">
                                <section>
                                    <h3>Skills</h3>
                                    <ul>
                                        {formData.skills ? formData.skills.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        )) : <li>Skill 1</li>}
                                    </ul>
                                </section>
                                <section>
                                    <h3>Work Experience</h3>
                                    <p>{formData.experience || 'Details of your work experience here.'}</p>
                                </section>
                                <section>
                                    <h3>Education</h3>
                                    <p>{formData.education || 'Details of your education here.'}</p>
                                </section>
                            </div>
                        </section>
                        <div className="hover-overlay">
                            <button onClick={() => handleDownloadClick('Template 3')}>Download</button>
                            {/* <button onClick={() => handleViewClick('Template 3')}>
                            <FontAwesomeIcon icon={faEye} /> View
                        </button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Dialog box for download options */}
            {dialogVisible && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <h3>Select Format</h3>
                        <button onClick={() => handleDownload('pdf')} aria-label="Download PDF">
                            <FontAwesomeIcon icon={faFilePdf} bounce style={{ color: "#b20606", marginRight: '5px' }} />
                            PDF
                        </button>
                        <button onClick={() => handleDownload('word')} aria-label="Download Word">
                            <FontAwesomeIcon icon={faFileWord} bounce style={{ color: "#0e76a8", marginRight: '5px' }} />
                            Word
                        </button>
                        <button onClick={() => handleDownload('gdoc')} aria-label="Download Google Docs">
                            <FontAwesomeIcon icon={faFileAlt} bounce style={{ color: "#db4437", marginRight: '5px' }} />
                            Docs
                        </button>
                        <button className="close-btn" onClick={() => setDialogVisible(false)}>Close</button>
                    </div>
                </div>
            )}

            {/* Dialog box for resume view */}
            {viewVisible && (
                <div className="dialog-overlay">
                    <div className="dialog-box resume-viewer">
                        <h3>Resume Preview</h3>
                        <div className="resume-preview">
                            {/* Increase font size of resume */}
                            <section className="resume-content">
                                <h2 style={{ fontSize: '1.5rem' }}>{formData.firstName} {formData.lastName}</h2>
                                <p style={{ fontSize: '1.2rem' }}>{formData.specializations || 'Job Title'}</p>
                                {/* Add rest of the resume content */}
                            </section>
                        </div>
                        <button className="close-btn" onClick={() => setViewVisible(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeTemplates;
