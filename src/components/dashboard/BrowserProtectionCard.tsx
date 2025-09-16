import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chrome, Globe, Shield, Users } from "lucide-react";

interface BrowserStats {
  browser: string;
  users: number;
  blocked: number;
  status: 'active' | 'inactive';
}

export const BrowserProtectionCard = () => {
  const browserStats: BrowserStats[] = [
    {
      browser: 'Chrome',
      users: 1247,
      blocked: 18,
      status: 'active'
    },
    {
      browser: 'Firefox',
      users: 432,
      blocked: 5,
      status: 'active'
    }
  ];

  const getBrowserIcon = (browser: string) => {
    switch (browser) {
      case 'Chrome': return <Chrome className="h-4 w-4 text-cyber-primary" />;
      case 'Firefox': return <Globe className="h-4 w-4 text-cyber-secondary" />;
      default: return <Shield className="h-4 w-4 text-cyber-accent" />;
    }
  };

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
          {browserStats.map((stats, index) => (
            <div key={index} className="border border-border rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getBrowserIcon(stats.browser)}
                  <span className="text-sm font-medium text-foreground">{stats.browser} Extension</span>
                </div>
                <Badge className={stats.status === 'active' ? 'bg-cyber-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
                  {stats.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-lg font-bold text-foreground">{stats.users.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Active Users</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-lg font-bold text-cyber-danger">{stats.blocked}</div>
                    <div className="text-xs text-muted-foreground">Threats Blocked</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyber-primary mb-1">
              {browserStats.reduce((sum, stats) => sum + stats.users, 0).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Total Protected Users</div>
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Protection Coverage</span>
              <span>94.7%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-500 shadow-glow" 
                style={{ width: '94.7%' }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};