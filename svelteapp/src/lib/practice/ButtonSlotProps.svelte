<script>
	export let size = 'small';
	export let shadow = false;
	export let bgColor = undefined;
	export let textColor = undefined;

	let isLeftHovered;

	console.log($$slots);
</script>

<!-- <button><slot /></button> -->
<!-- <button class={size === "large" ? "size-lg" : "size-sm"}><slot>Fallback</slot></button> -->

<!-- style="background-color: {bgColor}; color: {textColor}" -->
<!-- style:background-color={bgColor}
style:color={textColor} -->

<!-- * style:--buttonBgColor={bgColor} is useful when you use css variables and you want to override the values -->

<!-- * Note: (component composition) <slot name="leftContent" /> can be used to pass a component to the button
* like <span slot="leftContent">Left</span> from App.svelte 
* -->

<button
	style:--buttonBgColor={bgColor}
	style:--buttonTextColor={textColor}
	class:size-lg={size === 'large'}
	class:size-sm={size === 'small'}
	class:has-left={$$slots.leftContent}
	class:shadow
>
	{#if $$slots.leftContent}
		<!-- * This is named slot -->
		<div
			class="left-content"
			on:mouseenter={() => (isLeftHovered = true)}
			on:mouseleave={() => (isLeftHovered = false)}
		>
			<!-- * If you pass props to a named slot, they will only be available in the element that is using this named slot -->
			<slot name="leftContent" y="yy" />
		</div>
	{/if}
	<!-- * This is default slot -->
	<!-- * Any prop that we pass to the default slots, we can have access to the parent component using let directive -->
	<slot x="y" {isLeftHovered}>Fallback</slot>
</button>

<!-- <button
  class:size-lg={size === 'large'}
  class:size-sm={size === 'small'}
  class:shadow
>
  <slot>Fallback</slot>
</button> -->

<style lang="scss">
	// @use '../styles/variables.scss';

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
