'use client';

import { useState, useEffect } from 'react';
import type { SortField, SortOrder, ViewMode } from '@/types/patient';

export function usePatientFilters() {
	const [viewMode, setViewMode] = useState<ViewMode>('card');
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState<SortField>('patient_name');
	const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
	const [activeFilters, setActiveFilters] = useState<string[]>(['Option 1', 'Option 2', 'Option 3', 'Option 4']);

	// Reset page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, sortBy, sortOrder, viewMode]);

	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
	};

	const handleSortChange = (field: SortField, order: SortOrder) => {
		setSortBy(field);
		setSortOrder(order);
	};

	const handleFilterRemove = (filter: string) => {
		setActiveFilters((prev) => prev.filter((f) => f !== filter));
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
		handleSearchChange,
		handleSortChange,
		handleFilterRemove,
		handlePageChange,
		handleViewModeChange,
	};
}
