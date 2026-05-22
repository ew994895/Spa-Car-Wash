import { readStorage, writeStorage } from "@/app/storage";

export const STATUS_STORAGE_KEY = "spaCarWashStatus";
export const WAIT_TIME_STORAGE_KEY = "spa-wait-time-data";
export const PROMOTION_STORAGE_KEY = "spa_promotions";
export const ADMIN_SESSION_KEY = "spaCarWashAdminAuthed";

export type ServiceKey = "handWash" | "eliteWash" | "detailServices";
export type PlacementKey = "header" | "hero-top" | "above-wash" | "above-membership" | "above-detailing" | "floating-bottom";

export interface BusinessStatus {
  isOpen: boolean;
  reason: string;
  updatedAt: string;
  reopenAt?: string;
}

export interface WaitTimeEntry {
  enabled: boolean;
  waitTime: number;
  traffic: "low" | "medium" | "high" | "very-high";
}

export interface WaitTimesState {
  handWash: WaitTimeEntry;
  eliteWash: WaitTimeEntry;
  detailServices: WaitTimeEntry;
  showInHeader: boolean;
  showInDetailSection: boolean;
  lastUpdated: string;
}

export interface Promotion {
  id: string;
  active: boolean;
  title: string;
  description: string;
  discount: string;
  promoCode: string;
  ctaText: string;
  ctaLink: string;
  placement: PlacementKey;
  displayMode: "banner" | "card" | "popup";
  expiresAt?: string;
}

export const defaultStatus: BusinessStatus = {
  isOpen: true,
  reason: "",
  updatedAt: new Date().toISOString(),
};

export const defaultWaitTimes: WaitTimesState = {
  handWash: { enabled: true, waitTime: 20, traffic: "low" },
  eliteWash: { enabled: false, waitTime: 15, traffic: "low" },
  detailServices: { enabled: false, waitTime: 480, traffic: "medium" },
  showInHeader: true,
  showInDetailSection: true,
  lastUpdated: new Date().toISOString(),
};

export function readStatus() {
  return readStorage(STATUS_STORAGE_KEY, defaultStatus);
}

export function writeStatus(value: BusinessStatus) {
  writeStorage(STATUS_STORAGE_KEY, value);
  window.dispatchEvent(new Event("spa:status"));
}

export function readWaitTimes() {
  return readStorage(WAIT_TIME_STORAGE_KEY, defaultWaitTimes);
}

export function writeWaitTimes(value: WaitTimesState) {
  writeStorage(WAIT_TIME_STORAGE_KEY, value);
  window.dispatchEvent(new Event("spa:wait-times"));
}

export function readPromotions() {
  return readStorage<Promotion[]>(PROMOTION_STORAGE_KEY, []);
}

export function writePromotions(value: Promotion[]) {
  writeStorage(PROMOTION_STORAGE_KEY, value);
  window.dispatchEvent(new Event("spa:promotions"));
}
