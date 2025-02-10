<script>
	import TodoList from './lib/TodoList.svelte';
	import { stringify, v4 as uuid } from 'uuid';
	import { tick, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { slide, blur } from 'svelte/transition';
	import { cubicInOut, bounceInOut } from 'svelte/easing';

	let todoList;
	let showList = true;

	let todos = null;
	let error = null;
	let isLoading = false;
	let isAdding = false;
	let disabledItems = [];
	let scrollOnAdd = 'top';
	onMount(() => {
		loadTodos();
	});

	async function loadTodos() {
		isLoading = true;
		await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then(async (response) => {
			if (response.ok) {
				todos = await response.json();
			} else {
				error = 'An error has occurred';
			}
		});
		isLoading = false;
	}

	async function handleAddTodo(event) {
		event.preventDefault();
		isAdding = true;

		await fetch('https://jsonplaceholder.typicode.com/todos', {
			method: 'POST',
			body: JSON.stringify({
				title: event.detail.title,
				completed: false,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}).then(async (response) => {
			if (response.ok) {
				const todo = await response.json();
				if (scrollOnAdd === 'top') {
					todos = [{ ...todo, id: uuid() }, ...todos];
				} else {
					todos = [...todos, { ...todo, id: uuid() }];
				}
				todoList.clearInput();
			} else {
				alert('An error has occurred');
			}
		});

		isAdding = false;
		await tick();
		todoList.focusInput();
	}

	async function handleRemoveTodo(event) {
		const id = event.detail.id;
		if (disabledItems.includes(id)) return;
		disabledItems = [...disabledItems, id];
		await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'DELETE',
		}).then((response) => {
			if (response.ok) {
				todos = todos.filter((t) => t.id !== id);
			} else {
				alert('An error has occurred');
			}
		});
		disabledItems = disabledItems.filter((itemId) => itemId !== id);
	}

	async function handleToggleTodo(event) {
		const id = event.detail.id;
		const value = event.detail.value;
		if (disabledItems.includes(id)) return;
		disabledItems = [...disabledItems, id];
		await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				completed: value,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}).then(async (response) => {
			if (response.ok) {
				const updatedTodo = await response.json();
				todos = todos.map((todo) => {
					if (todo.id === id) {
						return updatedTodo;
					}
					return { ...todo };
				});
			} else {
				alert('An error has occurred');
			}
		});
		disabledItems = disabledItems.filter((itemId) => itemId !== id);
	}
</script>

<!-- * have access to slot prop using let keywork (let:todo) -->
<label>
	<input type="checkbox" bind:checked={showList} />
	Show/Hide list
</label>

<!-- * import { fade, fly } from 'svelte/transition'; transition:fade={{ delay: 500, duration: 300 }}; transition:fly={{ y: 20, duration: 300 }} -->
<!-- * in transition and out transition can be different -->
{#if showList}
	<div
		in:slide={{ duration: 700, easing: cubicInOut }}
		out:blur={{ amount: 10, duration: 700 }}
		on:introstart={() => console.log('introstart')}
		on:introend={() => console.log('introend')}
		on:outrostart={() => console.log('outrostart')}
		on:outroend={() => console.log('outroend')}
		style:max-width="400px"
	>
		<TodoList
			{todos}
			{error}
			{isLoading}
			{disabledItems}
			{scrollOnAdd}
			disableAdding={isAdding}
			bind:this={todoList}
			on:addtodo={handleAddTodo}
			on:removetodo={handleRemoveTodo}
			on:toggletodo={handleToggleTodo}
			let:todo
			let:index
			let:handleToggleTodo
		>
			<span:fragment slot="title">(Pass to slot): {index + 1}- {todo.title}</span:fragment>
			<!-- {@const { id, completed, title } = todo} -->
			<!-- <Todo {todo} on:remove on:toggle /> -->
			<!-- <div>
					<input
					disabled={disabledItems.includes(id)}
					on:input={(event) => {
						event.currentTarget.checked = completed;
						handleToggleTodo(id, !completed);
					}}
					type="checkbox"
					checked={completed}
					/>
					{title}
				</div> -->
		</TodoList>
	</div>
	{#if todos}
		<p>
			Number of todos:
			<!-- Key blocks destroy and recreate their contents when the value of an expression changes.
This is useful if you want an element to play its transition whenever a value changes.
When used around components, this will cause them to be reinstantiated and reinitialised. -->
			<!-- ! span element is an inline element, so it will not be affected by the transition. So in order for the animation to work, we need to make it a block element -->
			{#key todos.length}
				<span style:display="inline-block" in:fly|local={{ y: -10 }}>{todos.length}</span>
			{/key}
		</p>
	{/if}
{/if}

<style>
</style>
