export const environment = {
    production: false,
    apiUrl: 'http://138.68.155.159:5000',
};

export interface User {
  name: string;
  isAdmin: boolean;
  startAddress: string;
  days: any[];
}
