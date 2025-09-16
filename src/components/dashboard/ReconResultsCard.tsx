import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Server, Globe, Lock, FileText } from "lucide-react";

interface ReconData {
  domain: string;
  ip: string;
  ports: number[];
  ssl: boolean;
  subdomains: number;
  vulnerabilities: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export const ReconResultsCard = () => {
  const reconResults: ReconData[] = [
    {
      domain: 'suspicious-site.com',
      ip: '203.0.113.42',
      ports: [80, 443, 8080],
      ssl: false,
      subdomains: 12,
      vulnerabilities: 3,
      riskLevel: 'high'
    },
    {
      domain: 'example-corp.net',
      ip: '198.51.100.15',
      ports: [443, 22],
      ssl: true,
      subdomains: 5,
      vulnerabilities: 0,
      riskLevel: 'low'
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-cyber-danger text-destructive-foreground';
      case 'medium': return 'bg-cyber-warning text-warning-foreground';
      case 'low': return 'bg-cyber-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

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
          {reconResults.map((result, index) => (
            <div key={index} className="border border-border rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-cyber-primary" />
                  <span className="text-sm font-medium text-foreground">{result.domain}</span>
                </div>
                <Badge className={getRiskColor(result.riskLevel)}>
                  {result.riskLevel.toUpperCase()} RISK
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Server className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">IP:</span>
                  <span className="text-foreground font-mono">{result.ip}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className={`h-3 w-3 ${result.ssl ? 'text-cyber-success' : 'text-cyber-danger'}`} />
                  <span className="text-muted-foreground">SSL:</span>
                  <span className={result.ssl ? 'text-cyber-success' : 'text-cyber-danger'}>
                    {result.ssl ? 'Valid' : 'None'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="text-center">
                  <div className="text-sm font-bold text-foreground">{result.ports.length}</div>
                  <div className="text-muted-foreground">Open Ports</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-foreground">{result.subdomains}</div>
                  <div className="text-muted-foreground">Subdomains</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-bold ${result.vulnerabilities > 0 ? 'text-cyber-danger' : 'text-cyber-success'}`}>
                    {result.vulnerabilities}
                  </div>
                  <div className="text-muted-foreground">Vulnerabilities</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {result.ports.map((port, portIndex) => (
                  <Badge key={portIndex} variant="outline" className="text-xs">
                    Port {port}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>Last scan: 3 minutes ago • Next scheduled: 15:00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};