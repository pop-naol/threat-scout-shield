import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, Shield, Globe, Search } from "lucide-react";

interface TimelineEvent {
  timestamp: string;
  type: 'threat_blocked' | 'url_analyzed' | 'attack_detected' | 'recon_completed';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
}

export const ThreatTimelineCard = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      timestamp: '14:32:15',
      type: 'attack_detected',
      title: 'SQL Injection Blocked',
      description: 'Blocked SQL injection attempt from 192.168.1.100',
      severity: 'critical'
    },
    {
      timestamp: '14:28:03',
      type: 'url_analyzed',
      title: 'Suspicious URL Detected',
      description: 'High-risk domain flagged: malware-host.net',
      severity: 'warning'
    },
    {
      timestamp: '14:25:41',
      type: 'recon_completed',
      title: 'Domain Reconnaissance',
      description: 'Completed scan of suspicious-site.com - 3 vulnerabilities found',
      severity: 'warning'
    },
    {
      timestamp: '14:22:18',
      type: 'threat_blocked',
      title: 'Browser Protection Active',
      description: 'Prevented access to phishing site via Chrome extension',
      severity: 'info'
    },
    {
      timestamp: '14:18:55',
      type: 'attack_detected',
      title: 'XSS Attempt Neutralized',
      description: 'Cross-site scripting blocked from 10.0.0.45',
      severity: 'warning'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'threat_blocked': return <Shield className="h-4 w-4 text-cyber-success" />;
      case 'url_analyzed': return <Globe className="h-4 w-4 text-cyber-primary" />;
      case 'attack_detected': return <AlertTriangle className="h-4 w-4 text-cyber-danger" />;
      case 'recon_completed': return <Search className="h-4 w-4 text-cyber-secondary" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-cyber-danger text-destructive-foreground';
      case 'warning': return 'bg-cyber-warning text-warning-foreground';
      case 'info': return 'bg-cyber-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTimelineColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-cyber-danger';
      case 'warning': return 'border-cyber-warning';
      case 'info': return 'border-cyber-primary';
      default: return 'border-border';
    }
  };

  return (
    <Card className="bg-gradient-cyber border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Clock className="h-5 w-5 text-cyber-primary" />
          Threat Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative flex gap-3">
              {/* Timeline connector */}
              {index !== timelineEvents.length - 1 && (
                <div className="absolute left-5 top-8 w-px h-8 bg-border" />
              )}
              
              {/* Event icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 ${getTimelineColor(event.severity)} bg-card flex items-center justify-center`}>
                {getEventIcon(event.type)}
              </div>
              
              {/* Event content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">{event.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border text-center">
          <span className="text-xs text-muted-foreground">
            Showing last 5 events • View all activity →
          </span>
        </div>
      </CardContent>
    </Card>
  );
};