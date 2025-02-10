import { cubicInOut } from 'svelte/easing';

// T would be a value from 0 to 1, which will represent the time of our animation after the easing function has been applied.
// So in the end, transitions D will change from 0 to 1 in the out transitions.
// it will change from 1 to 0, and so we can use this time value to do something in our animation,

export default function spin(node, {delay = 0, duration = 400, easing = cubicInOut, spin = 1 }) {
    const originalOpacity = +getComputedStyle(node).opacity; // typecast to number by +
    const originalTransform = getComputedStyle(node).transform.replace('none', '');
    return {
        delay,
        duration,
        easing,
        css: (t) => {

            return `
                opacity: ${t * originalOpacity};
                transform: ${originalTransform} scale(${t}) rotate(${spin * 360 * t}deg)
            `
        }
    }
}