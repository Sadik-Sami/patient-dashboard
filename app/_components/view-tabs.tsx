import type { ViewMode } from '@/types/patient';
import { ListFilter } from 'lucide-react';

interface ViewTabsProps {
	activeView: ViewMode;
	activeFilters: string[];
	onViewChange: (view: ViewMode) => void;
}

export function ViewTabs({ activeView, onViewChange, activeFilters }: ViewTabsProps) {
	return (
		<div className='flex flex-col items-start sm:flex-row sm:items-center sm:justify-between px-4 sm:px-8 gap-3 sm:gap-0'>
			<div>
				<button
					onClick={() => onViewChange('table')}
					className={`px-6 py-3 border-b-2 transition-colors text-base ${
						activeView === 'table' ? 'border-blue-500 font-semibold' : 'border-b-2 text-gray-500 hover:text-gray-700'
					}`}>
					Table View
				</button>
				<button
					onClick={() => onViewChange('card')}
					className={`px-6 py-3 border-b-2 transition-colors text-base ${
						activeView === 'card' ? 'border-blue-500 font-semibold' : 'border-b-2 text-gray-500 hover:text-gray-700'
					}`}>
					Card View
				</button>
			</div>
			<div className='flex justify-center sm:justify-end'>
				<div className='flex items-center gap-2 text-sm sm:text-base'>
					<ListFilter className='w-4 h-4 text-blue-500' />
					<span>Active Filters: {activeFilters.length}</span>
				</div>
			</div>
		</div>
	);
}
