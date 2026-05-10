CREATE INDEX idx_internal_controls_status
ON internal_controls(status);

CREATE INDEX idx_internal_controls_review_date
ON internal_controls(review_date);

CREATE INDEX idx_internal_controls_department
ON internal_controls(department);

CREATE INDEX idx_internal_controls_risk_level
ON internal_controls(risk_level);

CREATE INDEX idx_internal_controls_is_deleted
ON internal_controls(is_deleted);

CREATE INDEX idx_internal_controls_search
ON internal_controls(title, department, owner, control_id);