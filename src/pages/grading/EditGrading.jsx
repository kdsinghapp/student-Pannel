import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Headers from "../../components/Headers";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { getGradingSchemaById } from "../../utils/authApi";

const API_URL = "https://server-php-8-3.technorizen.com/gradesphere/api";

const initialGradeCategory = () => ({
  category_name: "",
  description: "",
  gradeValues: [
    {
      grade_value: "",
      min_percentage: "",
      max_percentage: "",
      color: "#ffffff",
      description: "",
    },
  ],
  weightage: "",
});

const initialProgressRange = () => ({
  min_progress: "",
  max_progress: "",
  color: "#ffffff",
  description: "",
  grade_description: "",
});

const initialProgressCategory = () => ({
  category_name: "",
  description: "",
  progressRanges: [initialProgressRange()],
});

const EditGrading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [schemaDescription, setSchemaDescription] = useState("");
  const [selectedCurriculumId, setSelectedCurriculumId] = useState("");
  const [curriculums, setCurriculums] = useState([]);

  const [gradeCategories, setGradeCategories] = useState([
    initialGradeCategory(),
  ]);
  const [progressCategories, setProgressCategories] = useState([
    initialProgressCategory(),
  ]);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const token = localStorage.getItem("userTokenStudent");
        const schoolId = localStorage.getItem("school_id");

        const curriculumRes = await axios.get(
          `${API_URL}/user/grading/school-curriculums?school_id=${schoolId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCurriculums(curriculumRes.data?.data || []);

        if (id) {
          // Use helper which calls the correct GET endpoint
          const schemaRes = await getGradingSchemaById(id);

          const schema = schemaRes?.data;
          if (schema) {
            setSchemaDescription(schema.description || "");
            setSelectedCurriculumId(
              schema.school_curriculum_id?.toString() || ""
            );

            if (
              schema.grading_categories &&
              schema.grading_categories.length > 0
            ) {
              const transformedGradeCategories = schema.grading_categories.map(
                (cat) => ({
                  id: cat.id,
                  category_name: cat.category_name,
                  description: cat.description || "",
                  weightage: cat.weightage || "",
                  gradeValues:
                    cat.values?.map((val) => ({
                      id: val.id,
                      grade_value: val.grade_value,
                      min_percentage: val.min_percentage?.toString() || "",
                      max_percentage: val.max_percentage?.toString() || "",
                      color: val.color,
                      description: val.description,
                    })) || [],
                })
              );
              setGradeCategories(transformedGradeCategories);
            }

            if (
              schema.progress_categories &&
              schema.progress_categories.length > 0
            ) {
              const transformedProgressCategories =
                schema.progress_categories.map((cat) => ({
                  id: cat.id,
                  category_name: cat.category_name,
                  description: cat.description || "",
                  progressRanges:
                    cat.values?.map((range) => ({
                      id: range.id,
                      min_progress: range.min_progress?.toString() || "",
                      max_progress: range.max_progress?.toString() || "",
                      color: range.color,
                      description: range.description,
                      grade_description: range.grade_description,
                    })) || [],
                }));
              setProgressCategories(transformedProgressCategories);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err.response?.data?.message || "Failed to fetch grading schema"
        );
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [id]);

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
                {
                  grade_value: "",
                  min_percentage: "",
                  max_percentage: "",
                  color: "#ffffff",
                  description: "",
                },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (!selectedCurriculumId) {
      setError("Please select a curriculum");
      return;
    }

    if (!schemaDescription.trim()) {
      setError("Please enter a description for the grading schema");
      return;
    }

    for (let cat of gradeCategories) {
      if (!cat.category_name.trim()) {
        setError("Please fill in all grade category names");
        return;
      }
      if (
        cat.gradeValues.some(
          (g) =>
            !g.grade_value ||
            g.min_percentage === "" ||
            g.max_percentage === "" ||
            !g.description.trim()
        )
      ) {
        setError("Please fill in all grade value fields");
        return;
      }
    }

    for (let cat of progressCategories) {
      if (!cat.category_name.trim()) {
        setError("Please fill in all progress category names");
        return;
      }
      if (
        cat.progressRanges.some(
          (r) =>
            r.min_progress === "" ||
            r.max_progress === "" ||
            !r.description.trim() ||
            !r.grade_description.trim()
        )
      ) {
        setError("Please fill in all progress range fields");
        return;
      }
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("userTokenStudent");

      const jsonData = {
        description: schemaDescription,
        school_curriculum_id: parseInt(selectedCurriculumId),
        grading_categories: gradeCategories.map((cat) => ({
          category_name: cat.category_name,
          description: cat.description,
          weightage: cat.weightage || 0,
          values: cat.gradeValues.map((val) => ({
            grade_value: val.grade_value,
            min_percentage: parseInt(val.min_percentage),
            max_percentage: parseInt(val.max_percentage),
            color: val.color,
            description: val.description,
          })),
        })),
        progress_categories: progressCategories.map((cat) => ({
          category_name: cat.category_name,
          description: cat.description,
          values: cat.progressRanges.map((range) => ({
            min_progress: parseInt(range.min_progress),
            max_progress: parseInt(range.max_progress),
            color: range.color,
            description: range.description,
            grade_description: range.grade_description,
          })),
        })),
      };

      await axios.put(
        `${API_URL}/user/grading/grading-schema/${id}`,
        jsonData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("Grading schema updated successfully!");

      setTimeout(() => {
        navigate("/grading-setup");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || err.response?.data?.errors
          ? JSON.stringify(err.response?.data?.errors)
          : "Failed to update grading schema"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
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
                <div className="card-body text-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                  <p className="mt-3">Loading grading schema...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

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
                {error && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    {error}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setError(null)}
                    ></button>
                  </div>
                )}
                {successMessage && (
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    {successMessage}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSuccessMessage(null)}
                    ></button>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Schema Description *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g., Final Term Grading Schema"
                          value={schemaDescription}
                          onChange={(e) => setSchemaDescription(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Select Curriculum *
                        </label>
                        <select
                          className="form-control"
                          value={selectedCurriculumId}
                          onChange={(e) =>
                            setSelectedCurriculumId(e.target.value)
                          }
                          required
                        >
                          <option value="">-- Select a Curriculum --</option>
                          {curriculums.map((curr) => (
                            <option key={curr.id} value={curr.id}>
                              {curr.curriculum_division?.name ||
                                `Curriculum ${curr.id}`}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

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
                              placeholder="e.g., Assignments, Exams"
                              value={cat.category_name}
                              onChange={(e) =>
                                handleCategoryFieldChange(
                                  catIdx,
                                  "category_name",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Category Description
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g., Short assignments"
                              value={cat.description}
                              onChange={(e) =>
                                handleCategoryFieldChange(
                                  catIdx,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          {/* Dynamic Grade Value Inputs */}
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
                                    placeholder="e.g., A, B, C"
                                    value={grade.grade_value}
                                    onChange={(e) =>
                                      handleGradeValueChange(
                                        catIdx,
                                        idx,
                                        "grade_value",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="form-label">
                                    Range (%)
                                  </label>
                                  <div className="d-flex">
                                    <input
                                      type="number"
                                      className="form-control mr-2"
                                      placeholder="Min (%)"
                                      value={grade.min_percentage}
                                      onChange={(e) =>
                                        handleGradeValueChange(
                                          catIdx,
                                          idx,
                                          "min_percentage",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      type="number"
                                      className="form-control mr-2"
                                      placeholder="Max (%)"
                                      value={grade.max_percentage}
                                      onChange={(e) =>
                                        handleGradeValueChange(
                                          catIdx,
                                          idx,
                                          "max_percentage",
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
                              <div className="mb-3">
                                <label className="form-label">
                                  Description *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="e.g., Excellent, Good, Needs Improvement"
                                  value={grade.description}
                                  onChange={(e) =>
                                    handleGradeValueChange(
                                      catIdx,
                                      idx,
                                      "description",
                                      e.target.value
                                    )
                                  }
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
                              onChange={(e) =>
                                handleCategoryFieldChange(
                                  catIdx,
                                  "weightage",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          {/* Remove category button if more than one */}
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
                            placeholder="e.g., Behaviour, Participation"
                            value={cat.category_name}
                            onChange={(e) =>
                              handleProgressCategoryChange(
                                catIdx,
                                "category_name",
                                e.target.value
                              )
                            }
                          />
                          <div className="mb-3">
                            <label className="form-label">
                              Category Description
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g., Behaviour progress"
                              value={cat.description}
                              onChange={(e) =>
                                handleProgressCategoryChange(
                                  catIdx,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          {/* Progress Ranges */}
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
                                    value={range.min_progress}
                                    onChange={(e) =>
                                      handleProgressRangeChange(
                                        catIdx,
                                        rangeIdx,
                                        "min_progress",
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
                                    value={range.max_progress}
                                    onChange={(e) =>
                                      handleProgressRangeChange(
                                        catIdx,
                                        rangeIdx,
                                        "max_progress",
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
                              <div className="mb-3">
                                <label className="form-label">
                                  Progress Description *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="e.g., Excellent, Needs Improvement"
                                  value={range.description}
                                  onChange={(e) =>
                                    handleProgressRangeChange(
                                      catIdx,
                                      rangeIdx,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">
                                  Grade Description *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="e.g., Very Low, High"
                                  value={range.grade_description}
                                  onChange={(e) =>
                                    handleProgressRangeChange(
                                      catIdx,
                                      rangeIdx,
                                      "grade_description",
                                      e.target.value
                                    )
                                  }
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
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Updating...
                        </>
                      ) : (
                        "Save Changes"
                      )}
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
