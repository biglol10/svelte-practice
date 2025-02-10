<script>
	import { query_selector_all } from 'svelte/internal';
	import TodoList from './lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';
	import { tick } from 'svelte'; // returns a promise and it will resolve when the next update cycle is done, or as soon as any pending state changes have been applied to the DOM

	let todoList;
	let showList = true;

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

	async function handleAddTodo(event) {
		event.preventDefault();
		console.log('one: ', document.querySelectorAll('.todo-list ul li'));
		todos = [
			...todos,
			{
				id: uuid(),
				title: event.detail.title,
				completed: false,
			},
		];
		// like react because of batching updates we cannot see the direct change of li list
		// but if you need to, use tick
		await tick(); // wait for the next update cycle to complete. DOM to be updated
		console.log('two: ', document.querySelectorAll('.todo-list ul li'));
		todoList.clearInput();
	}

	function handleRemoveTodo(event) {
		todos = todos.filter((t) => t.id !== event.detail.id);
	}

	function handleToggleTodo(event) {
		todos = todos.map((todo) => {
			if (todo.id === event.detail.id) {
				return { ...todo, completed: event.detail.value };
			}
			return { ...todo };
		});
	}
</script>

<label>
	<input type="checkbox" bind:checked={showList} />
	Show/Hide list
</label>
{#if showList}
	<div style:max-width="400px">
		<TodoList
			{todos}
			bind:this={todoList}
			on:addtodo={handleAddTodo}
			on:removetodo={handleRemoveTodo}
			on:toggletodo={handleToggleTodo}
		/>
	</div>
{/if}

<style>
</style>
