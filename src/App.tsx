import '@fortawesome/fontawesome-svg-core/styles.css';
import { faPlus, faCheck, faPencil, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface toDoItem {
  id: number;
  content: string;
  done: boolean;
  isModifying: boolean;
}
function App() {
  const [todoList, setTodoList] = useState<toDoItem[]>([]);
  const handleAddTodo = () => {
    setTodoList([...todoList, { id: todoList.length + 1, content: '', done: false, isModifying: true }]);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const updatedContentTodoItem = todoList.map((todoItem) => {
      if (todoItem.id === id) {
        return { ...todoItem, content: e.target.value };
      }
      return todoItem;
    });
    setTodoList(updatedContentTodoItem);
  };

  const handleClickDoneTodo = (id: number) => {
    const doneTodoItem = todoList.map((todoItem) => {
      if (todoItem.id === id) {
        return { ...todoItem, done: !todoItem.done };
      }
      return todoItem;
    });
    setTodoList(doneTodoItem);
  };

  const handleClickValidateTodo = (todo: toDoItem) => {
    const validatedContentTodoItem = todoList.map((todoItem) => {
      if (todoItem.id === todo.id && todoItem.content.length > 0) {
        return { ...todoItem, isModifying: false };
      }
      return todoItem;
    });
    setTodoList(validatedContentTodoItem);
  };

  const handleClickEditTodo = (id: number) => {
    const editedContentTodoItem = todoList.map((todoItem) => {
      if (todoItem.id === id) {
        return { ...todoItem, isModifying: true };
      }
      return todoItem;
    });
    setTodoList(editedContentTodoItem);
  };

  const handleClickDeleteTodo = (id: number) => {
    const deletedTodoItem = todoList.filter((todoItem) => todoItem.id !== id);
    setTodoList(deletedTodoItem);
  };

  return (
    <div className="mx-auto flex h-screen w-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mt-5 flex w-full max-w-3xl flex-col">
        <h1 className="mb-5 text-4xl"> Todo list </h1>
        {todoList.length > 0 && (
          <div className="mb-5 rounded-md border border-stone-300 p-3 shadow-md">
            {todoList.map((todo, index) => (
              <div
                data-id={todo.id}
                key={index}
                className="group flex flex-row items-center rounded-md p-3 hover:bg-gray-700 ">
                <input
                  data-testid="checkbox"
                  onClick={() => handleClickDoneTodo(todo.id)}
                  checked={todo.done}
                  className="mr-3 h-12 w-12"
                  type="checkbox"
                />
                {todo.isModifying ? (
                  <input
                    type="text"
                    value={todo.content}
                    onChange={(e) => handleChangeInput(e, todo.id)}
                    className="mr-2 w-11/12 rounded-md border border-stone-500 px-3 py-2.5 shadow-sm"
                    placeholder="Renseignez votre chose à faire"
                  />
                ) : (
                  <span data-testid="todoContent" className="mr-2 w-11/12 px-3 py-2.5 group-hover:text-white ">
                    {todo.content}
                  </span>
                )}

                {todo.isModifying ? (
                  <button
                    data-testid="validateButton"
                    onClick={() => handleClickValidateTodo(todo)}
                    className="ml-2 rounded-md bg-green-700 py-2 px-3.5 text-white shadow-sm hover:bg-green-600">
                    <FontAwesomeIcon className="text-lg" icon={faCheck} />
                  </button>
                ) : (
                  <button
                    data-testid="editButton"
                    onClick={() => handleClickEditTodo(todo.id)}
                    className="ml-2 rounded-md bg-blue-700 py-2 px-3.5 text-white shadow-sm hover:bg-blue-600">
                    <FontAwesomeIcon className="text-lg" icon={faPencil} />
                  </button>
                )}

                <button
                  data-testid="deleteButton"
                  onClick={() => handleClickDeleteTodo(todo.id)}
                  className="ml-2 rounded-md bg-red-700 py-2 px-4 text-white shadow-sm hover:bg-red-600">
                  <FontAwesomeIcon className="text-lg" icon={faTimes} />
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => handleAddTodo()}
          className="rounded-md bg-gray-700 py-2.5 text-white shadow-md hover:bg-gray-600">
          <FontAwesomeIcon className="mr-2 text-lg" icon={faPlus} />
          Ajouter une todo
        </button>
      </div>
    </div>
  );
}

export default App;
