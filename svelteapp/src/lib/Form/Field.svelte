<script>
	// @ts-ignore
	import { v4 as uuid } from 'uuid';
	import { getContext, onMount, hasContext, getAllContexts } from 'svelte';
	import formKey from './form-key';

	// hasContext, getAllContexts allows a child component to check if it is contained in a context and to also get all contexts

	console.log('hasContext is ', hasContext('asdf'));
	console.log('hasContext is ', hasContext(formKey));
	console.log('getAllContexts ', getAllContexts());

	export let name;
	export let type = 'text';
	export let label = undefined;
	export let validate = undefined;

	let isDirty = false;

	const formStore = getContext(formKey);

	const id = uuid();

	onMount(() => {
		// @ts-ignore
		if (validate && validate($formStore.values[name])) {
			// @ts-ignore
			$formStore.errors[name] = validate($formStore.values[name], label);
		}
	});
</script>

<div class="field">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<input
		{id}
		{name}
		{type}
		placeholder={label}
		value={$formStore.values[name] || ''}
		on:input={(e) => {
			// this will not work
			//   values[name] = e.currentTarget.value;
			//   console.log(e.currentTarget.value);

			// you can do bind:value={$formStore.values[name]}, but bind will not work if type is dynamic

			// // changed to writable store
			// $formStore.values[name] = e.currentTarget.value;

			isDirty = true;
			const value = e.currentTarget.value;
			if (validate && validate(value)) {
				$formStore.errors[name] = validate(value, label);
			} else {
				delete $formStore.errors[name];
			}
			$formStore.values[name] = value;
		}}
	/>
	{#if $formStore.errors[name] && (isDirty || $formStore.showErrors)}
		<!-- <p class="error">{$formStore.errors[name]}</p> -->
		<slot name="error" error={$formStore.errors[name]}>
			<p class="error">{$formStore.errors[name]}</p>
		</slot>
	{/if}
</div>

<style>
	div.field {
		margin-bottom: 10px;
	}
	p.error {
		color: red;
		font-size: 14px;
		margin: 5px 0 0;
	}
	label {
		display: block;
		font-size: 14px;
		margin-bottom: 5px;
	}
	input {
		height: 30px;
		width: 250px;
		max-width: 100%;
	}
</style>
