import React, { useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import * as bootstrap from "bootstrap";
import Headers from "../Headers";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import DownloadTemplate from '../DownloadTemplate';
import { getAllSubjects } from "../../utils/authApi";

// Import images
import add from "../../assets/assets/icon/add.png";

const Curriculum = () => {
  // State for form fields
  const [department, setDepartment] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch subjects when component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await getAllSubjects();
        if (response.status) {
          setSubjects(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("Failed to fetch subjects");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);
  const [searchTeacher, setSearchTeacher] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  // Grade mapping / assessments state
  const [assessments, setAssessments] = useState([
    { id: Date.now(), name: "", type: "", scheme: "", weight: "" }
  ]);

  // Helper to add/remove assessments
  const addAssessment = () => {
    setAssessments(prev => [...prev, { id: Date.now() + Math.random(), name: "", type: "", scheme: "", weight: "" }]);
  };

  
  const removeAssessment = (id) => {
    setAssessments(prev => prev.filter(a => a.id !== id));
  };

  const updateAssessment = (id, field, value) => {
    setAssessments(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  // Add subject/department/year handlers
  const handleSelectDepartment = (e) => {
    const val = e.target.value;
    if (val && !selectedDepartments.includes(val)) {
      setSelectedDepartments(prev => [...prev, val]);
    }
    e.target.value = "";
  };

  const handleSelectSubject = (e) => {
    const val = e.target.value;
    if (val && !selectedSubjects.includes(val)) {
      setSelectedSubjects(prev => [...prev, val]);
    }
    e.target.value = "";
  };

  const handleSelectYear = (e) => {
    const val = e.target.value;
    if (val && !selectedYears.includes(val)) {
      setSelectedYears(prev => [...prev, val]);
    }
    e.target.value = "";
  };

  // Add new subject from form
  const handleAddNewSubject = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (!selectedSubjects.includes(trimmed)) {
      setSelectedSubjects(prev => [...prev, trimmed]);
    }
    // reset form fields
    setDepartment("");
    setCode("");
    setName("");
  };

  // Teacher add on Enter
  const handleTeacherKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = searchTeacher.trim();
      if (!val) return;
      const id = Date.now() + Math.floor(Math.random() * 1000);
      const newTeacher = { id, name: val, avatar: 'https://www.bootdey.com/img/Content/avatar/avatar3.png' };
      setSelectedTeachers(prev => [...prev, newTeacher]);
      setSearchTeacher("");
    }
  };

  // Handler for showing download template modal

  // Handler for showing download template modal
  const handleShowDownloadModal = () => {
    const modalElement = document.getElementById("download");
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  };

  // Handler for removing selected items (departments, subjects, years)
  const handleRemoveItem = (item, type) => {
    switch(type) {
      case 'department':
        setSelectedDepartments(prev => prev.filter(dep => dep !== item));
        break;
      case 'subject':
        setSelectedSubjects(prev => prev.filter(sub => sub !== item));
        break;
      case 'year':
        setSelectedYears(prev => prev.filter(year => year !== item));
        break;
      case 'teacher':
        setSelectedTeachers(prev => prev.filter(teacher => teacher.id !== item));
        break;
    }
  };

  return (
    <>
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />
        <div className="dashboard-page-one">
          <Sidebar />
          <div className="dashboard-content-one">
            {/* Breadcrumbs Area */}
            <div className="breadcrumbs-area d-flex justify-content-between">
              <h3>Add Curriculum Mapping</h3>
              <div>
                <button className="btn btn-purple modal-trigger" onClick={handleShowDownloadModal}>
                  <i className="fas fa-download" /> Template
                </button>
                <button className="btn btn-purple modal-trigger mb-0" data-bs-toggle="modal" data-bs-target="#upload">
                  <i className="fas fa-upload" /> Upload
                </button>
                <button className="btn btn-purple text-white">
                  <i className="fas fa-plus" /> Add New
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="card height-auto">
              <div className="card-body">
                <div className="row main-mapping-container justify-content-between">
                  {/* New Subject Form */}

                  {/* New Subject Form */}
                  <div className="col-lg-4 col-md-12 new-subject-container-row px-4">
                    <p className="subject-title">Subjects</p>
                    <div className="col-lg-12 px-0">
                      <label className="form-label">Department</label>
                      <input
                        type="text"
                        className="form-control"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-4">
                        <label className="form-label">Code</label>
                        <input
                          type="text"
                          className="form-control"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-8">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-12 text-end">
                        <button type="button" className="btn btn-sm btn-success" onClick={handleAddNewSubject}>Add Subject</button>
                      </div>
                    </div>
                  </div>

                  {/* Curriculum Mapping Section */}
                  <div className="col-lg-12 section curriculum-mapping-new mt-4">
                    {/* Department, Subject, and Year Selection */}
                    <div className="row mb-4">
                      <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                        <label className="form-label">Department/Subject Group</label>
                        <select className="form-select form-control" onChange={handleSelectDepartment}>
                          <option value="">Type or select department...</option>
                          <option value="Science">Science</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="English">English</option>
                          <option value="Arts">Arts</option>
                        </select>
                        <div className="selected-pills mt-2">
                          {selectedDepartments.map((dept, index) => (
                            <span key={index} className="badge bg-light text-dark badge-primary">
                              {dept} 
                              <i className="fas fa-times" onClick={() => handleRemoveItem(dept, 'department')} />
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 col-sm-12 d-flex flex-column">
                        <label>Subject</label>
                        <select className="form-select form-control" onChange={handleSelectSubject}>
                          <option value="">Select subject...</option>
                          {loading ? (
                            <option disabled>Loading subjects...</option>
                          ) : error ? (
                            <option disabled>Error loading subjects</option>
                          ) : (
                            subjects.map((subject) => (
                              <option key={subject.id} value={subject.name}>
                                {subject.name} 
                              </option>
                            ))
                          )}
                        </select>
                        <div className="selected-pills mt-2">
                          {selectedSubjects.map((subject, index) => (
                            <span key={index} className="badge bg-light text-dark badge-secondary">
                              {subject}
                              <i className="fas fa-times" onClick={() => handleRemoveItem(subject, 'subject')} />
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 col-sm-12 d-flex flex-column">
                        <label>Year Groups</label>
                        <select className="form-select form-control" onChange={handleSelectYear}>
                          <option value="">Select year...</option>
                          <option value="FS1">FS1</option>
                          <option value="FS2">FS2</option>
                          <option value="Year 1">Year 1</option>
                          <option value="Year 2">Year 2</option>
                        </select>
                        <div className="selected-pills mt-2">
                          {selectedYears.map((year, index) => (
                            <span key={index} className="badge bg-light text-dark badge-primary">
                              {year} 
                              <i className="fas fa-times" onClick={() => handleRemoveItem(year, 'year')} />
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Teacher Search Section */}
                    <div className="row mb-4">
                      <div className="col-lg-12">
                        <div className="search-container">
                          <i className="fas fa-search search-icon" />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search teachers... (type name and press Enter to add)"
                            value={searchTeacher}
                            onChange={(e) => setSearchTeacher(e.target.value)}
                            onKeyDown={handleTeacherKeyDown}
                          />
                        </div>
                        <div className="selected-teachers mt-2">
                          {selectedTeachers.map((teacher) => (
                            <span key={teacher.id} className="badge bg-light text-dark badge-tertiary">
                              <img src={teacher.avatar} className="avatar" alt={teacher.name} />
                              {teacher.name}
                              <i className="fas fa-times" onClick={() => handleRemoveItem(teacher.id, 'teacher')} />
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Grade Mapping Section */}
                    <div className="row">
                      <div className="col-lg-12">
                        <h6>Grade Mapping</h6>
                        <div id="assessment-container">
                          {assessments.map((a, idx) => (
                            <div key={a.id} className="row g-2 mb-2 assessment-row">
                              <div className="col-md-3">
                                <input type="text" className="form-control mb-2" placeholder="Assessment Name" value={a.name} onChange={(e) => updateAssessment(a.id, 'name', e.target.value)} />
                              </div>
                              <div className="col-md-3">
                                <input type="text" className="form-control mb-2" placeholder="Assessment Type" value={a.type} onChange={(e) => updateAssessment(a.id, 'type', e.target.value)} />
                              </div>
                              <div className="col-md-3">
                                <select className="form-select form-control mb-2" value={a.scheme} onChange={(e) => updateAssessment(a.id, 'scheme', e.target.value)}>
                                  <option value="">Grading Scheme</option>
                                  <option value="A-F">A-F</option>
                                  <option value="Percentage">Percentage</option>
                                  <option value="Pass/Fail">Pass/Fail</option>
                                </select>
                              </div>
                              <div className="col-md-2">
                                <input type="number" className="form-control mb-2" placeholder="Weightage (%)" value={a.weight} onChange={(e) => updateAssessment(a.id, 'weight', e.target.value)} />
                              </div>
                              <div className="col-md-1 d-flex">
                                <button type="button" className="input-group-text btn btn-light mr-2 btn-sm remove-row" onClick={() => removeAssessment(a.id)} disabled={assessments.length === 1}>
                                  <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="input-group-text btn btn-light btn-sm add-row ms-2" onClick={addAssessment}>
                                  <i className="fas fa-plus" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="d-flex justify-content-end">
                          <button type="button" className="btn btn-danger mt-3" onClick={addAssessment}>Add Row</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Template Component */}
      <DownloadTemplate />

      {/* Upload Modal */}
      <div className="modal fade" id="upload" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add new file!</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body text-center">
              <div className="upload-box">
                <label style={{ cursor: "pointer" }}>
                  <input type="file" style={{ display: "none" }} />
                  <img src="assets/upload.png" alt="Upload Icon" />
                  <p>Drag & Drop or Choose file to upload</p>
                  <span>CSV, Doc, pdf</span>
                </label>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <div className="help-center">
                <img src="assets/help.png" alt="Help Icon" /> Help Center
              </div>
              <div>
                <button type="button" className="btn btn-outline" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="button" className="btn btn-success">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Curriculum;