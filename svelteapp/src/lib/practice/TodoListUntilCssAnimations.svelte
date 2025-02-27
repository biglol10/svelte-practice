<svelte:options immutable={true} />

<script>
	import { flip } from 'svelte/animate';
	import Button from './Button.svelte';
	import { createEventDispatcher, afterUpdate } from 'svelte';
	import FaRegTrashAlt from 'svelte-icons/fa/FaRegTrashAlt.svelte';
	import { scale } from 'svelte/transition';

	afterUpdate(() => {
		if (scrollOnAdd) {
			let pos;
			if (scrollOnAdd === 'top') pos = 0;
			if (scrollOnAdd === 'bottom') pos = listDivScrollHeight;

			if (autoscroll) listDiv.scrollTo(0, pos);
			autoscroll = false;
		}
	});

	export let todos = [];
	export let error = null;
	export let isLoading = false;
	export let disableAdding = false;
	export let disabledItems = [];
	export let scrollOnAdd = undefined;

	let prevTodos = todos;
	let inputText = '';
	let input, listDiv, autoscroll, listDivScrollHeight;

	const dispatch = createEventDispatcher();

	$: {
		autoscroll = todos && prevTodos && todos.length > prevTodos.length;
		prevTodos = todos;
	}

	export function clearInput() {
		inputText = '';
	}
	export function focusInput() {
		input.focus();
	}

	function handleAddTodo() {
		const isNotCancelled = dispatch(
			'addtodo',
			{
				title: inputText,
			},
			{
				cancelable: true,
			},
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

<div class="todo-list-wrapper">
	{#if isLoading}
		<p class="state-text">Loading...</p>
	{:else if error}
		<p class="state-text">{error}</p>
	{:else if todos}
		<div class="todo-list" bind:this={listDiv}>
			<div bind:offsetHeight={listDivScrollHeight}>
				{#if todos.length === 0}
					<p class="state-text">No todos yet</p>
				{:else}
					<ul>
						{#each todos as todo, index (todo.id)}
							{@const { id, completed, title } = todo}
							<!-- ! flip animation works only when you have keys (todo.id) and element that has flip should be a direct child of the parent element -->
							<!-- ! when updating element, flip works when order of key is changed -->
							<li animate:flip={{ duration: (d) => 200 }}>
								<!-- * pass prop to slot and have access to props in components using this component -->
								<slot {todo} {index} {handleToggleTodo}>
									<!-- * to make the transitions run only when the element that has the transition is added or removed, use local -->
									<div transition:scale|local={{ start: 0.5, duration: 300 }} class:completed>
										<label>
											<input
												disabled={disabledItems.includes(id)}
												on:input={(event) => {
													event.currentTarget.checked = completed;
													handleToggleTodo(id, !completed);
												}}
												type="checkbox"
												checked={completed}
											/>
											<slot name="title">{title}</slot>
										</label>
										<button
											disabled={disabledItems.includes(id)}
											class="remove-todo-button"
											aria-label="Remove todo: {title}"
											on:click={() => handleRemoveTodo(id)}
										>
											<span style:width="10px" style:display="inline-block">
												<FaRegTrashAlt />
											</span>
										</button>
									</div>
								</slot>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	{/if}

	<form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
		<input
			disabled={disableAdding || !todos}
			bind:this={input}
			bind:value={inputText}
			placeholder="New Todo"
		/>
		<Button type="submit" disabled={!inputText || disableAdding || !todos}>Add</Button>
	</form>
</div>

<!-- * body { background-color: red; } will not work because it will be applied to only this component. If this component has body tag, it will work -->
<!-- * if you want to apply to the whole body, you need to use :global(body) { background-color: red; } -->

<!-- (https://aerotwist.com/blog/flip-your-animations/) And how this flip animation works.

So Flip stands for First, Last Invert and play.

And how it works is that it gets the initial position of your element and the final position.

So let's say we are removing this second item.

So the initial position for the element next to it is this position.

And the final position will be the position is going to be this position where it's going to overtake

the item that was removed.

So guess the initial position and the final position and then it translates the element to the initial

position.

So in our case, as we mentioned, if we are going to remove the second element, the final position

of this element is going to be here.

So it's going to translate it back to its initial position.

And then when the animation is played, it's going to remove this transition.

The transition that translated our element back to the initial position.

And therefore the element will go to the final position. -->

<style lang="scss">
	.todo-list-wrapper {
		background-color: #424242;
		border: 1px solid #4b4b4b;
		.state-text {
			margin: 0;
			padding: 15px;
			text-align: center;
		}
		.todo-list {
			max-height: 200px;
			overflow: auto;
			ul {
				margin: 0;
				padding: 10px;
				list-style: none;
				li > div {
					margin-bottom: 5px;
					display: flex;
					align-items: center;
					background-color: #303030;
					border-radius: 5px;
					padding: 10px;
					position: relative;
					label {
						cursor: pointer;
						font-size: 18px;
						display: flex;
						align-items: baseline;
						padding-right: 20px;
						input[type='checkbox'] {
							margin: 0 10px 0 0;
							cursor: pointer;
						}
					}
					&.completed > label {
						opacity: 0.5;
						text-decoration: line-through;
					}
					.remove-todo-button {
						border: none;
						background: none;
						padding: 5px;
						position: absolute;
						right: 10px;
						cursor: pointer;
						display: none;
						&:disabled {
							opacity: 0.4;
							cursor: not-allowed;
						}
						:global(svg) {
							fill: #bd1414;
						}
					}
					&:hover {
						.remove-todo-button {
							display: block;
						}
					}
				}
			}
		}
		.add-todo-form {
			padding: 15px;
			background-color: #303030;
			display: flex;
			flex-wrap: wrap;
			border-top: 1px solid #4b4b4b;
			// :global(.add-todo-button) {
			//   background-color: aqua;
			// }
			input {
				flex: 1;
				background-color: #424242;
				border: 1px solid #4b4b4b;
				padding: 10px;
				color: #fff;
				border-radius: 5px;
				margin-right: 10px;
			}
		}
	}
</style>
