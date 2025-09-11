'use client';

import { Search, X, Plus, ListFilter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getMedicalIssueColors } from '@/components/ui/medical-issue-badge';
import { cn } from '@/lib/utils';
import type { SortField, SortOrder } from '@/types/patient';

interface SearchAndFiltersProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
	activeFilters: string[];
	onFilterRemove: (filter: string) => void;
	sortBy: SortField;
	sortOrder: SortOrder;
	onSortChange: (field: SortField, order: SortOrder) => void;
	medicalIssueFilters: string[];
	availableMedicalIssues: readonly string[];
	onMedicalIssueFilterAdd: (issue: string) => void;
}

export function SearchAndFilters({
	searchTerm,
	onSearchChange,
	activeFilters,
	onFilterRemove,
	sortBy,
	sortOrder,
	onSortChange,
	medicalIssueFilters,
	availableMedicalIssues,
	onMedicalIssueFilterAdd,
}: SearchAndFiltersProps) {
	const availableIssues = availableMedicalIssues.filter((issue) => !medicalIssueFilters.includes(issue));

	return (
		<div className='p-4 sm:p-6 space-y-4'>
			{/* Search Bar and Sort Controls */}
			<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between h-auto lg:h-16 gap-4 lg:gap-12'>
				<div className='flex-1 relative h-16'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-6 h-6' />
					<Input
						placeholder='Search'
						value={searchTerm}
						onChange={(e) => onSearchChange(e.target.value)}
						className='pl-10 pr-12 h-16 lg:h-full placeholder:text-base placeholder:text-blue-500 text-base'
					/>
					<div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
						<ListFilter className='w-6 h-6 text-blue-500' />
					</div>
				</div>
				<div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 lg:h-full'>
					<span className='text-lg sm:text-xl font-medium text-blue-700 whitespace-nowrap'>Sort By:</span>
					<div className='flex items-center gap-2 h-16 lg:h-full'>
						<Select
							value=''
							onValueChange={(value) => {
								if (value) {
									onMedicalIssueFilterAdd(value);
								}
							}}>
							<SelectTrigger className='w-full sm:w-fit !h-full'>
								<SelectValue placeholder='Add filter' />
							</SelectTrigger>
							<SelectContent>
								{availableIssues.length > 0 ? (
									availableIssues.map((issue) => (
										<SelectItem key={issue} value={issue}>
											<div className='flex items-center gap-2'>
												<Plus className='w-3 h-3' />
												<span className='capitalize'>{issue}</span>
											</div>
										</SelectItem>
									))
								) : (
									<SelectItem value='' disabled>
										All issues filtered
									</SelectItem>
								)}
							</SelectContent>
						</Select>
						<Select
							value={`${sortBy}-${sortOrder}`}
							onValueChange={(value) => {
								const [field, order] = value.split('-') as [SortField, SortOrder];
								onSortChange(field, order);
							}}>
							<SelectTrigger className='w-full sm:w-fit !h-full'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='patient_name-asc'>Name A-Z</SelectItem>
								<SelectItem value='patient_name-desc'>Name Z-A</SelectItem>
								<SelectItem value='age-asc'>Age Low-High</SelectItem>
								<SelectItem value='age-desc'>Age High-Low</SelectItem>
								<SelectItem value='medical_issue-asc'>Issue A-Z</SelectItem>
								<SelectItem value='medical_issue-desc'>Issue Z-A</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			{activeFilters.length > 0 && (
				<div className='flex flex-wrap gap-2'>
					{activeFilters.map((filter) => {
						let colors;
						if (filter.startsWith('Issue:')) {
							const issue = filter.replace('Issue: ', '');
							colors = getMedicalIssueColors(issue);
						} else if (filter.startsWith('Sort:')) {
							colors = {
								bg: 'bg-blue-50',
								text: 'text-blue-700',
								border: 'border-blue-200',
							};
						} else {
							colors = getMedicalIssueColors(filter);
						}

						return (
							<Badge
								key={filter}
								variant='outline'
								className={cn(
									'flex items-center gap-2 px-3 py-1 border-2 transition-colors',
									colors.bg,
									colors.text,
									colors.border
								)}>
								<span className='font-medium'>{filter}</span>
								<button
									onClick={() => onFilterRemove(filter)}
									className='hover:bg-white rounded-full p-0.5 transition-colors'
									aria-label={`Remove ${filter} filter`}>
									<X className='w-3 h-3' />
								</button>
							</Badge>
						);
					})}
				</div>
			)}
		</div>
	);
}
