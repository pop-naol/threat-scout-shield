import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface ThreatStats {
  total: number;
  blocked: number;
  critical: number;
  safe: number;
}

export const ThreatOverviewCard = () => {
  const stats: ThreatStats = {
    total: 1247,
    blocked: 23,
    critical: 8,
    safe: 1216
  };

  return (
    <Card className="bg-gradient-cyber border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Shield className="h-5 w-5 text-cyber-primary" />
          Threat Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Requests</span>
              <span className="text-2xl font-bold text-foreground">{stats.total.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Blocked Threats</span>
              <span className="text-xl font-semibold text-cyber-danger flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                {stats.blocked}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Critical Alerts</span>
              <span className="text-xl font-semibold text-cyber-warning flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                {stats.critical}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Safe Requests</span>
              <span className="text-xl font-semibold text-cyber-success flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                {stats.safe}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Threat Level</span>
            <span>92% Secure</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-success h-2 rounded-full transition-all duration-500" 
              style={{ width: '92%' }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};