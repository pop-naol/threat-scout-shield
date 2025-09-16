import { ThreatOverviewCard } from "@/components/dashboard/ThreatOverviewCard";
import { URLAnalysisCard } from "@/components/dashboard/URLAnalysisCard";
import { AttackDetectionCard } from "@/components/dashboard/AttackDetectionCard";
import { BrowserProtectionCard } from "@/components/dashboard/BrowserProtectionCard";
import { ReconResultsCard } from "@/components/dashboard/ReconResultsCard";
import { ThreatTimelineCard } from "@/components/dashboard/ThreatTimelineCard";
import { Badge } from "@/components/ui/badge";
import { Shield, Activity, Globe, AlertTriangle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-cyber p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-cyber">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">UTIWSP</h1>
              <p className="text-muted-foreground">Unified Threat Intelligence & Web Security Platform</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyber-success" />
              <Badge className="bg-cyber-success text-success-foreground">System Operational</Badge>
            </div>
            <div className="text-right">
              <div className="text-sm text-foreground font-medium">Security Score</div>
              <div className="text-2xl font-bold text-cyber-primary">94.7%</div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4 shadow-card">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-cyber-success" />
            <div>
              <div className="text-2xl font-bold text-foreground">1,247</div>
              <div className="text-xs text-muted-foreground">URLs Scanned</div>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 shadow-card">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-cyber-danger" />
            <div>
              <div className="text-2xl font-bold text-foreground">23</div>
              <div className="text-xs text-muted-foreground">Threats Blocked</div>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 shadow-card">
          <div className="flex items-center gap-3">
            <Globe className="h-8 w-8 text-cyber-primary" />
            <div>
              <div className="text-2xl font-bold text-foreground">1,679</div>
              <div className="text-xs text-muted-foreground">Protected Users</div>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 shadow-card">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-cyber-warning" />
            <div>
              <div className="text-2xl font-bold text-foreground">5</div>
              <div className="text-xs text-muted-foreground">Active Threats</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <ThreatOverviewCard />
          <BrowserProtectionCard />
        </div>
        
        {/* Middle Column */}
        <div className="space-y-6">
          <URLAnalysisCard />
          <AttackDetectionCard />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <ReconResultsCard />
          <ThreatTimelineCard />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-border text-center">
        <p className="text-muted-foreground text-sm">
          UTIWSP Dashboard v1.0 • Real-time cybersecurity monitoring • Last updated: {new Date().toLocaleTimeString()}
        </p>
      </footer>
    </div>
  );
};

export default Index;