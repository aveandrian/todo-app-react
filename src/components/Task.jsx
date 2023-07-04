import { Draggable } from "react-beautiful-dnd"
export default function Task({id, isCompleted, text, handleComplete, hadleDelete, index}){
    
    return (
        <Draggable draggableId={id} index={index}>
            {(provided)=>(
                <div
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`todo-item-wrapper ${isCompleted ? "completed" : ""}`}
                >
                    <div className='circle' onClick={()=>handleComplete(id)}></div>
                    <p className='todo-item-text'>{text}</p>
                    <img className='todo-item-delete' src='/images/icon-cross.svg' onClick={()=>hadleDelete(id)}></img>
                </div>
            )}
        </Draggable>
    )
}