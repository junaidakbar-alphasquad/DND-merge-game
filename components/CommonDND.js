import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';
const getListStyle = (isDraggingOver, { background, ...sx } = {}) => ({
    background:
        isDraggingOver || background ? background || '#d4d4d4' : 'transparent',
    width: '100%',
    ...sx,
});

const CommonDnd = ({
    children,
    component = 'div',
    setArray,
    array,
    id = `droppable`,
    draggable,
    sx,
}) => {
    function onDragEnd(result) {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        } else if (source?.index === destination?.index) {
            return;
        } else {
            // const updatedTemplate = JSON.parse(JSON.stringify(array));
            // try {
            //     const dragItemData = updatedTemplate.splice(source.index, 1)[0];
            //     updatedTemplate.splice(destination.index, 0, dragItemData);
            // } catch (error) {
            //     console.error(error);
            // }

            setArray(source.index, destination?.index);
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <CommonDropable component={component} id={id} sx={sx}>
                {children}
            </CommonDropable>
        </DragDropContext>
    );
};

export default CommonDnd;
export const CommonDropable = ({
    type = 'blockList',
    id = `droppable`,
    children,
    sx,
    component = 'div',
}) => {
    const Tag = component;
    return (
        <StrictModeDroppable type={type} droppableId={id}>
            {(provided, snapshot) => (
                <Tag
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver, sx)}
                    {...provided.droppableProps}
                >
                    {children}
                    {provided.placeholder}
                </Tag>
            )}
        </StrictModeDroppable>
    );
};
export const CommonDraggable = ({
    children,
    i,
    type = 'blockList',
    component = 'div',
}) => {
    const Tag = component;
    return (
        <Draggable type={type} key={i} draggableId={i?.toString()} index={i}>
            {(provided, snapshot) => (
                <Tag
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                    )}
                >
                    {children}
                </Tag>
            )}
        </Draggable>
    );
};

const StrictModeDroppable = ({ children, ...props }) => {
    const [enabled, setEnabled] = useState(false)
    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true))
        return () => {
            cancelAnimationFrame(animation)
            setEnabled(false)
        }
    }, [])
    if (!enabled) {
        return null
    }
    return <Droppable {...props}>{children}</Droppable>
}

