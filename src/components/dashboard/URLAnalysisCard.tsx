import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, ExternalLink, AlertCircle } from "lucide-react";

interface URLAnalysis {
  url: string;
  riskScore: number;
  status: 'safe' | 'suspicious' | 'malicious';
  lastScanned: string;
  flags: string[];
}

export const URLAnalysisCard = () => {
  const recentAnalyses: URLAnalysis[] = [
    {
      url: "example-suspicious.com",
      riskScore: 75,
      status: 'suspicious',
      lastScanned: '2 min ago',
      flags: ['Suspicious Domain', 'No SSL']
    },
    {
      url: "trusted-site.com",
      riskScore: 15,
      status: 'safe',
      lastScanned: '5 min ago',
      flags: ['Valid SSL', 'Clean History']
    },
    {
      url: "malware-host.net",
      riskScore: 95,
      status: 'malicious',
      lastScanned: '8 min ago',
      flags: ['Known Malware', 'Phishing Detected']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-cyber-success text-success-foreground';
      case 'suspicious': return 'bg-cyber-warning text-warning-foreground';
      case 'malicious': return 'bg-cyber-danger text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 70) return 'text-cyber-danger';
    if (score >= 40) return 'text-cyber-warning';
    return 'text-cyber-success';
  };

  return (
    <Card className="bg-gradient-cyber border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Globe className="h-5 w-5 text-cyber-primary" />
          URL Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAnalyses.map((analysis, index) => (
            <div key={index} className="border border-border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground truncate max-w-[200px]">
                    {analysis.url}
                  </span>
                </div>
                <Badge className={getStatusColor(analysis.status)}>
                  {analysis.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Risk Score:</span>
                  <span className={`text-sm font-bold ${getRiskScoreColor(analysis.riskScore)}`}>
                    {analysis.riskScore}/100
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{analysis.lastScanned}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {analysis.flags.map((flag, flagIndex) => (
                  <Badge key={flagIndex} variant="outline" className="text-xs">
                    {flag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border text-center">
          <span className="text-xs text-muted-foreground">
            Analyzed 1,247 URLs in the last 24 hours
          </span>
        </div>
      </CardContent>
    </Card>
  );
};