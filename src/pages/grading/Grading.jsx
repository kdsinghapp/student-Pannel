import React, { useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Headers from "../../components/Headers";
import Sidebar from "../../components/Sidebar";
import * as bootstrap from "bootstrap";
import {
  getGradingSchemasBySchoolId,
  deleteGradingSchemaById,
} from "../../utils/authApi";
import DownloadTemplate from "../../components/DownloadTemplate";
import { useNavigate } from "react-router-dom";
import studentId from "../../assets/assets/icon/fi_list.png";
import studentPh from "../../assets/assets/icon/ph_student.png";
import studentCat from "../../assets/assets/icon/category.png";
import studentClass from "../../assets/assets/icon/class.png";
import studentProg from "../../assets/assets/icon/tabler_progress.png";
import studentStat from "../../assets/assets/icon/lets-icons_status.png";
import studentEdit from "../../assets/assets/icon/tabler_edit.png";

const Grading = () => {
  const navigate = useNavigate();
  const navigateToAddStudents = () => {
    navigate("/add-grading");
  };

  // State for grading schemas
  const [gradingSchemas, setGradingSchemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  // State for view modal
  const [viewSchema, setViewSchema] = useState(null);

  // Handler to open view modal
  const handleView = (schema) => {
    setViewSchema(schema);
    setTimeout(() => {
      const modalElement = document.getElementById("viewGradingModal");
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }, 100);
  };

  // Handler to close view modal
  const handleCloseView = () => {
    setViewSchema(null);
    const modalElement = document.getElementById("viewGradingModal");
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
    }
  };

  const fetchGradingSchemas = async () => {
    setLoading(true);
    setError(null);
    try {
      const schoolId = localStorage.getItem("school_id");
      if (!schoolId) {
        setError("School ID not found");
        setLoading(false);
        return;
      }
      const data = await getGradingSchemasBySchoolId(schoolId);
      setGradingSchemas(data?.data || []);
    } catch (err) {
      setError("Failed to fetch grading schemas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGradingSchemas();
  }, []);

  // Delete grading schema handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this grading schema?"))
      return;
    setDeletingId(id);
    try {
      await deleteGradingSchemaById(id);
      await fetchGradingSchemas();
    } catch (err) {
      setError("Failed to delete grading schema");
    } finally {
      setDeletingId(null);
    }
  };

  // State and handler for edit modal
  const [editSchema, setEditSchema] = useState(null);
  const handleEdit = (schema) => {
    setEditSchema(schema);
    setTimeout(() => {
      const modalElement = document.getElementById("editGradingModal");
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }, 100);
  };
  const handleCloseEdit = () => {
    setEditSchema(null);
    const modalElement = document.getElementById("editGradingModal");
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
    }
  };

  return (
    <div id="wrapper" className="wrapper bg-ash">
      <Headers />
      <div className="dashboard-page-one">
        <Sidebar />
        <div className="dashboard-content-one">
          <div className="breadcrumbs-area d-flex justify-content-between">
            <h3>Grading Lists</h3>
          </div>
          <div className="filter-bar">
            <div className="filter-group form-group">
              <button className="btn btn-light">
                <i className="fas fa-filter" />
              </button>
              <span className="btn">Filter By</span>
              <select className="form-control">
                <option>Your Group</option>
              </select>
              <select className="form-control">
                <option>Class</option>
              </select>
              <select className="form-control">
                <option>ID</option>
              </select>
              <span className="reset-filter btn">
                <i className="fas fa-sync-alt" /> Reset Filter
              </span>
            </div>
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
                style={{ color: "white", background: "#501b8d" }}
              >
                <i className="fas fa-download" /> Template
              </button>
              <button
                className="btn btn-purple modal-trigger"
                onClick={() => {
                  const modalElement = document.getElementById("upload");
                  if (modalElement) {
                    const modal = new bootstrap.Modal(modalElement);
                    modal.show();
                  }
                }}
                style={{ color: "white", background: "#501b8d" }}
              >
                <i className="fas fa-upload" /> Upload
              </button>
              <button
                className="btn btn-purple modal-trigger"
                style={{ color: "white", background: "#501b8d" }}
                onClick={navigateToAddStudents}
              >
                <i className="fas fa-plus" /> Add New
              </button>
            </div>
          </div>
          {/* Grading Table */}
          <div className="card height-auto mt-4">
            <div className="card-body p-0">
              {loading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "300px",
                  }}
                >
                  <div
                    className="spinner-border text-primary"
                    role="status"
                    style={{ width: "4rem", height: "4rem" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              <div
                className="table-responsive"
                style={{ display: loading ? "none" : "block" }}
              >
                <table className="table display data-table">
                  <thead style={{ lineHeight: "35px", fontSize: "15px" }}>
                    <tr>
                      <th>Category</th>
                      <th>Values</th>
                      <th>Weightage</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradingSchemas.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No grading schemas found.
                        </td>
                      </tr>
                    ) : (
                      gradingSchemas.map((schema) => (
                        <React.Fragment key={schema.id}>
                          {Array.isArray(schema.categories) && schema.categories.length > 0 ? (
                            schema.categories.map((category, catIdx) => (
                              <tr
                                key={`${schema.id}-cat-${category.id}`}
                                style={{ lineHeight: "35px", fontSize: "15px" }}
                              >
                                <td>{category.category_name || "-"}</td>
                                <td>
                                  {Array.isArray(category.values) && category.values.length > 0
                                    ? category.values.map((value, idx) => (
                                        <div key={idx} style={{ marginBottom: 4 }}>
                                          <span
                                            style={{
                                              background: value.color,
                                              color: "#fff",
                                              padding: "2px 8px",
                                              borderRadius: 4,
                                              marginRight: 8,
                                            }}
                                          >
                                            {value.grade_value} ({value.min_percentage}-
                                            {value.max_percentage}%)
                                          </span>
                                          <span
                                            style={{
                                              fontStyle: "italic",
                                              color: "#555",
                                            }}
                                          >
                                            {value.description}
                                          </span>
                                        </div>
                                      ))
                                    : "-"}
                                </td>
                                <td>{category.weightage || "-"}</td>
                                <td>{category.description || "-"}</td>
                                <td className="action-icons">
                                  <a
                                    href="#"
                                    title="Edit"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleEdit(schema);
                                    }}
                                  >
                                    <i className="fas fa-edit" />
                                  </a>
                                  <a
                                    href="#"
                                    title="View"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleView(schema);
                                    }}
                                  >
                                    <i className="fas fa-eye" />
                                  </a>
                                  {catIdx === 0 && (
                                    <button
                                      className="btn btn-link p-0"
                                      title="Delete"
                                      style={{
                                        color: "#dc3545",
                                        outline: "none",
                                        border: "none",
                                        background: "none",
                                      }}
                                      onClick={() => handleDelete(schema.id)}
                                      disabled={deletingId === schema.id}
                                    >
                                      {deletingId === schema.id ? (
                                        <span
                                          className="spinner-border spinner-border-sm"
                                          role="status"
                                          aria-hidden="true"
                                        ></span>
                                      ) : (
                                        <i className="fas fa-trash" />
                                      )}
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr
                              key={`${schema.id}-empty`}
                              style={{ lineHeight: "35px", fontSize: "15px" }}
                            >
                              <td colSpan="5" className="text-center">
                                No categories found for this schema.
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}
            </div>
          </div>

          {/* Edit Grading Modal */}
          <div
            className="modal fade"
            id="editGradingModal"
            tabIndex="-1"
            aria-labelledby="editGradingModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editGradingModalLabel">
                    Edit Grading Schema
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseEdit}
                  ></button>
                </div>
                <div className="modal-body">
                  {editSchema ? (
                    <div>
                      <p>
                        <strong>Description:</strong> {editSchema.description || "-"}
                      </p>
                      <div className="alert alert-info">
                        Edit form UI goes here. You can add form fields for editing categories and values.
                      </div>
                      {Array.isArray(editSchema.categories) &&
                      editSchema.categories.length > 0 ? (
                        <div>
                          <strong>Categories:</strong>
                          <ul>
                            {editSchema.categories.map((cat) => (
                              <li key={cat.id}>
                                {cat.category_name} (Weightage: {cat.weightage}%)
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div>No data to edit.</div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleCloseEdit}
                  >
                    Close
                  </button>
                  {/* Add Save button and logic here */}
                </div>
              </div>
            </div>
          </div>

          {/* View Grading Modal */}
          <div
            className="modal fade"
            id="viewGradingModal"
            tabIndex="-1"
            aria-labelledby="viewGradingModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="viewGradingModalLabel">
                    Grading Schema Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseView}
                  ></button>
                </div>
                <div className="modal-body">
                  {viewSchema ? (
                    <div>
                      <p>
                        <strong>Description:</strong> {viewSchema.description || "-"}
                      </p>
                      <div>
                        <strong>Categories:</strong>
                        {Array.isArray(viewSchema.categories) &&
                        viewSchema.categories.length > 0 ? (
                          <div style={{ marginTop: "10px" }}>
                            {viewSchema.categories.map((category) => (
                              <div
                                key={category.id}
                                style={{
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  padding: "10px",
                                  marginBottom: "10px",
                                }}
                              >
                                <h6 style={{ marginBottom: "8px" }}>
                                  {category.category_name}
                                </h6>
                                <p style={{ fontSize: "14px", marginBottom: "4px" }}>
                                  <strong>Description:</strong> {category.description}
                                </p>
                                <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                                  <strong>Weightage:</strong> {category.weightage}%
                                </p>
                                <div>
                                  <strong>Grade Values:</strong>
                                  {Array.isArray(category.values) &&
                                  category.values.length > 0 ? (
                                    <ul style={{ marginTop: "5px" }}>
                                      {category.values.map((value) => (
                                        <li key={value.id}>
                                          <span
                                            style={{
                                              background: value.color,
                                              color: "#fff",
                                              padding: "2px 8px",
                                              borderRadius: 4,
                                              marginRight: 8,
                                            }}
                                          >
                                            {value.grade_value} ({value.min_percentage}-
                                            {value.max_percentage}%)
                                          </span>
                                          <span style={{ fontSize: "13px", color: "#555" }}>
                                            - {value.description}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <span> - </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span> - </span>
                        )}
                      </div>
                      <div style={{ marginTop: "15px" }}>
                        <strong>Progress Categories:</strong>
                        {Array.isArray(viewSchema.progress_categories) &&
                        viewSchema.progress_categories.length > 0 ? (
                          <div style={{ marginTop: "10px" }}>
                            {viewSchema.progress_categories.map((progCat) => (
                              <div
                                key={progCat.id}
                                style={{
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  padding: "10px",
                                  marginBottom: "10px",
                                  backgroundColor: "#f9f9f9",
                                }}
                              >
                                <h6 style={{ marginBottom: "8px" }}>
                                  {progCat.category_name}
                                </h6>
                                <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                                  <strong>Description:</strong> {progCat.description}
                                </p>
                                <div>
                                  <strong>Progress Values:</strong>
                                  {Array.isArray(progCat.values) &&
                                  progCat.values.length > 0 ? (
                                    <ul style={{ marginTop: "5px" }}>
                                      {progCat.values.map((value) => (
                                        <li key={value.id}>
                                          <span
                                            style={{
                                              background: value.color,
                                              color: "#fff",
                                              padding: "2px 8px",
                                              borderRadius: 4,
                                              marginRight: 8,
                                            }}
                                          >
                                            {value.min_progress}-{value.max_progress}
                                          </span>
                                          <span style={{ fontSize: "13px", color: "#555" }}>
                                            {value.description} ({value.grade_description})
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <span> - </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span> - </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>No data to display.</div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleCloseView}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grading;
