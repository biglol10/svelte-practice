<script>
	import TodoList from './lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';

	let todoList;

	// make it let to bind to the TodoList component (prop-binding)
	let todos = [
		{
			id: uuid(),
			title: 'Todo 1',
			completed: true,
		},
		{
			id: uuid(),
			title: 'Todo 2',
			completed: false,
		},
		{
			id: uuid(),
			title: 'Todo 3',
			completed: true,
		},
	];

	function handleAddTodo(event) {
		event.preventDefault(); // prevent further logics after dispatch
		console.log(event.detail);

		// because we are mutating the same array, we will not see the change in the TodoList component
		// so we need to create a new array
		// or if you use <svelte:options immutable={true} /> in TodoList.svelte, you can mutate the same array
		setTimeout(() => {
			todos = [
				...todos,
				{
					id: uuid(),
					title: event.detail.title,
					completed: false,
				},
			];
			todoList.clearInput();
		}, 1000);
	}

	function handleRemoveTodo(event) {
		event.preventDefault();
		todos = todos.filter((t) => t.id !== event.detail.id);
	}

	function handleToggleTodo(event) {
		todos = todos.map((todo) => {
			if (todo.id === event.detail.id) {
				return { ...todo, completed: event.detail.value };
			}
			return todo;
		});
	}
</script>

<h2>{todos.length} Todos</h2>
<!-- <TodoList bind:todos /> -->

{todoList?.readonly}
<!-- * bind:this={todoList} by doing this, we can have access to readonly props -->
<TodoList
	{todos}
	bind:this={todoList}
	on:addtodo={handleAddTodo}
	on:removetodo={handleRemoveTodo}
	on:toggletodo={handleToggleTodo}
/>

<button
	on:click={() => {
		todoList.focusInput();
	}}>Focus input</button
>
