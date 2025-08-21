import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Headers from "../../components/Headers";
import Sidebar from "../../components/Sidebar";

// Helper initializers (same as AddGrading)
const initialGradeCategory = () => ({
  gradeCategory: "",
  gradeValues: [{ value: "", min: "", max: "", color: "#ffffff" }],
  weightage: "",
});

const initialProgressRange = () => ({
  min: "",
  max: "",
  color: "#ffffff",
  description: "",
});

const initialProgressCategory = () => ({
  progressCategory: "",
  progressRanges: [initialProgressRange()],
  gradeDescription: "",
});

const EditGrading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Assume grading data is passed via location.state (or fetch from API if needed)
  const gradingData = location.state?.gradingData;

  // State for grade and progress categories
  const [gradeCategories, setGradeCategories] = useState([
    initialGradeCategory(),
  ]);
  const [progressCategories, setProgressCategories] = useState([
    initialProgressCategory(),
  ]);

  // On mount, initialize state from gradingData if present
  useEffect(() => {
    if (gradingData) {
      setGradeCategories(
        gradingData.gradeCategories || [initialGradeCategory()]
      );
      setProgressCategories(
        gradingData.progressCategories || [initialProgressCategory()]
      );
    }
  }, [gradingData]);

  // Handlers (same as AddGrading)
  const handleGradeValueChange = (catIdx, idx, field, val) => {
    setGradeCategories((prev) =>
      prev.map((cat, i) =>
        i === catIdx
          ? {
              ...cat,
              gradeValues: cat.gradeValues.map((g, j) =>
                j === idx ? { ...g, [field]: val } : g
              ),
            }
          : cat
      )
    );
  };

  const handleAddGradeValue = (catIdx) => {
    setGradeCategories((prev) =>
      prev.map((cat, i) =>
        i === catIdx
          ? {
              ...cat,
              gradeValues: [
                ...cat.gradeValues,
                { value: "", min: "", max: "", color: "#ffffff" },
              ],
            }
          : cat
      )
    );
  };

  const handleRemoveGradeValue = (catIdx, idx) => {
    setGradeCategories((prev) =>
      prev.map((cat, i) =>
        i === catIdx
          ? {
              ...cat,
              gradeValues: cat.gradeValues.filter((_, j) => j !== idx),
            }
          : cat
      )
    );
  };

  const handleCategoryFieldChange = (catIdx, field, val) => {
    setGradeCategories((prev) =>
      prev.map((cat, i) => (i === catIdx ? { ...cat, [field]: val } : cat))
    );
  };

  const handleProgressCategoryChange = (idx, field, val) => {
    setProgressCategories((prev) =>
      prev.map((cat, i) => (i === idx ? { ...cat, [field]: val } : cat))
    );
  };

  const handleProgressRangeChange = (catIdx, rangeIdx, field, val) => {
    setProgressCategories((prev) =>
      prev.map((cat, i) =>
        i === catIdx
          ? {
              ...cat,
              progressRanges: cat.progressRanges.map((range, j) =>
                j === rangeIdx ? { ...range, [field]: val } : range
              ),
            }
          : cat
      )
    );
  };

  const handleAddProgressRange = (catIdx) => {
    setProgressCategories((prev) =>
      prev.map((cat, i) =>
        i === catIdx
          ? {
              ...cat,
              progressRanges: [...cat.progressRanges, initialProgressRange()],
            }
          : cat
      )
    );
  };

  const handleRemoveProgressRange = (catIdx, rangeIdx) => {
    setProgressCategories((prev) =>
      prev.map((cat, i) =>
        i === catIdx
          ? {
              ...cat,
              progressRanges: cat.progressRanges.filter(
                (_, j) => j !== rangeIdx
              ),
            }
          : cat
      )
    );
  };

  const handleAddProgressCategory = () => {
    setProgressCategories((prev) => [...prev, initialProgressCategory()]);
  };

  const handleRemoveProgressCategory = (idx) => {
    setProgressCategories((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddGradeCategory = () => {
    setGradeCategories((prev) => [...prev, initialGradeCategory()]);
  };

  // Save handler (replace with API call as needed)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would call your API to update the grading scheme
    // For now, just log and navigate back
    const updatedData = {
      gradeCategories,
      progressCategories,
    };
    // TODO: Replace with API call
    console.log("Updated Grading Data:", updatedData);
    alert("Grading scheme updated!");
    navigate(-1); // Go back
  };

  return (
    <>
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />
        <div className="dashboard-page-one">
          <Sidebar />
          <div className="dashboard-content-one">
            <div className="breadcrumbs-area d-flex justify-content-between">
              <h3>Edit Grading Scheme</h3>
            </div>
            <div className="card height-auto">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      {gradeCategories.map((cat, catIdx) => (
                        <div
                          key={catIdx}
                          className="mb-4 p-3 border rounded position-relative"
                        >
                          <div className="mb-3">
                            <label className="form-label">
                              Grade Category *
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Input Grading"
                              value={cat.gradeCategory}
                              onChange={(e) =>
                                handleCategoryFieldChange(
                                  catIdx,
                                  "gradeCategory",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          {cat.gradeValues.map((grade, idx) => (
                            <div key={idx}>
                              <div className="mb-3 d-flex align-items-end">
                                <div className="mr-1">
                                  <label className="form-label">
                                    Grade Value *
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control mr-2"
                                    placeholder="Value"
                                    value={grade.value}
                                    onChange={(e) =>
                                      handleGradeValueChange(
                                        catIdx,
                                        idx,
                                        "value",
                                        e.target.value
                                      )
                                    }
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
                                      onChange={(e) =>
                                        handleGradeValueChange(
                                          catIdx,
                                          idx,
                                          "min",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      type="number"
                                      className="form-control mr-2"
                                      placeholder="Max (%)"
                                      value={grade.max}
                                      onChange={(e) =>
                                        handleGradeValueChange(
                                          catIdx,
                                          idx,
                                          "max",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="position-relative ml-2">
                                  <label className="form-label">Color</label>
                                  <div className="d-flex align-items-center">
                                    <input
                                      type="color"
                                      className="color-picker form-control p-0"
                                      style={{
                                        width: 40,
                                        height: 40,
                                        border: "none",
                                        background: "none",
                                      }}
                                      value={grade.color}
                                      onChange={(e) =>
                                        handleGradeValueChange(
                                          catIdx,
                                          idx,
                                          "color",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      type="text"
                                      className="form-control ml-2"
                                      style={{ width: 90 }}
                                      value={grade.color}
                                      onChange={(e) =>
                                        handleGradeValueChange(
                                          catIdx,
                                          idx,
                                          "color",
                                          e.target.value
                                        )
                                      }
                                      maxLength={7}
                                      placeholder="#FFFFFF"
                                    />
                                    <div
                                      style={{
                                        width: 32,
                                        height: 32,
                                        backgroundColor: grade.color,
                                        border: "1px solid #ccc",
                                        borderRadius: 4,
                                        marginLeft: 8,
                                      }}
                                      title={grade.color}
                                    />
                                  </div>
                                </div>
                                {cat.gradeValues.length > 1 && (
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm ml-2 mb-2"
                                    onClick={() =>
                                      handleRemoveGradeValue(catIdx, idx)
                                    }
                                    title="Remove"
                                  >
                                    &times;
                                  </button>
                                )}
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
                              onChange={(e) =>
                                handleCategoryFieldChange(
                                  catIdx,
                                  "weightage",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          {gradeCategories.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-danger btn-sm position-absolute"
                              style={{ top: 10, right: 10 }}
                              onClick={() =>
                                setGradeCategories((prev) =>
                                  prev.filter((_, i) => i !== catIdx)
                                )
                              }
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
                        <div
                          key={catIdx}
                          className="mb-4 p-3 border rounded position-relative"
                        >
                          <label className="form-label">
                            Progress Category *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g., 'Above Expected'"
                            value={cat.progressCategory}
                            onChange={(e) =>
                              handleProgressCategoryChange(
                                catIdx,
                                "progressCategory",
                                e.target.value
                              )
                            }
                          />
                          {cat.progressRanges.map((range, rangeIdx) => (
                            <div key={rangeIdx}>
                              <div className="mt-3 d-flex align-items-end pb-3 ">
                                <div className="mr-2">
                                  <label className="form-label">
                                    Minimum Progress (%)
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control mr-2"
                                    placeholder="Min Progress (%)"
                                    value={range.min}
                                    onChange={(e) =>
                                      handleProgressRangeChange(
                                        catIdx,
                                        rangeIdx,
                                        "min",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="mr-2">
                                  <label className="form-label">
                                    Maximum Progress (%)
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control mr-2"
                                    placeholder="Max Progress (%)"
                                    value={range.max}
                                    onChange={(e) =>
                                      handleProgressRangeChange(
                                        catIdx,
                                        rangeIdx,
                                        "max",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="ml-2">
                                  <label className="form-label">Color</label>
                                  <div className="d-flex align-items-center">
                                    <input
                                      type="color"
                                      className="color-picker form-control p-0"
                                      style={{
                                        width: 40,
                                        height: 40,
                                        border: "none",
                                        background: "none",
                                      }}
                                      value={range.color}
                                      onChange={(e) =>
                                        handleProgressRangeChange(
                                          catIdx,
                                          rangeIdx,
                                          "color",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      type="text"
                                      className="form-control ml-2"
                                      style={{ width: 90 }}
                                      value={range.color}
                                      onChange={(e) =>
                                        handleProgressRangeChange(
                                          catIdx,
                                          rangeIdx,
                                          "color",
                                          e.target.value
                                        )
                                      }
                                      maxLength={7}
                                      placeholder="#FFFFFF"
                                    />
                                    <div
                                      style={{
                                        width: 32,
                                        height: 32,
                                        backgroundColor: range.color,
                                        border: "1px solid #ccc",
                                        borderRadius: 4,
                                        marginLeft: 8,
                                      }}
                                      title={range.color}
                                    />
                                  </div>
                                </div>
                                {cat.progressRanges.length > 1 && (
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm ml-2 mb-2"
                                    onClick={() =>
                                      handleRemoveProgressRange(
                                        catIdx,
                                        rangeIdx
                                      )
                                    }
                                    title="Remove Progress Range"
                                  >
                                    &times;
                                  </button>
                                )}
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
                            <label className="form-label">
                              Grade Description
                            </label>
                            <input
                              type="text"
                              className="form-control mt-2"
                              placeholder="Grade Description"
                              value={cat.gradeDescription}
                              onChange={(e) =>
                                handleProgressCategoryChange(
                                  catIdx,
                                  "gradeDescription",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          {progressCategories.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-danger btn-sm position-absolute"
                              style={{ top: 10, right: 10 }}
                              onClick={() =>
                                handleRemoveProgressCategory(catIdx)
                              }
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
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditGrading;
