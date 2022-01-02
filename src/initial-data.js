const initialData = {
	tasks: {
		'component-1': { id: 'component-1', content: 'Component 1' },
		'component-2': { id: 'component-2', content: 'Component 2' },
		'component-3': { id: 'component-3', content: 'Component 3' },
		'component-4': { id: 'component-4', content: 'Component 4' },
		'component-5': { id: 'component-5', content: 'Component 5' },
		'component-6': { id: 'component-6', content: 'Component 6' },
	},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'Card 1',
			componentIds: ['component-1', 'component-2'],
		},
		'column-2': {
			id: 'column-2',
			title: 'Card 2',
			componentIds: ['component-3', 'component-4', 'component-5'],
		},
		'column-3': {
			id: 'column-3',
			title: 'Card 3',
			componentIds: ['component-6'],
		},
	},
	columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
