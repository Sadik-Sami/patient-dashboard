'use client';
import { usePatients } from '@/hooks/use-patients';
import { usePatientFilters } from '@/hooks/use-patient-filters';
import { ErrorState } from '@/app/_components/error-state';
import { LoadingState } from '@/app/_components/loading-state';
import { SearchAndFilters } from '@/app/_components/search-and-filters';
import { ViewTabs } from '@/app/_components/view-tabs';
import { Header } from '@/app/_components/header';
import { PatientList } from './_components/patient-list';

export default function PatientDirectory() {
	const {
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
	} = usePatientFilters();

	const limit = viewMode === 'card' ? 12 : 10;

	const { patients, loading, error, totalPatients, totalPages } = usePatients({
		searchTerm,
		sortBy,
		sortOrder,
		currentPage,
		limit,
	});

	if (error) {
		return <ErrorState error={error} />;
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header totalPatients={totalPatients} />

			<div className='bg-white'>
				<ViewTabs activeView={viewMode} onViewChange={handleViewModeChange} />

				<SearchAndFilters
					searchTerm={searchTerm}
					onSearchChange={handleSearchChange}
					activeFilters={activeFilters}
					onFilterRemove={handleFilterRemove}
					sortBy={sortBy}
					sortOrder={sortOrder}
					onSortChange={handleSortChange}
				/>
			</div>

			<div className='px-6 pb-6'>
				{loading ? (
					<LoadingState />
				) : (
					<>
						<PatientList patients={patients} viewMode={viewMode} />
					</>
				)}
			</div>
		</div>
	);
}
