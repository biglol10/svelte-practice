<script context="module">
	// This is module context
	// whatever you write in here, it is not going to run for every instance of
	// your component, it is going to run only once
	// and variables that you define here will be accessible in your components script or in your components markup
	// the variables in here are not reactive

	// whenever we initialize a new button component, our script will run,
	let totalButtons = 0;

	// component instance will have access to the variables in the context
	// but other way round is not possible

	// we can do import Button, { getTotalButtons } from '../Button.svelte';
	// we cannot do export default
	export function getTotalButtons() {
		return totalButtons;
	}
</script>

<script>
	import { onDestroy } from 'svelte';

	export let size = 'small';
	export let shadow = false;
	export let bgColor = 'inherit';
	export let textColor = 'inherit';

	console.log($$restProps);

	let isLeftHovered;

	// will not trigger re-render
	totalButtons += 1;

	onDestroy(() => {
		totalButtons -= 1;
	});
</script>

{totalButtons}
<!-- * on:click -> event forwarding-->
<!-- * can add modifiers to the event handler like preventDefault, stopPropagation, once, capture, passive, etc. -->
<button
	on:click
	style:--buttonBgColor={bgColor}
	style:--buttonTextColor={textColor}
	class:size-lg={size === 'large'}
	class:size-sm={size === 'small'}
	class:has-left={$$slots.leftContent}
	class:shadow
	{...$$restProps}
>
	{#if $$slots.leftContent}
		<div
			class="left-content"
			on:mouseenter={() => (isLeftHovered = true)}
			on:mouseleave={() => (isLeftHovered = false)}
		>
			<slot name="leftContent" />
		</div>
	{/if}
	<slot {isLeftHovered}>Fallback</slot>
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		border: none;
		background-color: var(--buttonBgColor);
		color: var(--buttonTextColor);
		font-weight: bold;
		border-radius: 5px;
		cursor: pointer;
		.left-content {
			margin-right: 10px;
		}
		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
		&:hover {
			background-image: linear-gradient(rgba(0, 0, 0, 0.4) 0 0);
		}
		&:active {
			background-image: linear-gradient(rgba(255, 255, 255, 0.1) 0 0);
		}
		&.size-sm {
			padding: 15px 20px;
		}
		&.size-lg {
			padding: 20px 25px;
			font-size: 20px;
		}
		&.shadow {
			box-shadow: 0 0 10px rgba(1, 1, 1, 0.3);
		}
	}
</style>
