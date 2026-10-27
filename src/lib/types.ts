export interface NodeData {
  node_id: string;
  name: string;
  type: string;
  timestamp: number;
  online: boolean;
  data: {
    spo2?: number;
    heart_rate?: number;
    temperature?: number;
    humidity?: number;
    presence?: boolean;
    gas_ppm?: number;
  };
}

export type GatewayStatus = 'online' | 'offline' | 'warning' | 'critical';

export interface AlertLog {
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: number;
}