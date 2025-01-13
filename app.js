const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = JSON.parse(localStorage.getItem('todos')) || []; // Retrieve saved todos or initialize empty array
updateTodoList();

todoForm.addEventListener("submit", function(e){
    e.preventDefault();
    addTodo();
    
});

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        allTodos.push(todoText);
        updateTodoList();
        saveTodos();
    
        todoInput.value = "";
    }
    else{
        alert('You must enter a value to add first.');
    }
}
function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    });
}
function createTodoItem(todo, todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLI = document.createElement("li");
    todoLI.className = "todo";
    todoLI.innerHTML = `<li class="todo-1" >
                <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <img  class="checkBtn" src="images/check-mark.png">
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todo}
                </label>
                <button class="delete-button">
                    <img  src="images/bin.png">
                </button>
            </li>
            `
            const deleteBtn = todoLI.querySelector('.delete-button');
            deleteBtn.addEventListener("click", () => {
                deleteTodoItem(todoIndex);
            })
            return todoLI;
}
function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos(); 
    updateTodoList();
}
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(allTodos)); // Save the todos array to localStorage
}
    

