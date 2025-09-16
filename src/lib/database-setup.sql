-- UTIWSP Database Schema
-- Run this SQL in your Supabase SQL editor to create the required tables

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Threat Detections Table
CREATE TABLE IF NOT EXISTS threat_detections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    url TEXT NOT NULL,
    risk_score INTEGER NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
    status TEXT NOT NULL CHECK (status IN ('safe', 'suspicious', 'malicious')),
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source_ip INET,
    threat_type TEXT,
    blocked BOOLEAN DEFAULT FALSE,
    flags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attack Logs Table
CREATE TABLE IF NOT EXISTS attack_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    attack_type TEXT NOT NULL,
    source_ip INET NOT NULL,
    target TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    blocked BOOLEAN DEFAULT FALSE,
    description TEXT,
    user_agent TEXT,
    request_headers JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- URL Analyses Table
CREATE TABLE IF NOT EXISTS url_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    url TEXT NOT NULL,
    domain TEXT NOT NULL,
    risk_score INTEGER NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
    status TEXT NOT NULL CHECK (status IN ('safe', 'suspicious', 'malicious')),
    analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    ssl_valid BOOLEAN DEFAULT FALSE,
    flags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    whois_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reconnaissance Results Table
CREATE TABLE IF NOT EXISTS recon_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    domain TEXT NOT NULL,
    ip_address INET NOT NULL,
    open_ports INTEGER[] DEFAULT '{}',
    ssl_valid BOOLEAN DEFAULT FALSE,
    subdomains_count INTEGER DEFAULT 0,
    vulnerabilities_count INTEGER DEFAULT 0,
    risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    whois_data JSONB DEFAULT '{}',
    ssl_info JSONB DEFAULT '{}',
    vulnerability_details JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Browser Sessions Table
CREATE TABLE IF NOT EXISTS browser_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    browser_type TEXT NOT NULL,
    user_count INTEGER DEFAULT 0,
    threats_blocked INTEGER DEFAULT 0,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT NOT NULL CHECK (status IN ('active', 'inactive')),
    version TEXT,
    extension_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_threat_detections_detected_at ON threat_detections(detected_at DESC);
CREATE INDEX IF NOT EXISTS idx_threat_detections_status ON threat_detections(status);
CREATE INDEX IF NOT EXISTS idx_attack_logs_timestamp ON attack_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_attack_logs_severity ON attack_logs(severity);
CREATE INDEX IF NOT EXISTS idx_url_analyses_analyzed_at ON url_analyses(analyzed_at DESC);
CREATE INDEX IF NOT EXISTS idx_url_analyses_domain ON url_analyses(domain);
CREATE INDEX IF NOT EXISTS idx_recon_results_scanned_at ON recon_results(scanned_at DESC);
CREATE INDEX IF NOT EXISTS idx_browser_sessions_last_active ON browser_sessions(last_active DESC);

-- Enable Real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE threat_detections;
ALTER PUBLICATION supabase_realtime ADD TABLE attack_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE url_analyses;
ALTER PUBLICATION supabase_realtime ADD TABLE recon_results;
ALTER PUBLICATION supabase_realtime ADD TABLE browser_sessions;

-- Insert sample data for testing
INSERT INTO threat_detections (url, risk_score, status, source_ip, threat_type, blocked, flags) VALUES
('malicious-site.com', 95, 'malicious', '192.168.1.100', 'Malware', true, '{"Known Malware", "Phishing"}'),
('suspicious-domain.net', 75, 'suspicious', '10.0.0.45', 'Suspicious Activity', true, '{"Suspicious Domain", "No SSL"}'),
('safe-website.com', 15, 'safe', '172.16.0.10', null, false, '{"Valid SSL", "Clean History"}');

INSERT INTO attack_logs (attack_type, source_ip, target, severity, blocked, description) VALUES
('SQL Injection', '192.168.1.100', '/api/users', 'high', true, 'Attempted SQL injection on user endpoint'),
('XSS Attempt', '10.0.0.45', '/search', 'medium', true, 'Cross-site scripting attempt blocked'),
('Brute Force', '203.0.113.5', '/login', 'critical', false, 'Multiple failed login attempts detected');

INSERT INTO url_analyses (url, domain, risk_score, status, ip_address, ssl_valid, flags) VALUES
('example-suspicious.com', 'example-suspicious.com', 75, 'suspicious', '203.0.113.42', false, '{"Suspicious Domain", "No SSL"}'),
('trusted-site.com', 'trusted-site.com', 15, 'safe', '198.51.100.15', true, '{"Valid SSL", "Clean History"}'),
('malware-host.net', 'malware-host.net', 95, 'malicious', '192.0.2.100', false, '{"Known Malware", "Phishing Detected"}');

INSERT INTO recon_results (domain, ip_address, open_ports, ssl_valid, subdomains_count, vulnerabilities_count, risk_level) VALUES
('suspicious-site.com', '203.0.113.42', '{80, 443, 8080}', false, 12, 3, 'high'),
('example-corp.net', '198.51.100.15', '{443, 22}', true, 5, 0, 'low');

INSERT INTO browser_sessions (browser_type, user_count, threats_blocked, status, version) VALUES
('Chrome', 1247, 18, 'active', '118.0'),
('Firefox', 432, 5, 'active', '119.0');