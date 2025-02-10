import { cubicInOut } from 'svelte/easing';

export default function fade(node, {delay= 0, duration= 400, easing= cubicInOut}) {

    const originalOpacity = +getComputedStyle(node).opacity;
    // tick it is going to be a function that is going to run at every point in time during transition
    return {
        delay,
        duration,
        easing,
        tick: (t) => { // t is going to be from 0 to 1, or from 1 to 0
            node.style.opacity = t * originalOpacity;
        }
    }
}
