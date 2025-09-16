import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Database, Code } from "lucide-react";

interface Attack {
  type: string;
  source: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  blocked: boolean;
}

export const AttackDetectionCard = () => {
  const recentAttacks: Attack[] = [
    {
      type: 'SQL Injection',
      source: '192.168.1.100',
      timestamp: '14:32:15',
      severity: 'high',
      blocked: true
    },
    {
      type: 'XSS Attempt',
      source: '10.0.0.45',
      timestamp: '14:28:03',
      severity: 'medium',
      blocked: true
    },
    {
      type: 'Brute Force',
      source: '203.0.113.5',
      timestamp: '14:25:41',
      severity: 'critical',
      blocked: false
    },
    {
      type: 'CSRF Token',
      source: '172.16.0.23',
      timestamp: '14:22:18',
      severity: 'low',
      blocked: true
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-cyber-danger text-destructive-foreground';
      case 'high': return 'bg-gradient-danger text-destructive-foreground';
      case 'medium': return 'bg-cyber-warning text-warning-foreground';
      case 'low': return 'bg-cyber-neutral text-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAttackIcon = (type: string) => {
    if (type.includes('SQL')) return <Database className="h-4 w-4" />;
    if (type.includes('XSS')) return <Code className="h-4 w-4" />;
    if (type.includes('Brute')) return <Zap className="h-4 w-4" />;
    return <Shield className="h-4 w-4" />;
  };

  return (
    <Card className="bg-gradient-cyber border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Shield className="h-5 w-5 text-cyber-primary" />
          Attack Detection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentAttacks.map((attack, index) => (
            <div key={index} className="border border-border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getAttackIcon(attack.type)}
                  <span className="text-sm font-medium text-foreground">{attack.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityColor(attack.severity)}>
                    {attack.severity.toUpperCase()}
                  </Badge>
                  {attack.blocked ? (
                    <Badge className="bg-cyber-success text-success-foreground">BLOCKED</Badge>
                  ) : (
                    <Badge className="bg-cyber-danger text-destructive-foreground">ACTIVE</Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Source: {attack.source}</span>
                <span className="text-muted-foreground">{attack.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-cyber-danger">23</div>
              <div className="text-xs text-muted-foreground">Blocked</div>
            </div>
            <div>
              <div className="text-lg font-bold text-cyber-warning">5</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            <div>
              <div className="text-lg font-bold text-cyber-success">98.2%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};