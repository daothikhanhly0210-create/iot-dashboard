import { NodeData } from './types';

export const generateMockData = (): NodeData[] => {
  const nodes: NodeData[] = [];

  for (let i = 1; i <= 3; i++) {
    let data: NodeData['data'];

    if (i === 1) {
      // Node 1: SpO2 & Heart Rate (deterministic for build)
      data = {
        spo2: 98,
        heart_rate: 72,
      };

      // Random chance for dangerous values - use deterministic fallback
      const dangerous = i === 1 ? false : false;
      if (dangerous) {
        data.spo2 = 85;
        data.heart_rate = 115;
      }
    } else if (i === 2) {
      // Node 2: Temperature, Humidity, Presence
      data = {
        temperature: 36.8,
        humidity: 52,
        presence: true,
      };
    } else {
      // Node 3: Gas PPM
      data = {
        gas_ppm: 450,
      };
    }

    nodes.push({
      node_id: `Node ${i}`,
      name: `Node ${i}`,
      type: i === 1 ? 'vital' : i === 2 ? 'environment' : 'gas',
      timestamp: 1735689600000,
      online: true,
      data,
    });
  }

  return nodes;
};