import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Database, Code } from "lucide-react";
import { useRealTimeThreats } from "@/hooks/useRealTimeThreats";

export const AttackDetectionCard = () => {
  const { attacks, loading } = useRealTimeThreats();

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
    if (type.toLowerCase().includes('sql')) return <Database className="h-4 w-4" />;
    if (type.toLowerCase().includes('xss')) return <Code className="h-4 w-4" />;
    if (type.toLowerCase().includes('brute')) return <Zap className="h-4 w-4" />;
    return <Shield className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <Card className="bg-gradient-cyber border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5 text-cyber-primary animate-pulse" />
            Attack Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-border rounded-lg p-3">
                <div className="h-4 bg-muted/20 rounded animate-pulse mb-2" />
                <div className="h-3 bg-muted/20 rounded animate-pulse w-2/3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const blockedCount = attacks.filter(attack => attack.blocked).length;
  const activeCount = attacks.filter(attack => !attack.blocked).length;
  const successRate = attacks.length > 0 ? (blockedCount / attacks.length) * 100 : 100;

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
          {attacks.slice(0, 4).map((attack, index) => (
            <div key={attack.id || index} className="border border-border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getAttackIcon(attack.attack_type)}
                  <span className="text-sm font-medium text-foreground">{attack.attack_type}</span>
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
                <span className="text-muted-foreground">Source: {attack.source_ip}</span>
                <span className="text-muted-foreground">
                  {new Date(attack.timestamp).toLocaleTimeString()}
                </span>
              </div>
              
              {attack.description && (
                <p className="text-xs text-muted-foreground mt-1">{attack.description}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-cyber-success">{blockedCount}</div>
              <div className="text-xs text-muted-foreground">Blocked</div>
            </div>
            <div>
              <div className="text-lg font-bold text-cyber-danger">{activeCount}</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            <div>
              <div className="text-lg font-bold text-cyber-success">{successRate.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};