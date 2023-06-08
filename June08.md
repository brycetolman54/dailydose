# More React

## Reactivity
- We want the page to rerender in response to user interaction and server messages
- To do this, we have the shadow DOM. This updates in response to properties changing and states changing and then sends it up to the DOM with a rerender.
- Since rerender takes time, you want to update the whole shadow DOM and then bring it over. 
- This is way easier than just JS coding things to change. You just define the state, then when you change the state, the DOM will update automatically for you

## Hooks
- This helps you to enable the reactivity
- `useState` - component state
- `useEffect` - lifecycle & external events

Example: 
```
function Clicker({ initialCount }) {
  const [count, updateCount] = React.useState(initialCount);

  // This last part is wrong, see below
  return <div onClick={() => updateCount(count + 1)}>Click count: {count}</div>;
}

ReactDOM.render(<Clicker initialCount={3} />, document.getElementById('root'));


function UseEffectHookDemo() {
  React.useEffect(() => {
    console.log('rendered');
  });

  return <div>useEffectExample</div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<UseEffectHookDemo />);
```
- What causes React to rerender? 
  - If a state changes or if a parent changes. If nothing changes in the state, the DOM won't rerender
  - `useEffect` can take two parameters: a function to do when rerendered and something that makes it not rerender every time (an empty array [])
  - The second parameter, the array, takes things. Each thing in the array, when it is changed, will cause the rerender
- You can only use hooks in function components at the top level of function scope, no loops or conditional


