import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgray;
	background-color: white
	border-radius: 2px;

	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;
const Title = styled.h3`
	padding: 8px;
`;
const TaskList = styled.div`
	padding: 8px;
	background-color: ${(props) => (props.isDraggingOver ? 'lightgray' : 'white')};
	height: 100%
	display: flex;
	
`;

const InnerList = React.memo(({ tasks }) => {
	const memorizedTask = useMemo(
		() => tasks.map((task, index) => <Task key={task.id} task={task} index={index} />),
		[tasks],
	);
	return memorizedTask;
});

const Column = ({ column, tasks, index }) => {
	return (
		<Draggable draggableId={column.id} index={index}>
			{(provided) => (
				<Container {...provided.draggableProps} innerRef={provided.innerRef}>
					<Title {...provided.dragHandleProps}>{column.title}</Title>
					<Droppable droppableId={column.id} type='task' direction='horizontal'>
						{(provided, snapshot) => (
							<TaskList
								innerRef={provided.innerRef}
								{...provided.droppableProps}
								isDraggingOver={snapshot.isDraggingOver}>
								<InnerList tasks={tasks} />
								{provided.placeholder}
							</TaskList>
						)}
					</Droppable>
				</Container>
			)}
		</Draggable>
	);
};

export default React.memo(Column);
