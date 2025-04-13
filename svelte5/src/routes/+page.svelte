<script lang="ts">
	import { fly } from 'svelte/transition';
	import Header from './Header.svelte';
	import { createState } from './state.svelte';
	let formState = $state({
		answers: {},
		step: 0,
		error: ''
	});

	const QUESTIONS = [
		{
			question: 'What is your name?',
			id: 'name',
			type: 'text'
		},
		{
			question: "What's your birthday",
			id: 'birthday',
			type: 'date'
		},
		{
			question: "what's your favorite color",
			id: 'color',
			type: 'color'
		}
	];

	function nextStep(id: string) {
		if (formState.answers[id]) {
			formState.step += 1;
			formState.error = '';
		} else {
			formState.error = 'Please fill out the form input';
		}
	}

	$inspect(formState.step);

	// Will run onMount
	$effect(() => {
		console.log('on mounted');
		return () => {
			// when unmounted or destroyed
			// before effect Re-runs
			console.log('on unmounted');
		};
	});

	$effect(() => {
		// This will re-run, when formState.step has changed
		console.log('formState', formState.step);
		// DON'T create state based off other state, in effect.
		// use $derived()
		return () => {
			// before effect Re-runs
			console.log('before formState reruns', formState.step);
		};
	});

	const myState = createState();
</script>

<!-- <Header name={formState.name}>
	<p>Hello</p>
	{#snippet secondChild(name: string)}
		<p>Second child {name}</p>
	{/snippet}
</Header> -->

<Header name={formState.answers.name}></Header>

<!-- 공유가 안됨 -->
<!-- <button onclick={() => myState.up()}>Up {myState.value}</button> -->

{JSON.stringify(formState)}

<main>
	{#if formState.step >= QUESTIONS.length}
		<p>Thank you</p>
	{:else}
		<p>Step: {formState.step + 1}</p>
	{/if}

	<!-- {#if formState.step === 0}
		<div>
			<label for="name">Your name</label>
			<input type="text" id="name" bind:value={formState.name} />
		</div>
		<button
			onclick={() => {
				if (formState.name !== '') {
					formState.step += 1;
					formState.error = '';
				} else {
					formState.error = 'Name is required';
				}
			}}>Next</button
		>
	{:else if formState.step === 1}
		<div>
			<label for="birthday">Your birthday</label>
			<input type="date" id="birthday" bind:value={formState.birthday} />
		</div>
		<button
			onclick={() => {
				if (formState.birthday !== '') {
					formState.step += 1;
					formState.error = '';
				} else {
					formState.error = 'Birthday is required';
				}
			}}>Next</button
		>
	{/if} -->

	{#each QUESTIONS as { id, question, type }, idx (id)}
		{#if formState.step === idx}
			<div
				in:fly={{ x: 200, duration: 200, opacity: 0, delay: 200 }}
				out:fly={{ x: -200, duration: 200, opacity: 0 }}
			>
				{@render formStep({ question, id, type })}
			</div>
		{/if}
	{/each}

	{#if formState.error}
		<p class="error">{formState.error}</p>
	{/if}
</main>

{#snippet formStep({ question, id, type }: { question: string; id: string; type: string })}
	<article>
		<div>
			<label for={id}>{question}</label>
			<input {type} {id} bind:value={formState.answers[id]} />
		</div>
		<button onclick={() => nextStep(id)}>Next</button>
	</article>
{/snippet}

<style>
	.error {
		color: red;
	}
</style>
