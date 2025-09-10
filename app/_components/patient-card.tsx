import type { Patient } from '@/types/patient';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail } from 'lucide-react';
import { MedicalIssueBadge } from '@/components/ui/medical-issue-badge';

interface PatientCardProps {
	patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
	const contact = patient.contact[0];
	const initials = patient.patient_name
		.split(' ')
		.map((name) => name[0])
		.join('')
		.toUpperCase();

	return (
		<Card className='h-full'>
			<CardContent className='p-6'>
				<div className='flex items-start gap-4 mb-4'>
					<Avatar className='w-12 h-12'>
						<AvatarImage src={patient.photo_url || undefined} alt={patient.patient_name} />
						<AvatarFallback className='bg-blue-100 text-blue-600 font-semibold'>{initials}</AvatarFallback>
					</Avatar>
					<div className='flex-1 min-w-0'>
						<h3 className='font-semibold text-gray-900 truncate'>{patient.patient_name}</h3>
						<p className='text-sm text-gray-500'>ID-{patient.patient_id.toString().padStart(4, '0')}</p>
					</div>
					<div className='bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium'>Age {patient.age}</div>
				</div>

				<div className='mb-4'>
					<MedicalIssueBadge issue={patient.medical_issue} />
				</div>

				<div className='space-y-2 text-sm text-gray-600'>
					<div className='flex items-center gap-2'>
						<MapPin className='w-4 h-4 flex-shrink-0' />
						<span className='truncate'>{contact.address}</span>
					</div>
					<div className='flex items-center gap-2'>
						<Phone className='w-4 h-4 flex-shrink-0' />
						<span className={contact.number === 'N/A' ? 'text-red-500' : ''}>{contact.number}</span>
					</div>
					<div className='flex items-center gap-2'>
						<Mail className='w-4 h-4 flex-shrink-0' />
						<span className={`truncate ${!contact.email ? 'text-red-500' : ''}`}>{contact.email || 'N/A'}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
