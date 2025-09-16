import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useRealTimeThreats } from "@/hooks/useRealTimeThreats";

export const ThreatOverviewCard = () => {
  const { stats, loading } = useRealTimeThreats();

  if (loading) {
    return (
      <Card className="bg-gradient-cyber border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5 text-cyber-primary animate-pulse" />
            Threat Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-20 bg-muted/20 rounded animate-pulse" />
            <div className="h-16 bg-muted/20 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

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
              <span className="text-2xl font-bold text-foreground">{stats.total_requests.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Blocked Threats</span>
              <span className="text-xl font-semibold text-cyber-danger flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                {stats.blocked_threats}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Critical Alerts</span>
              <span className="text-xl font-semibold text-cyber-warning flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                {stats.critical_alerts}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Safe Requests</span>
              <span className="text-xl font-semibold text-cyber-success flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                {stats.safe_requests}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Protection Rate</span>
            <span>{stats.protection_rate.toFixed(1)}% Secure</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-success h-2 rounded-full transition-all duration-500" 
              style={{ width: `${stats.protection_rate}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            Last updated: {new Date(stats.last_updated).toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};