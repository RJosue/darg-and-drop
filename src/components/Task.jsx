import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	border: 1px solid lightgray;
	border-radius: 2px;
	padding: 8px;
	margin: 5px;
	background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};

	display: flex;
`;

const Handler = styled.div`
	width: 20px;
	height: 20px;
	background-color: orange;
	border-radius: 4px;
	margin-right: 8px;
`;

const Task = ({ task, index }) => {
	console.log('render')
	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided, snapshot) => (
				<Container
					{...provided.draggableProps}
					innerRef={provided.innerRef}
					isDragging={snapshot.isDragging}>
					<Handler {...provided.dragHandleProps} />
					{task.content}
				</Container>
			)}
		</Draggable>
	);
};

export default React.memo(Task);
