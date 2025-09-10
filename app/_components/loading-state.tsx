import { Loader2 } from 'lucide-react';

export function LoadingState() {
	return (
		<div className='flex items-center justify-center py-12'>
			<Loader2 className='w-8 h-8 animate-spin text-blue-500' />
		</div>
	);
}
