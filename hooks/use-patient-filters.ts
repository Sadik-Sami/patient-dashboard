'use client';

import { useState, useEffect } from 'react';
import type { SortField, SortOrder, ViewMode } from '@/types/patient';

const MEDICAL_ISSUES = [
	'fever',
	'headache',
	'sore throat',
	'sprained ankle',
	'rash',
	'ear infection',
	'sinusitis',
	'allergic reaction',
	'stomach ache',
	'broken arm',
] as const;

const SORT_LABELS: Record<string, string> = {
	'patient_name-asc': 'Name A-Z',
	'patient_name-desc': 'Name Z-A',
	'age-asc': 'Age Low-High',
	'age-desc': 'Age High-Low',
	'medical_issue-asc': 'Issue A-Z',
	'medical_issue-desc': 'Issue Z-A',
};

export function usePatientFilters() {
	const [viewMode, setViewMode] = useState<ViewMode>('card');
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState<SortField>('patient_name');
	const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
	const [medicalIssueFilters, setMedicalIssueFilters] = useState<string[]>([]);

	const activeFilters = [
		// Add sort filter if not default
		...(sortBy !== 'patient_name' || sortOrder !== 'asc' ? [`Sort: ${SORT_LABELS[`${sortBy}-${sortOrder}`]}`] : []),
		// Add medical issue filters
		...medicalIssueFilters.map((issue) => `Issue: ${issue}`),
	];

	// Reset page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, sortBy, sortOrder, viewMode, medicalIssueFilters]);

	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
	};

	const handleSortChange = (field: SortField, order: SortOrder) => {
		setSortBy(field);
		setSortOrder(order);
	};

	const handleFilterRemove = (filter: string) => {
		if (filter.startsWith('Sort:')) {
			// Reset to default sort
			setSortBy('patient_name');
			setSortOrder('asc');
		} else if (filter.startsWith('Issue:')) {
			// Remove medical issue filter
			const issue = filter.replace('Issue: ', '');
			setMedicalIssueFilters((prev) => prev.filter((f) => f !== issue));
		}
	};

	const handleMedicalIssueFilterAdd = (issue: string) => {
		if (!medicalIssueFilters.includes(issue)) {
			setMedicalIssueFilters((prev) => [...prev, issue]);
		}
	};

	const handleMedicalIssueFilterRemove = (issue: string) => {
		setMedicalIssueFilters((prev) => prev.filter((f) => f !== issue));
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleViewModeChange = (mode: ViewMode) => {
		setViewMode(mode);
	};

	return {
		viewMode,
		searchTerm,
		currentPage,
		sortBy,
		sortOrder,
		activeFilters,
		medicalIssueFilters,
		availableMedicalIssues: MEDICAL_ISSUES,
		handleSearchChange,
		handleSortChange,
		handleFilterRemove,
		handleMedicalIssueFilterAdd,
		handleMedicalIssueFilterRemove,
		handlePageChange,
		handleViewModeChange,
	};
}
