import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ThreatDetection, AttackLog, URLAnalysis, ReconResult, BrowserSession, ThreatStats } from '@/types/database';

export const useRealTimeThreats = () => {
  const [threats, setThreats] = useState<ThreatDetection[]>([]);
  const [attacks, setAttacks] = useState<AttackLog[]>([]);
  const [urlAnalyses, setUrlAnalyses] = useState<URLAnalysis[]>([]);
  const [reconResults, setReconResults] = useState<ReconResult[]>([]);
  const [browserSessions, setBrowserSessions] = useState<BrowserSession[]>([]);
  const [stats, setStats] = useState<ThreatStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial data fetch
    fetchInitialData();

    // Set up real-time subscriptions
    const threatsSubscription = supabase
      .channel('threats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'threat_detections' }, 
        (payload) => {
          console.log('Threat detection change:', payload);
          if (payload.eventType === 'INSERT') {
            setThreats(prev => [payload.new as ThreatDetection, ...prev.slice(0, 9)]);
          }
        })
      .subscribe();

    const attacksSubscription = supabase
      .channel('attacks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'attack_logs' }, 
        (payload) => {
          console.log('Attack log change:', payload);
          if (payload.eventType === 'INSERT') {
            setAttacks(prev => [payload.new as AttackLog, ...prev.slice(0, 9)]);
          }
        })
      .subscribe();

    const urlSubscription = supabase
      .channel('url_analysis')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'url_analyses' }, 
        (payload) => {
          console.log('URL analysis change:', payload);
          if (payload.eventType === 'INSERT') {
            setUrlAnalyses(prev => [payload.new as URLAnalysis, ...prev.slice(0, 9)]);
          }
        })
      .subscribe();

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(threatsSubscription);
      supabase.removeChannel(attacksSubscription);
      supabase.removeChannel(urlSubscription);
    };
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);

      // Fetch recent threats
      const { data: threatsData } = await supabase
        .from('threat_detections')
        .select('*')
        .order('detected_at', { ascending: false })
        .limit(10);

      // Fetch recent attacks
      const { data: attacksData } = await supabase
        .from('attack_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10);

      // Fetch URL analyses
      const { data: urlData } = await supabase
        .from('url_analyses')
        .select('*')
        .order('analyzed_at', { ascending: false })
        .limit(10);

      // Fetch recon results
      const { data: reconData } = await supabase
        .from('recon_results')
        .select('*')
        .order('scanned_at', { ascending: false })
        .limit(10);

      // Fetch browser sessions
      const { data: browserData } = await supabase
        .from('browser_sessions')
        .select('*')
        .order('last_active', { ascending: false });

      // Calculate stats
      const totalRequests = (threatsData?.length || 0) + (urlData?.length || 0);
      const blockedThreats = threatsData?.filter(t => t.blocked).length || 0;
      const criticalAlerts = attacksData?.filter(a => a.severity === 'critical').length || 0;
      const safeRequests = threatsData?.filter(t => t.status === 'safe').length || 0;

      setThreats(threatsData || []);
      setAttacks(attacksData || []);
      setUrlAnalyses(urlData || []);
      setReconResults(reconData || []);
      setBrowserSessions(browserData || []);
      setStats({
        total_requests: totalRequests,
        blocked_threats: blockedThreats,
        critical_alerts: criticalAlerts,
        safe_requests: safeRequests,
        protection_rate: totalRequests > 0 ? ((safeRequests + blockedThreats) / totalRequests) * 100 : 0,
        last_updated: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error fetching initial data:', error);
      // If tables don't exist, use mock data
      setMockData();
    } finally {
      setLoading(false);
    }
  };

  const setMockData = () => {
    // Mock data for development/demo
    setThreats([
      {
        id: '1',
        url: 'malicious-site.com',
        risk_score: 95,
        status: 'malicious',
        detected_at: new Date().toISOString(),
        source_ip: '192.168.1.100',
        threat_type: 'Malware',
        blocked: true,
        flags: ['Known Malware', 'Phishing']
      }
    ]);

    setAttacks([
      {
        id: '1',
        attack_type: 'SQL Injection',
        source_ip: '192.168.1.100',
        target: '/api/users',
        timestamp: new Date().toISOString(),
        severity: 'high',
        blocked: true,
        description: 'Attempted SQL injection on user endpoint'
      }
    ]);

    setUrlAnalyses([
      {
        id: '1',
        url: 'example-site.com',
        domain: 'example-site.com',
        risk_score: 75,
        status: 'suspicious',
        analyzed_at: new Date().toISOString(),
        ip_address: '203.0.113.42',
        ssl_valid: false,
        flags: ['Suspicious Domain', 'No SSL']
      }
    ]);

    setBrowserSessions([
      {
        id: '1',
        browser_type: 'Chrome',
        user_count: 1247,
        threats_blocked: 18,
        last_active: new Date().toISOString(),
        status: 'active'
      }
    ]);

    setStats({
      total_requests: 1247,
      blocked_threats: 23,
      critical_alerts: 8,
      safe_requests: 1216,
      protection_rate: 94.7,
      last_updated: new Date().toISOString()
    });
  };

  return {
    threats,
    attacks,
    urlAnalyses,
    reconResults,
    browserSessions,
    stats,
    loading,
    refetch: fetchInitialData
  };
};