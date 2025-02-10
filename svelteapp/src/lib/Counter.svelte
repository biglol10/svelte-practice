<!-- <script>
	let count1 = 0;
	let count2 = 0;

	// Not going to work
	function getTotal() {
		return count1 + count2;
	}

	function setCount2(x) {
		count2 = x;
	}

	// This will not update when the count1 changes because script will only run once. You have to use reactive statements to update the string.
	let string = `Count total is ${getTotal()}`;

	console.log('initialized');

	// reactive statement
	// inside of this reactive statement, any value that we depend on will make this statement run again if value changes
	// when you initialize your component, any javascript inside of the script tag will run first, and then the reactive statements will run
	$: {
		console.log(`The count1 is ${count1}`);
	}

	$: string = `Count total is ${getTotal()}`;

	$: if (count1 > 10) {
		console.log('Count1 is greater than 10');
	}

	// the order of the reactive statements matters
	$: setCount2(count1);
	$: string2 = `Count2 is ${count2}`;

	function increment1() {
		count1 += 1;
	}

	function increment2() {
		count2 += 1;
	}
</script>

<button on:click={increment1}>Clicks {count1}</button>
<button on:click={increment2}>Clicks {count2}</button>
<h3>{string}</h3>
<h3>{string2}</h3> -->

<script>
	export let initialCount;
	export let maxCount = 10; // maxCount = undefined

	let count = initialCount;

	function increment() {
		if (count === maxCount) return;
		count += 1;
	}
</script>

<button on:click={increment}>Clicks {count}</button>

<style>
	button {
		padding: 10px;
	}
</style>
