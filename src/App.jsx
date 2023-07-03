
import './App.css'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

function App() {
  const [isLightTheme, setIsLightTheme] = useState(true)
  const [newTodo, setNewTodo] = useState('')
  const [todoList, setTodoList] = useState([])
  const [activeFilter, setActiveFilter] = useState(null)
  const [leftCounter, setLeftCounter] = useState(null)

  useEffect(()=>{
    setLeftCounter(todoList.filter(item => item.isCompleted == false).length)
  }, [todoList])

  function handleSubmit(e){
    e.preventDefault()
    if(newTodo == '')
      return
    setTodoList(prev => ([...prev, {
      id: nanoid(),
      text: newTodo,
      isCompleted: false
    }]))
    setActiveFilter(null)
    setNewTodo('')
  }

  function handleChange(e){
    setNewTodo(e.target.value)
  }

  function toggleTheme(){
    setIsLightTheme(prev=>!prev)
  }

  function hadleDelete(id){
    setTodoList(prev => prev.filter(item => item.id != id))
  }

  function handleComplete(id){
    setTodoList(prev => prev.map(item => item.id == id ? {...item, isCompleted: !item.isCompleted} : item))
  }


  function clearCompleted(){
    setTodoList(prev => prev.filter(item => item.isCompleted == false))
    setActiveFilter(null)
  }

  return (
    <main data-theme={isLightTheme ? "light" : "dark"}>
      <div className='bg-main'></div>
      <section className='todo-app'>
        <section className='header'>
          <h1 className='title'>Todo</h1> 
          <img className='theme-selector' src={`/images/icon-${isLightTheme ? "moon" : "sun"}.svg`} onClick={toggleTheme}></img>
        </section> 
        <section className='input-wrapper'>
          <div className='circle'></div>
          <form className='input-form'>
            <input className='new-todo-input' type='text' placeholder='Create a new todo...' value={newTodo} onChange={handleChange}  />
            <input type='submit' className='new-todo-submit' onClick={handleSubmit} />
          </form>
        </section>
        <section className='todo-list'>
          {todoList.map((todoItem, i) => {
            if(activeFilter == 'active' && todoItem.isCompleted == false || activeFilter == 'completed' && todoItem.isCompleted || activeFilter == null)
              return (
                  <div className={`todo-item-wrapper ${i == 0 ? "first" : ""} ${todoItem.isCompleted ? "completed" : ""}`} key={todoItem.id}>
                    <div className='circle' onClick={()=>handleComplete(todoItem.id)}></div>
                    <p className='todo-item-text'>{todoItem.text}</p>
                    <img className='todo-item-delete' src='/images/icon-cross.svg' onClick={()=>hadleDelete(todoItem.id)}></img>
                  </div>
              )
            })
          }
          {todoList.length > 0 && (
            <div className='todo-controls-wrapper'>
              <p className='todo-left'>{leftCounter} items left</p>
              <div className='todo-filter'>
                <p className={`filter-item ${!activeFilter ? 'active' : ""}`} onClick={()=>setActiveFilter(null)}>All</p>
                <p className={`filter-item ${activeFilter == 'active' ? 'active' : ""}`} onClick={()=>setActiveFilter('active')}>Active</p>
                <p className={`filter-item ${activeFilter == 'completed'  ? 'active' : ""}`} onClick={()=>setActiveFilter('completed')}>Completed</p>
              </div>
              <p className='clear-completed' onClick={clearCompleted}>Clear completed</p>
            </div>
          )}
        </section>
      </section>
      <p className='help'>Drag and drop to reorder list</p>

      <section className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://github.com/aveandrian">aveandrian</a>.
      </section>
    </main>
  )
}

export default App
