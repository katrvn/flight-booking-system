import { InjectionToken } from "@angular/core";

export interface AppConfig {
    mockDataFilePath: string;
    mockDataFileName: mockDataFileName;
}

interface mockDataFileName {
    flightSchedule: string;
    flightOrders: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');