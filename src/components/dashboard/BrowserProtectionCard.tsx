import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chrome, Globe, Shield, Users } from "lucide-react";
import { useRealTimeThreats } from "@/hooks/useRealTimeThreats";

export const BrowserProtectionCard = () => {
  const { browserSessions, loading } = useRealTimeThreats();

  const getBrowserIcon = (browser: string) => {
    switch (browser) {
      case 'Chrome': return <Chrome className="h-4 w-4 text-cyber-primary" />;
      case 'Firefox': return <Globe className="h-4 w-4 text-cyber-secondary" />;
      default: return <Shield className="h-4 w-4 text-cyber-accent" />;
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-cyber border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5 text-cyber-primary animate-pulse" />
            Browser Protection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="border border-border rounded-lg p-3">
                <div className="h-4 bg-muted/20 rounded animate-pulse mb-3" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-12 bg-muted/20 rounded animate-pulse" />
                  <div className="h-12 bg-muted/20 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalUsers = browserSessions.reduce((sum, session) => sum + session.user_count, 0);
  const totalBlocked = browserSessions.reduce((sum, session) => sum + session.threats_blocked, 0);
  const protectionRate = totalUsers > 0 ? ((totalUsers - totalBlocked) / totalUsers) * 100 : 0;

  return (
    <Card className="bg-gradient-cyber border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Shield className="h-5 w-5 text-cyber-primary" />
          Browser Protection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {browserSessions.map((session, index) => (
            <div key={session.id || index} className="border border-border rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getBrowserIcon(session.browser_type)}
                  <span className="text-sm font-medium text-foreground">{session.browser_type} Extension</span>
                </div>
                <Badge className={session.status === 'active' ? 'bg-cyber-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
                  {session.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-lg font-bold text-foreground">{session.user_count.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Active Users</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-lg font-bold text-cyber-danger">{session.threats_blocked}</div>
                    <div className="text-xs text-muted-foreground">Threats Blocked</div>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mt-2">
                Last active: {new Date(session.last_active).toLocaleString()}
              </div>
            </div>
          ))}
          
          {browserSessions.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No browser sessions found</p>
              <p className="text-xs text-muted-foreground mt-1">Install browser extensions to start monitoring</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyber-primary mb-1">
              {totalUsers.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Total Protected Users</div>
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Protection Coverage</span>
              <span>{protectionRate.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-500 shadow-glow" 
                style={{ width: `${protectionRate}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};