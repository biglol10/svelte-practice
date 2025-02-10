<svelte:options immutable={true} />

<script>
	import Button from './Button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let todos = [];
	export const readonly = 'read only';
	export function clearInput() {
		inputText = '';
	}
	export function focusInput() {
		input.focus();
	}
	let inputText = '';
	let input;

	const dispatch = createEventDispatcher();

	$: console.log(todos);

	function handleAddTodo() {
		console.log(inputText);

		// the todos in App.svelte will not be changed, because todos in here is a different variable than todos passed as prop
		// check by $: console.log(todos)
		// you should use bnd:todos in App.svelte to make it synchronized (prop-binding)
		// todos = [
		// 	...todos,
		// 	{
		// 		id: uuid(),
		// 		title: inputText,
		// 		completed: false,
		// 	},
		// ];

		const isNotCancelled = dispatch(
			// if preventDefault is not stated, this value is false, else true.
			'addtodo',
			{
				title: inputText,
			},
			{ cancelable: true },
		);
		if (isNotCancelled) {
			inputText = '';
		}
	}

	function handleRemoveTodo(id) {
		dispatch('removetodo', { id });
	}

	function handleToggleTodo(id, value) {
		dispatch('toggletodo', { id, value });
	}
</script>

<!-- todos.push({id: ..., title: 'aa', completed: false}); todos = todos will not work if immutable={true} is present -->

<!-- This is a special Svelte directive that tells the Svelte compiler to treat all objects passed as props to this component as immutable (unchangeable). When you set immutable={true}, you're making a performance optimization by telling Svelte that:
The objects passed to this component will never be mutated directly

Any changes to the data will result in a new object reference
This means that Svelte can do faster change detection by simply checking if the reference to an object has changed (using ===), rather than having to deeply compare object properties to determine if anything has changed. -->

<!-- <svelte:options immutable={true} /> -->

<!-- * you can do as {id, title} -->
<!-- * {(console.log(todos), '')} in js, everything in the comma separated stuff wil run and last thing will be returned -->
<!-- ! if you do {console.log(todos)} you will see undefined in markup -->
<!-- * to add a breakpoint, do {@debug id, title} -->
<div class="todo-list-wrapper">
	<ul>
		{#each todos as { id, title, completed }, index (id)}
			{@const number = index + 1}
			<li>
				<label>
					<input
						type="checkbox"
						checked={completed}
						on:input={(event) => {
							event.currentTarget.checked = completed;
							handleToggleTodo(id, !completed);
						}}
					/>
					{title}
				</label>
				<button on:click={() => handleRemoveTodo(id)}>Remove</button>
			</li>
		{/each}
	</ul>
	{inputText}
	<form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
		<!-- * you can use on:input={(e) => {
            inputText = e.target.value;
        }} -->
		<!-- * But in svelte you can use bind:value={inputText} -->
		<input bind:this={input} bind:value={inputText} />
		<Button type="submit" disabled={!inputText}>Add</Button>
	</form>
</div>
