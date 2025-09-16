import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Server, Globe, Lock, FileText } from "lucide-react";
import { useRealTimeThreats } from "@/hooks/useRealTimeThreats";

export const ReconResultsCard = () => {
  const { reconResults, loading } = useRealTimeThreats();

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-cyber-danger text-destructive-foreground';
      case 'medium': return 'bg-cyber-warning text-warning-foreground';
      case 'low': return 'bg-cyber-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-cyber border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Search className="h-5 w-5 text-cyber-primary animate-pulse" />
            External Reconnaissance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="border border-border rounded-lg p-3 space-y-3">
                <div className="h-4 bg-muted/20 rounded animate-pulse" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-3 bg-muted/20 rounded animate-pulse" />
                  <div className="h-3 bg-muted/20 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-cyber border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Search className="h-5 w-5 text-cyber-primary" />
          External Reconnaissance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reconResults.slice(0, 2).map((result, index) => (
            <div key={result.id || index} className="border border-border rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-cyber-primary" />
                  <span className="text-sm font-medium text-foreground">{result.domain}</span>
                </div>
                <Badge className={getRiskColor(result.risk_level)}>
                  {result.risk_level.toUpperCase()} RISK
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Server className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">IP:</span>
                  <span className="text-foreground font-mono">{result.ip_address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className={`h-3 w-3 ${result.ssl_valid ? 'text-cyber-success' : 'text-cyber-danger'}`} />
                  <span className="text-muted-foreground">SSL:</span>
                  <span className={result.ssl_valid ? 'text-cyber-success' : 'text-cyber-danger'}>
                    {result.ssl_valid ? 'Valid' : 'None'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="text-center">
                  <div className="text-sm font-bold text-foreground">{result.open_ports.length}</div>
                  <div className="text-muted-foreground">Open Ports</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-foreground">{result.subdomains_count}</div>
                  <div className="text-muted-foreground">Subdomains</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-bold ${result.vulnerabilities_count > 0 ? 'text-cyber-danger' : 'text-cyber-success'}`}>
                    {result.vulnerabilities_count}
                  </div>
                  <div className="text-muted-foreground">Vulnerabilities</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {result.open_ports.slice(0, 5).map((port, portIndex) => (
                  <Badge key={portIndex} variant="outline" className="text-xs">
                    Port {port}
                  </Badge>
                ))}
                {result.open_ports.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{result.open_ports.length - 5} more
                  </Badge>
                )}
              </div>
              
              <div className="text-xs text-muted-foreground">
                Scanned: {new Date(result.scanned_at).toLocaleString()}
              </div>
            </div>
          ))}
          
          {reconResults.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No reconnaissance results</p>
              <p className="text-xs text-muted-foreground mt-1">Scans will appear here when suspicious domains are detected</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>
              {reconResults.length > 0 
                ? `${reconResults.length} domains scanned • Real-time monitoring`
                : 'Monitoring for suspicious domains'
              }
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};