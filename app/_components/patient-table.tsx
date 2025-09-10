import type { Patient } from '@/types/patient';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MedicalIssueBadge } from '@/components/ui/medical-issue-badge';

interface PatientTableProps {
	patients: Patient[];
}

export function PatientTable({ patients }: PatientTableProps) {
	return (
		<div className='border rounded-lg overflow-hidden'>
			<Table>
				<TableHeader>
					<TableRow className='bg-gray-50'>
						<TableHead className='font-semibold text-blue-600'>ID</TableHead>
						<TableHead className='font-semibold text-blue-600'>Name</TableHead>
						<TableHead className='font-semibold text-blue-600'>Age</TableHead>
						<TableHead className='font-semibold text-blue-600'>Medical Issue</TableHead>
						<TableHead className='font-semibold text-blue-600'>Address</TableHead>
						<TableHead className='font-semibold text-blue-600'>Phone Number</TableHead>
						<TableHead className='font-semibold text-blue-600'>Email ID</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{patients.map((patient) => {
						const contact = patient.contact[0];
						const initials = patient.patient_name
							.split(' ')
							.map((name) => name[0])
							.join('')
							.toUpperCase();

						return (
							<TableRow key={patient.patient_id} className='hover:bg-gray-50'>
								<TableCell className='font-medium'>ID-{patient.patient_id.toString().padStart(4, '0')}</TableCell>
								<TableCell>
									<div className='flex items-center gap-3'>
										<Avatar className='w-8 h-8'>
											<AvatarImage src={patient.photo_url || undefined} alt={patient.patient_name} />
											<AvatarFallback className='bg-blue-100 text-blue-600 text-xs font-semibold'>
												{initials}
											</AvatarFallback>
										</Avatar>
										<span className='font-medium'>{patient.patient_name}</span>
									</div>
								</TableCell>
								<TableCell>{patient.age}</TableCell>
								<TableCell>
									<MedicalIssueBadge issue={patient.medical_issue} />
								</TableCell>
								<TableCell className={`${!contact.address ? 'text-red-500' : ''} max-w-48 truncate`}>
									{contact.address ?? 'N/A'}
								</TableCell>
								<TableCell className={!contact.number ? 'text-red-500' : ''}>{contact.number ?? 'N/A'}</TableCell>
								<TableCell className={!contact.email ? 'text-red-500' : ''}>{contact.email || 'N/A'}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
