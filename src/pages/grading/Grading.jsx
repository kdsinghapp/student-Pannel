import React, { useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Headers from "../../components/Headers";
import Sidebar from "../../components/Sidebar";
import * as bootstrap from "bootstrap";
import { getGradingSchemas, deleteGradingSchemaById } from "../../utils/authApi";
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
      const data = await getGradingSchemas();
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
    if (!window.confirm("Are you sure you want to delete this grading schema?")) return;
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                  <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              <div className="table-responsive" style={{ display: loading ? 'none' : 'block' }}>
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
                        <tr><td colSpan="5" className="text-center">No grading schemas found.</td></tr>
                      ) : (
                        gradingSchemas.map((schema) => (
                          <tr key={schema.id} style={{ lineHeight: "35px", fontSize: "15px" }}>
                            <td>{schema.category || "-"}</td>
                            <td>
                              {Array.isArray(schema.grades) && schema.grades.length > 0 ? (
                                schema.grades.map((grade, idx) => (
                                  <div key={idx} style={{ marginBottom: 4 }}>
                                    <span style={{ background: grade.color, color: '#fff', padding: '2px 8px', borderRadius: 4, marginRight: 8 }}>
                                      {grade.label} ({grade.min}-{grade.max})
                                    </span>
                                    <span style={{ fontStyle: 'italic', color: '#555' }}>{grade.description}</span>
                                  </div>
                                ))
                              ) : "-"}
                            </td>
                            <td>
                              {Array.isArray(schema.progress) && schema.progress.length > 0 ? (
                                schema.progress.map((prog, idx) => (
                                  <div key={idx} style={{ marginBottom: 4 }}>
                                    <span style={{ background: prog.color, color: '#fff', padding: '2px 8px', borderRadius: 4, marginRight: 8 }}>
                                      {prog.label} ({prog.min}-{prog.max})
                                    </span>
                                    <span style={{ fontStyle: 'italic', color: '#555' }}>{prog.description}</span>
                                  </div>
                                ))
                              ) : "-"}
                            </td>
                            <td>{schema.weightage || "-"}</td>
                            <td className="action-icons">
                              <a href="#" title="Edit"><i className="fas fa-edit" /></a>
                              <a href="#" title="View" onClick={() => handleView(schema)}><i className="fas fa-eye" /></a>
      {/* View Grading Modal */}
      <div className="modal fade" id="viewGradingModal" tabIndex="-1" aria-labelledby="viewGradingModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewGradingModalLabel">Grading Schema Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseView}></button>
            </div>
            <div className="modal-body">
              {viewSchema ? (
                <div>
                  <p><strong>Category:</strong> {viewSchema.category || '-'}</p>
                  <p><strong>Weightage:</strong> {viewSchema.weightage || '-'}</p>
                  <div>
                    <strong>Grades:</strong>
                    {Array.isArray(viewSchema.grades) && viewSchema.grades.length > 0 ? (
                      <ul>
                        {viewSchema.grades.map((grade, idx) => (
                          <li key={idx}>
                            <span style={{ background: grade.color, color: '#fff', padding: '2px 8px', borderRadius: 4, marginRight: 8 }}>
                              {grade.label} ({grade.min}-{grade.max})
                            </span>
                            <span style={{ fontStyle: 'italic', color: '#555' }}>{grade.description}</span>
                          </li>
                        ))}
                      </ul>
                    ) : <span> - </span>}
                  </div>
                  <div>
                    <strong>Progress:</strong>
                    {Array.isArray(viewSchema.progress) && viewSchema.progress.length > 0 ? (
                      <ul>
                        {viewSchema.progress.map((prog, idx) => (
                          <li key={idx}>
                            <span style={{ background: prog.color, color: '#fff', padding: '2px 8px', borderRadius: 4, marginRight: 8 }}>
                              {prog.label} ({prog.min}-{prog.max})
                            </span>
                            <span style={{ fontStyle: 'italic', color: '#555' }}>{prog.description}</span>
                          </li>
                        ))}
                      </ul>
                    ) : <span> - </span>}
                  </div>
                </div>
              ) : <div>No data to display.</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseView}>Close</button>
            </div>
          </div>
        </div>
      </div>
                              <button
                                className="btn btn-link p-0"
                                title="Delete"
                                style={{ color: '#dc3545', outline: 'none', border: 'none', background: 'none' }}
                                onClick={() => handleDelete(schema.id)}
                                disabled={deletingId === schema.id}
                              >
                                {deletingId === schema.id ? (
                                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                  <i className="fas fa-trash" />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                  </tbody>
                </table>
              </div>
              {error && <div className="alert alert-danger text-center">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grading;
