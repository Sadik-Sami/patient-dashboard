export interface Patient {
	patient_id: number;
	patient_name: string;
	age: number;
	photo_url: string | null;
	contact: Array<{
		address: string;
		number: string;
		email: string | null;
	}>;
	medical_issue: string;
}

export interface PatientsResponse {
	patients: Patient[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export type ViewMode = 'table' | 'card';
export type SortField = 'patient_name' | 'age' | 'medical_issue';
export type SortOrder = 'asc' | 'desc';
