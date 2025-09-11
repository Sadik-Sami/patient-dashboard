import { type NextRequest, NextResponse } from 'next/server';
import patientsData from '@/public/patients.json';
import type { Patient } from '@/types/patient';

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);

		// Get query parameters
		const page = Number.parseInt(searchParams.get('page') || '1');
		const limit = Number.parseInt(searchParams.get('limit') || '12');
		const search = searchParams.get('search') || '';
		const medicalIssues = searchParams.getAll('medical_issues');
		const sortBy = searchParams.get('sort_by') || 'patient_name';
		const sortOrder = searchParams.get('sort_order') || 'asc';

		let filteredPatients = [...patientsData] as Patient[];

		// Apply search filter
		if (search) {
			const searchLower = search.toLowerCase();
			filteredPatients = filteredPatients.filter(
				(patient) =>
					patient.patient_name.toLowerCase().includes(searchLower) ||
					patient.contact[0]?.email?.toLowerCase().includes(searchLower) ||
					patient.contact[0]?.address?.toLowerCase().includes(searchLower)
			);
		}

		if (medicalIssues.length > 0) {
			filteredPatients = filteredPatients.filter((patient) =>
				medicalIssues.some((issue) => patient.medical_issue.toLowerCase() === issue.toLowerCase())
			);
		}

		// Apply sorting
		filteredPatients.sort((a, b) => {
			let aValue: string | number = a[sortBy as keyof Patient] as string | number;
			let bValue: string | number = b[sortBy as keyof Patient] as string | number;

			if (sortBy === 'patient_name') {
				aValue = (aValue as string).toLowerCase();
				bValue = (bValue as string).toLowerCase();
			}

			if (sortOrder === 'asc') {
				return aValue > bValue ? 1 : -1;
			} else {
				return aValue < bValue ? 1 : -1;
			}
		});

		// Apply pagination
		const startIndex = (page - 1) * limit;
		const endIndex = startIndex + limit;
		const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

		const totalPages = Math.ceil(filteredPatients.length / limit);

		return NextResponse.json({
			patients: paginatedPatients,
			total: filteredPatients.length,
			page,
			limit,
			totalPages,
		});
	} catch (error) {
		console.error('Error fetching patients:', error);
		return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
	}
}
