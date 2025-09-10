import type { Patient, ViewMode } from '@/types/patient';
import { PatientCard } from '@/app/_components/patient-card';
import { PatientTable } from '@/app/_components/patient-table';

interface PatientListProps {
	patients: Patient[];
	viewMode: ViewMode;
}

export function PatientList({ patients, viewMode }: PatientListProps) {
	if (viewMode === 'card') {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
				{patients.map((patient) => (
					<PatientCard key={patient.patient_id} patient={patient} />
				))}
			</div>
		);
	}

	return <PatientTable patients={patients} />;
}
