'use client';

import type { ViewMode } from '@/types/patient';

interface ViewTabsProps {
	activeView: ViewMode;
	onViewChange: (view: ViewMode) => void;
}

export function ViewTabs({ activeView, onViewChange }: ViewTabsProps) {
	return (
		<div className='flex border-b border-gray-200'>
			<button
				onClick={() => onViewChange('table')}
				className={`px-6 py-3 font-medium border-b-2 transition-colors ${
					activeView === 'table'
						? 'border-blue-500 text-blue-600'
						: 'border-transparent text-gray-500 hover:text-gray-700'
				}`}>
				Table View
			</button>
			<button
				onClick={() => onViewChange('card')}
				className={`px-6 py-3 font-medium border-b-2 transition-colors ${
					activeView === 'card'
						? 'border-blue-500 text-blue-600'
						: 'border-transparent text-gray-500 hover:text-gray-700'
				}`}>
				Card View
			</button>
		</div>
	);
}
