import React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import data from './initial-data';
import { Column } from './components';

const Container = styled.div`
	padding: 20px;
	background-color: ${(props) => (props.isDraggingOver ? 'lightgray' : 'white')};
`;

const InnerList = React.memo(({ column, tasksMap, index }) => {
	const tasks = useMemo(
		() => column.componentIds.map((taskId) => tasksMap[taskId]),
		[column, tasksMap],
	);
	return <Column column={column} tasks={tasks} index={index} />;
});

const App = () => {
	const [initialData, updateInitialData] = useState(data);

	useEffect(() => {
		console.log(window.navigator.userAgentData.mobile);
	}, [])

	const onDragEnd = useCallback(
		(result) => {
			document.body.style.color = 'inherit';
			const { destination, source, draggableId, type } = result;

			// USER CANCEL DESTIONATION ITEM
			if (!destination) {
				return;
			}

			// USER DONT CHANGE ITEM DESTINATION
			if (
				destination.droppableId === source.draggableId &&
				destination.index === source.index
			) {
				return;
			}

			if (type === 'column') {
				const newColumnOrder = Array.from(initialData.columnOrder);
				newColumnOrder.splice(source.index, 1);
				newColumnOrder.splice(destination.index, 0, draggableId);

				const newState = {
					...initialData,
					columnOrder: newColumnOrder,
				};

				updateInitialData(newState);

				return;
			}

			const start = initialData.columns[source.droppableId];
			const finish = initialData.columns[destination.droppableId];

			if (start === finish) {
				const newcomponentIds = Array.from(start.componentIds);
				newcomponentIds.splice(source.index, 1);
				newcomponentIds.splice(destination.index, 0, draggableId);

				const newColumn = {
					...start,
					componentIds: newcomponentIds,
				};

				updateInitialData((prevInitialData) => {
					const newInitialData = { ...prevInitialData };
					newInitialData.columns[newColumn.id] = newColumn;
					return newInitialData;
				});

				return;
			}

			// Moving from one list to another

			const startcomponentIds = Array.from(start.componentIds);
			startcomponentIds.splice(source.index, 1);
			const newStart = {
				...start,
				componentIds: startcomponentIds,
			};

			const finishcomponentIds = Array.from(finish.componentIds);
			finishcomponentIds.splice(destination.index, 0, draggableId);
			const newFinish = {
				...finish,
				componentIds: finishcomponentIds,
			};

			updateInitialData((prevInitialData) => {
				const newInitialData = { ...prevInitialData };
				newInitialData.columns[newStart.id] = newStart;
				newInitialData.columns[newFinish.id] = newFinish;
				return newInitialData;
			});
		},
		[initialData],
	);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='all-columns' type='column'>
				{(provided, snapshot) => (
					<Container
						{...provided.droppableProps}
						innerRef={provided.innerRef}
						isDraggingOver={snapshot.isDraggingOver}>
						{initialData.columnOrder.map((columnId, index) => {
							const column = initialData.columns[columnId];
							return (
								<InnerList
									key={column.id}
									column={column}
									tasksMap={initialData.tasks}
									index={index}
								/>
							);
						})}
						{provided.placeholder}
					</Container>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default App;
