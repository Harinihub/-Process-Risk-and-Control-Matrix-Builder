CREATE TABLE IF NOT EXISTS internal_controls (
    id BIGSERIAL PRIMARY KEY,
    control_id VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    department VARCHAR(100) NOT NULL,
    owner VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    risk_level VARCHAR(50) NOT NULL,
    control_type VARCHAR(100) NOT NULL,
    effectiveness_score INTEGER CHECK (effectiveness_score BETWEEN 0 AND 100),
    review_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_internal_controls_status ON internal_controls(status);
CREATE INDEX IF NOT EXISTS idx_internal_controls_department ON internal_controls(department);
CREATE INDEX IF NOT EXISTS idx_internal_controls_risk_level ON internal_controls(risk_level);
CREATE INDEX IF NOT EXISTS idx_internal_controls_review_date ON internal_controls(review_date);
CREATE INDEX IF NOT EXISTS idx_internal_controls_is_deleted ON internal_controls(is_deleted);