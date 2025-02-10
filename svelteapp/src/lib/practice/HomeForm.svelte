<script>
	import Button from '../Button.svelte';
	import { Form, Field } from '../Form';
	import { validateEmail, validateRequiredField } from '../../lib/utils/validation';

	// let values = { username: '', email: '', password: '' };
	// let errors = {};
	// let isSubmitting = false;

	// function validate() {
	// 	const errors = {};
	// 	if (!values.username) {
	// 		errors.username = 'The Username is Required.';
	// 	}
	// 	if (!values.email) {
	// 		errors.email = 'The Email is Required.';
	// 	}
	// 	if (!values.password) {
	// 		errors.password = 'The Password is Required.';
	// 	}
	// 	if (values.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
	// 		errors.email = 'The Email is Invalid.';
	// 	}
	// 	return errors;
	// }
</script>

<!-- <form
	on:submit|preventDefault={() => {
		errors = validate();
		if (Object.keys(errors).length === 0) {
			isSubmitting = true;
			setTimeout(() => {
				isSubmitting = false;
			}, 1000);
		}
	}}
>
	<label for="username">Username:</label><br />
	<input id="username" name="username" type="text" bind:value={values.username} /><br />
	{#if errors.username}<p>{errors.username}</p>{/if}

	<label for="email">Email:</label><br />
	<input id="email" name="email" type="email" bind:value={values.email} /><br />
	{#if errors.email}<p>{errors.email}</p>{/if}

	<label for="password">Password:</label><br />
	<input id="password" name="password" type="password" bind:value={values.password} /><br />
	{#if errors.password}<p>{errors.password}</p>{/if}

	<Button type="submit" disabled={isSubmitting}>Submit</Button>
</form> -->

<Form
	on:submit={(e) => {
		console.log(e.detail);
	}}
	initialValues={{ username: 'Test', email: 'test@test.com' }}
	let:hasErrors
	let:values
	let:errors
>
	{JSON.stringify(values)}
	{JSON.stringify(errors)}
	<Field name="username" type="text" label="username" validate={validateRequiredField}>
		<p style:color="green" slot="error" let:error>{error}</p>
	</Field>
	<Field
		name="email"
		type="email"
		label="email"
		validate={(value, label) => {
			return validateRequiredField(value, label) || validateEmail(value, label);
		}}
	/>
	<Field name="password" type="password" label="password" validate={validateRequiredField} />
	<Button type="submit" disabled={hasErrors}>Submit</Button>
</Form>

<Form
	on:submit={(e) => {
		console.log(e.detail);
	}}
	let:hasErrors
>
	<Field name="username2" type="text" label="username2" validate={validateRequiredField}>
		<p style:color="green" slot="error" let:error>{error}</p>
	</Field>
	<Field name="password2" type="password" label="password2" validate={validateRequiredField} />
	<Button type="submit" disabled={hasErrors}>Submit</Button>
</Form>
