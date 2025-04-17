// Types for dashboard components
import { ProfileData, FormData } from '../types';

export interface SurveyDataEntry extends FormData {
  id: string;
  timestamp: string;
  profile: ProfileData & { [key: string]: string | undefined }; // Adding index signature for dynamic keys
  phone_prefix?: string; // Optional property for phone prefix
  [key: string]: unknown; // Index signature for dynamic key access
}

export type SurveyData = Record<string, SurveyDataEntry>;
