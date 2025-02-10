// function runs once when the element is created in the DOM
// so you need to get values from new options in handleMouseDown
// you can use Tippy.js that created tooltip, popovers, dropdowns, etc
export default function longpress(node, options) {
    // console.log(node, options);
    const {duration = 2000} = options;

    let timer;

    function handleMouseDown() {
        const {duration: newDuration = 2000} = options
        timer = setTimeout(() => {
            node.dispatchEvent(new CustomEvent('longpress'))
        }, newDuration);
    }


    function handleMouseUp() {
        clearTimeout(timer)
    }

    node.addEventListener('mousedown', handleMouseDown);
    node.addEventListener('mouseup', handleMouseUp);
    

    return {
        update(newOptions) {
            console.log('new options is ', newOptions);
            options = newOptions;
        },
        destroy() {
            console.log('destroy');
            clearTimeout(timer);
            node.removeEventListener('mousedown', handleMouseDown);
            node.removeEventListener('mouseup', handleMouseUp);
        }
    }
}