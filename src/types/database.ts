export interface ThreatDetection {
  id: string;
  url: string;
  risk_score: number;
  status: 'safe' | 'suspicious' | 'malicious';
  detected_at: string;
  source_ip?: string;
  threat_type?: string;
  blocked: boolean;
  flags: string[];
}

export interface AttackLog {
  id: string;
  attack_type: string;
  source_ip: string;
  target: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  blocked: boolean;
  description: string;
  user_agent?: string;
}

export interface URLAnalysis {
  id: string;
  url: string;
  domain: string;
  risk_score: number;
  status: 'safe' | 'suspicious' | 'malicious';
  analyzed_at: string;
  ip_address?: string;
  ssl_valid: boolean;
  flags: string[];
  metadata?: any;
}

export interface ReconResult {
  id: string;
  domain: string;
  ip_address: string;
  open_ports: number[];
  ssl_valid: boolean;
  subdomains_count: number;
  vulnerabilities_count: number;
  risk_level: 'low' | 'medium' | 'high';
  scanned_at: string;
  whois_data?: any;
  ssl_info?: any;
}

export interface BrowserSession {
  id: string;
  browser_type: string;
  user_count: number;
  threats_blocked: number;
  last_active: string;
  status: 'active' | 'inactive';
  version?: string;
}

export interface ThreatStats {
  total_requests: number;
  blocked_threats: number;
  critical_alerts: number;
  safe_requests: number;
  protection_rate: number;
  last_updated: string;
}