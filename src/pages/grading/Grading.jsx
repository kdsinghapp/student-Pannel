import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import * as bootstrap from "bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import Headers from "../../components/Headers";
import Sidebar from "../../components/Sidebar";
import DownloadTemplate from "../../components/DownloadTemplate";



const initialGradeCategory = () => ({
  gradeCategory: '',
  gradeValues: [
    { value: '', min: '', max: '', color: '#ffffff' }
  ],
  weightage: ''
});


const initialProgressRange = () => ({
  min: '',
  max: '',
  color: '#ffffff',
  description: ''
});

const initialProgressCategory = () => ({
  progressCategory: '',
  progressRanges: [initialProgressRange()],
  gradeDescription: ''
});

const Grading = () => {
  // State for multiple grade categories
  const [gradeCategories, setGradeCategories] = useState([initialGradeCategory()]);
  // State for multiple progress categories (each with multiple progress ranges)
  const [progressCategories, setProgressCategories] = useState([initialProgressCategory()]);

  // Handler to update a grade value in a specific category
  const handleGradeValueChange = (catIdx, idx, field, val) => {
    setGradeCategories(prev => prev.map((cat, i) =>
      i === catIdx
        ? {
            ...cat,
            gradeValues: cat.gradeValues.map((g, j) =>
              j === idx ? { ...g, [field]: val } : g
            )
          }
        : cat
    ));
  };

  // Handler to add a new grade value input set in a specific category
  const handleAddGradeValue = (catIdx) => {
    setGradeCategories(prev => prev.map((cat, i) =>
      i === catIdx
        ? {
            ...cat,
            gradeValues: [...cat.gradeValues, { value: '', min: '', max: '', color: '#ffffff' }]
          }
        : cat
    ));
  };

  // Handler to remove a grade value input set in a specific category
  const handleRemoveGradeValue = (catIdx, idx) => {
    setGradeCategories(prev => prev.map((cat, i) =>
      i === catIdx
        ? {
            ...cat,
            gradeValues: cat.gradeValues.filter((_, j) => j !== idx)
          }
        : cat
    ));
  };

  // Handler to update grade category name or weightage
  const handleCategoryFieldChange = (catIdx, field, val) => {
    setGradeCategories(prev => prev.map((cat, i) =>
      i === catIdx ? { ...cat, [field]: val } : cat
    ));
  };



  // Handler to update a field in a specific progress category (for category-level fields)
  const handleProgressCategoryChange = (idx, field, val) => {
    setProgressCategories(prev => prev.map((cat, i) =>
      i === idx ? { ...cat, [field]: val } : cat
    ));
  };

  // Handler to update a field in a specific progress range within a category
  const handleProgressRangeChange = (catIdx, rangeIdx, field, val) => {
    setProgressCategories(prev => prev.map((cat, i) =>
      i === catIdx
        ? {
            ...cat,
            progressRanges: cat.progressRanges.map((range, j) =>
              j === rangeIdx ? { ...range, [field]: val } : range
            )
          }
        : cat
    ));
  };

  // Handler to add a new progress range in a specific category
  const handleAddProgressRange = (catIdx) => {
    setProgressCategories(prev => prev.map((cat, i) =>
      i === catIdx
        ? {
            ...cat,
            progressRanges: [...cat.progressRanges, initialProgressRange()]
          }
        : cat
    ));
  };

  // Handler to remove a progress range in a specific category
  const handleRemoveProgressRange = (catIdx, rangeIdx) => {
    setProgressCategories(prev => prev.map((cat, i) =>
      i === catIdx
        ? {
            ...cat,
            progressRanges: cat.progressRanges.filter((_, j) => j !== rangeIdx)
          }
        : cat
    ));
  };

  // Handler to add a new progress category
  const handleAddProgressCategory = () => {
    setProgressCategories(prev => [...prev, initialProgressCategory()]);
  };

  // Handler to remove a progress category
  const handleRemoveProgressCategory = (idx) => {
    setProgressCategories(prev => prev.filter((_, i) => i !== idx));
  };

    // Handler to clone (add) a new grade category
  const handleAddGradeCategory = () => {
    setGradeCategories(prev => [...prev, initialGradeCategory()]);
  };

  return (
    <>
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />
        <div className="dashboard-page-one">
          <Sidebar />
          {/* Sidebar Area End Here */}
          <div className="dashboard-content-one">
            {/* Breadcubs Area Start Here */}
            <div className="breadcrumbs-area d-flex justify-content-between">
              <h3>Grading Setup</h3>
              <div>
                <button
                  className="btn btn-purple modal-trigger"
                  onClick={() => {
                    const modalElement = document.getElementById("download");
                    if (modalElement) {
                      const modal = new bootstrap.Modal(modalElement);
                      modal.show();
                    }
                  }}
                >
                  <i className="fas fa-download" /> Template
                </button>
                <button
                  className="btn btn-purple modal-trigger mb-0"
                  data-toggle="modal"
                  data-target="#upload"
                >
                  <i className="fas fa-upload" /> Upload
                </button>
                <a className="btn btn-purple text-white">
                  <i className="fas fa-plus" /> Add New
                </a>
              </div>
            </div>
            {/* Breadcubs Area End Here */}
            {/* Class Table Area Start Here */}
            <div className="card height-auto">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      {gradeCategories.map((cat, catIdx) => (
                        <div key={catIdx} className="mb-4 p-3 border rounded position-relative">
                          <div className="mb-3">
                            <label className="form-label">Grade Category *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Input Grading"
                              value={cat.gradeCategory}
                              onChange={e => handleCategoryFieldChange(catIdx, 'gradeCategory', e.target.value)}
                            />
                          </div>
                          {/* Dynamic Grade Value Inputs */}
                          {cat.gradeValues.map((grade, idx) => (
                            <div key={idx}>
                              <div className="mb-3 d-flex align-items-end">
                                <div className="mr-1">
                                  <label className="form-label">Grade Value *</label>
                                  <input
                                    type="text"
                                    className="form-control mr-2"
                                    placeholder="Value"
                                    value={grade.value}
                                    onChange={e => handleGradeValueChange(catIdx, idx, 'value', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="form-label">Main(%)</label>
                                  <div className="d-flex">
                                    <input
                                      type="number"
                                      className="form-control mr-2"
                                      placeholder="Min (%)"
                                      value={grade.min}
                                      onChange={e => handleGradeValueChange(catIdx, idx, 'min', e.target.value)}
                                    />
                                    <input
                                      type="number"
                                      className="form-control mr-2"
                                      placeholder="Max (%)"
                                      value={grade.max}
                                      onChange={e => handleGradeValueChange(catIdx, idx, 'max', e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="position-relative ml-2">
                                  <label className="form-label">Color</label>
                                  <div className="d-flex align-items-center">
                                    <input
                                      type="color"
                                      className="color-picker form-control p-0"
                                      style={{ width: 40, height: 40, border: 'none', background: 'none' }}
                                      value={grade.color}
                                      onChange={e => handleGradeValueChange(catIdx, idx, 'color', e.target.value)}
                                    />
                                    <input
                                      type="text"
                                      className="form-control ml-2"
                                      style={{ width: 90 }}
                                      value={grade.color}
                                      onChange={e => handleGradeValueChange(catIdx, idx, 'color', e.target.value)}
                                      maxLength={7}
                                      placeholder="#FFFFFF"
                                    />
                                    {/* Direct color swatch */}
                                    <div
                                      style={{
                                        width: 32,
                                        height: 32,
                                        backgroundColor: grade.color,
                                        border: '1px solid #ccc',
                                        borderRadius: 4,
                                        marginLeft: 8
                                      }}
                                      title={grade.color}
                                    />
                                  </div>
                                </div>
                                {cat.gradeValues.length > 1 && (
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm ml-2 mb-2"
                                    onClick={() => handleRemoveGradeValue(catIdx, idx)}
                                    title="Remove"
                                  >
                                    &times;
                                  </button>
                                )}
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Description</label>
                                <input
                                  type="text"
                                  className="form-control mt-3"
                                  placeholder="e.g., Excellent, Needs Improvement"
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="btn btn-outline-primary w-20 mt-2 mb-3 p-3 br10"
                            onClick={() => handleAddGradeValue(catIdx)}
                          >
                            Add Grade Value
                          </button>
                          <div className="mb-3">
                            <label className="form-label">
                              Weightage (Optional)
                            </label>
                            <input
                              type="text"
                              className="form-control mt-2"
                              placeholder="Value"
                              value={cat.weightage}
                              onChange={e => handleCategoryFieldChange(catIdx, 'weightage', e.target.value)}
                            />
                          </div>
                          {/* Remove category button if more than one */}
                          {gradeCategories.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-danger btn-sm position-absolute"
                              style={{ top: 10, right: 10 }}
                              onClick={() => setGradeCategories(prev => prev.filter((_, i) => i !== catIdx))}
                              title="Remove Category"
                            >
                              Remove Category
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-outline-primary w-100 mt-3 mb-3 p-3 br10"
                        onClick={handleAddGradeCategory}
                      >
                        Add Grade Category
                      </button>
                    </div>

                    <div className="col-md-6">
                      {progressCategories.map((cat, catIdx) => (
                        <div key={catIdx} className="mb-4 p-3 border rounded position-relative">
                          <label className="form-label">Progress Category *</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g., 'Above Expected'"
                            value={cat.progressCategory}
                            onChange={e => handleProgressCategoryChange(catIdx, 'progressCategory', e.target.value)}
                          />
                          {/* Progress Ranges */}
                          {cat.progressRanges.map((range, rangeIdx) => (
                           <div>
                             <div key={rangeIdx} className="mt-3 d-flex align-items-end pb-3 ">
                              <div className="mr-2">
                                <label className="form-label">Minimum Progress (%)</label>
                                <input
                                  type="number"
                                  className="form-control mr-2"
                                  placeholder="Min Progress (%)"
                                  value={range.min}
                                  onChange={e => handleProgressRangeChange(catIdx, rangeIdx, 'min', e.target.value)}
                                />
                              </div>
                              <div className="mr-2">
                                <label className="form-label">Maximum Progress (%)</label>
                                <input
                                  type="number"
                                  className="form-control mr-2"
                                  placeholder="Max Progress (%)"
                                  value={range.max}
                                  onChange={e => handleProgressRangeChange(catIdx, rangeIdx, 'max', e.target.value)}
                                />
                              </div>
                              <div className="ml-2">
                                <label className="form-label">Color</label>
                                <div className="d-flex align-items-center">
                                  <input
                                    type="color"
                                    className="color-picker form-control p-0"
                                    style={{ width: 40, height: 40, border: 'none', background: 'none' }}
                                    value={range.color}
                                    onChange={e => handleProgressRangeChange(catIdx, rangeIdx, 'color', e.target.value)}
                                  />
                                  <input
                                    type="text"
                                    className="form-control ml-2"
                                    style={{ width: 90 }}
                                    value={range.color}
                                    onChange={e => handleProgressRangeChange(catIdx, rangeIdx, 'color', e.target.value)}
                                    maxLength={7}
                                    placeholder="#FFFFFF"
                                  />
                                  <div
                                    style={{
                                      width: 32,
                                      height: 32,
                                      backgroundColor: range.color,
                                      border: '1px solid #ccc',
                                      borderRadius: 4,
                                      marginLeft: 8
                                    }}
                                    title={range.color}
                                  />
                                </div>
                              </div>
                            
                              {cat.progressRanges.length > 1 && (
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm ml-2 mb-2"
                                  onClick={() => handleRemoveProgressRange(catIdx, rangeIdx)}
                                  title="Remove Progress Range"
                                >
                                  &times;
                                </button>
                              )}
                            </div>
                             <div className="mb-3">
                                <label className="form-label">Description</label>
                                <input
                                  type="text"
                                  className="form-control mt-3"
                                  placeholder="e.g., Excellent, Needs Improvement"
                                />
                              </div>
                           </div>
                          ))}
                          <button
                            type="button"
                            className="btn btn-outline-primary w-20 mt-2 mb-3 p-3 br10"
                            onClick={() => handleAddProgressRange(catIdx)}
                          >
                            Add Progress Range
                          </button>
                          <div className="mb-3">
                            <label className="form-label">Grade Description</label>
                            <input
                              type="text"
                              className="form-control mt-2"
                              placeholder="Grade Description"
                              value={cat.gradeDescription}
                              onChange={e => handleProgressCategoryChange(catIdx, 'gradeDescription', e.target.value)}
                            />
                          </div>
                          {progressCategories.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-danger btn-sm position-absolute"
                              style={{ top: 10, right: 10 }}
                              onClick={() => handleRemoveProgressCategory(catIdx)}
                              title="Remove Progress Category"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-outline-primary w-100 mt-3 mb-3 p-3 br10"
                        onClick={handleAddProgressCategory}
                      >
                        Add Progress Category
                      </button>
                    </div>
                    
                  </div>
                  <div className="col-md-12 mt-5 text-center">
                    <button
                      type="submit"
                      className="btn-fill-lg btn-gradient-blue1 btn-hover-bluedark"
                    >
                      Save Grading Scheme
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* Class Table Area End Here */}
          </div>
        </div>
        {/* Page Area End Here */}
      </div>
      {/* <div
        className="modal fade"
        id="download"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Download Template</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <div className="upload-box">
                <label style={{ cursor: "pointer" }}>
                  <input type="file" style={{ display: "none" }} />
                  <img src="assets/upload.png" alt="Upload Icon" />
                  <p>This is the template to quickly add students</p>
                  <span>CSV</span>
                </label>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <div className="help-center">
                <img src="assets/help.png" alt="Help Icon" /> Help Center
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-outline"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-success">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <DownloadTemplate />
      <div
        className="modal fade"
        id="upload"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add new file!</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <div className="upload-box">
                <label style={{ cursor: "pointer" }}>
                  <input type="file" style={{ display: "none" }} />
                  <img src="assets/upload.png" alt="Upload Icon" />
                  <p>Drag &amp; Drop or Choose file to upload</p>
                  <span>CSV, Doc, pdf</span>
                </label>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <div className="help-center">
                <img src="assets/help.png" alt="Help Icon" /> Help Center
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-outline"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onclick="openModal()"
                >
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

export default Grading;
