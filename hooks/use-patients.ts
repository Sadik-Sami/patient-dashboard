'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Patient, PatientsResponse, SortField, SortOrder } from '@/types/patient';

interface UsePatientsParams {
	searchTerm: string;
	sortBy: SortField;
	sortOrder: SortOrder;
	currentPage: number;
	limit: number;
}

export function usePatients({ searchTerm, sortBy, sortOrder, currentPage, limit }: UsePatientsParams) {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [totalPatients, setTotalPatients] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	const fetchPatients = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const params = new URLSearchParams({
				page: currentPage.toString(),
				limit: limit.toString(),
				search: searchTerm,
				sort_by: sortBy,
				sort_order: sortOrder,
			});

			const response = await fetch(`/api/patients?${params}`);
			if (!response.ok) {
				throw new Error('Failed to fetch patients');
			}

			const data: PatientsResponse = await response.json();
			setPatients(data.patients);
			setTotalPatients(data.total);
			setTotalPages(data.totalPages);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	}, [currentPage, limit, searchTerm, sortBy, sortOrder]);

	useEffect(() => {
		fetchPatients();
	}, [fetchPatients]);

	return {
		patients,
		loading,
		error,
		totalPatients,
		totalPages,
		refetch: fetchPatients,
	};
}
