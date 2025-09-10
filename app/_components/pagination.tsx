'use client';

import {
	Pagination as ShadcnPagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
	const getVisiblePages = (): (number | 'ellipsis')[] => {
		const delta = 2;
		const range: number[] = [];
		const rangeWithDots: (number | 'ellipsis')[] = [];

		for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, 'ellipsis');
		} else {
			rangeWithDots.push(1);
		}

		rangeWithDots.push(...range);

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push('ellipsis', totalPages);
		} else if (totalPages > 1) {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};

	if (totalPages <= 1) return null;

	return (
		<ShadcnPagination className='py-6'>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href='#'
						onClick={(e) => {
							e.preventDefault();
							if (currentPage > 1) onPageChange(currentPage - 1);
						}}
						className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
					/>
				</PaginationItem>

				{getVisiblePages().map((page, index) => (
					<PaginationItem key={index}>
						{page === 'ellipsis' ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								href='#'
								onClick={(e) => {
									e.preventDefault();
									onPageChange(page);
								}}
								isActive={page === currentPage}>
								{page}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						href='#'
						onClick={(e) => {
							e.preventDefault();
							if (currentPage < totalPages) onPageChange(currentPage + 1);
						}}
						className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
					/>
				</PaginationItem>
			</PaginationContent>
		</ShadcnPagination>
	);
}
