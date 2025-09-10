'use client';

import { Search, Filter, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
		<div className='p-6 space-y-4'>
			{/* Search Bar and Active Filters Count */}
			<div className='flex items-center justify-between'>
				<div className='flex-1 max-w-2xl relative'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
					<Input
						placeholder='Search'
						value={searchTerm}
						onChange={(e) => onSearchChange(e.target.value)}
						className='pl-10 pr-12'
					/>
					<Button variant='ghost' size='sm' className='absolute right-2 top-1/2 transform -translate-y-1/2'>
						<Filter className='w-4 h-4' />
					</Button>
				</div>

				<div className='flex items-center gap-4'>
					<div className='flex items-center gap-2 text-sm text-gray-600'>
						<Filter className='w-4 h-4' />
						<span>Active Filters: {activeFilters.length}</span>
					</div>

					<div className='flex items-center gap-2'>
						<span className='text-sm font-medium text-gray-700'>Filter by Issue:</span>
						<Select
							value=''
							onValueChange={(value) => {
								if (value) {
									onMedicalIssueFilterAdd(value);
								}
							}}>
							<SelectTrigger className='w-40'>
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
					</div>

					<div className='flex items-center gap-2'>
						<span className='text-sm font-medium text-gray-700'>Sort by:</span>
						<Select
							value={`${sortBy}-${sortOrder}`}
							onValueChange={(value) => {
								const [field, order] = value.split('-') as [SortField, SortOrder];
								onSortChange(field, order);
							}}>
							<SelectTrigger className='w-40'>
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
							// Sort filters get a neutral blue styling
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
									'flex items-center gap-2 px-3 py-1 border transition-colors hover:bg-opacity-80',
									colors.bg,
									colors.text,
									colors.border
								)}>
								<span className='font-medium'>{filter}</span>
								<button
									onClick={() => onFilterRemove(filter)}
									className='hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors'
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
