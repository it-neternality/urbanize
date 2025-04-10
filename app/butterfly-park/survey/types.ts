// Types for the survey app

export interface ProfileData {
  fname: string;
  lname: string;
  address: string;
  address_number: string;
  phone: string;
  phone_prefix: string;
  gender: string;
  sibiling: string;
  kupat_cholim: string;
  other_address: string;
}

export interface FormData {
  profile: ProfileData;
  food: Record<string, number>;
  shops: Record<string, number>;
  services: Record<string, number>;
  pleasure: Record<string, number>;
  other: {
    comments: string;
  };
}

export interface InputField {
  key: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

export interface FieldGroup {
  title: string;
  inputs: InputField[];
}

export interface RatingItem {
  key: string;
  label: string;
  rating: number;
}

export interface RatingOption {
  value: number;
  label: string;
}

export interface ProfileStep {
  title: string;
  description: string;
  category: 'profile';
  introText: string;
  progress: number;
  fields: FieldGroup[];
}

export interface RatingStep {
  title: string;
  description: string;
  category: 'food' | 'shops' | 'services' | 'pleasure';
  progress: number;
  ratingType: boolean;
  items: RatingItem[];
  maxPoints: number;
}

export interface CommentStep {
  title: string;
  description: string;
  category: 'other';
  progress: number;
  commentType: boolean;
}

export type SurveyStep = ProfileStep | RatingStep | CommentStep;

export interface CustomAlertProps {
  message: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}
