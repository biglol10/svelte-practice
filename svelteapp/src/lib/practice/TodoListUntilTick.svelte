<svelte:options immutable={true} />

<script>
	import Button from './Button.svelte';
	import { createEventDispatcher, onDestroy, onMount, beforeUpdate, afterUpdate } from 'svelte';

	onMount(() => {
		console.log('Mounted');
		return () => {
			console.log('Destroyed 2');
		};
	});

	onDestroy(() => {
		console.log('Destroyed');
	});

	beforeUpdate(() => {
		if (listDiv) {
			console.log('beforeUpdate: ', listDiv.offsetHeight);
		}
	});
	afterUpdate(() => {
		console.log('afterUpdate: ', listDiv.offsetHeight);
		// autoScroll로 관리하는 이유는 모든 타이밍에 스크롤을 움직이면 렌더링이 너무 많이 되기 때문. 즉, 타이핑 할 때마다 스크롤이 내려감.
		if (autoScroll) listDiv.scrollTo(0, listDiv.scrollHeight);
		autoScroll = false;
	});

	export let todos = [];
	let prevTodos = todos;

	$: {
		autoScroll = prevTodos.length < todos.length;
		prevTodos = todos;
	}

	export const readonly = 'read only';

	export function clearInput() {
		inputText = '';
	}
	export function focusInput() {
		input.focus();
	}
	let inputText = '';
	let input, listDiv, autoScroll, listDivScrollHeight;

	const dispatch = createEventDispatcher();

	function handleAddTodo() {
		const isNotCancelled = dispatch(
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
		dispatch('removetodo', {
			id,
		});
	}

	function handleToggleTodo(id, value) {
		dispatch('toggletodo', {
			id,
			value,
		});
	}
</script>

{listDivScrollHeight}
<div class="todo-list-wrapper">
	<div class="todo-list" bind:this={listDiv}>
		<!-- Trick, we are getting scroll height of todo-list div by getting offset height of its content -->
		<div bind:offsetHeight={listDivScrollHeight}>
			<ul>
				{#each todos as { id, title, completed } (id)}
					<li>
						<label>
							<input
								on:input={(event) => {
									event.currentTarget.checked = completed;
									handleToggleTodo(id, !completed);
								}}
								type="checkbox"
								checked={completed}
							/>
							{title}
						</label>
						<button on:click={() => handleRemoveTodo(id)}>Remove</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
		<input bind:this={input} bind:value={inputText} />
		<Button type="submit" disabled={!inputText}>Add</Button>
	</form>
</div>

<style>
	.todo-list {
		max-height: 150px;
		overflow: auto;
	}
</style>
