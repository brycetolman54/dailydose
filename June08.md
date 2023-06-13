# More React

- You render components that oyu create so that they are inserted into the HTML
```
// That's the JSX
<div>
  Component: <Demo />
</div>
// Here is the react component
function Demo() {
  const who = 'world';
  return <b>Hello {who}</b>;
}
```

- You can pass in protperties via the JSX that will then be available for use in the react component
```
// The JSX
<div>Component: <Demo who="Walke" /></div>
// The react component
function Demo(props) {
  return <b>Hello {props.who}</b>
}
```

- `React.useState` will return the state and a function to update the state
```
const Clicker = () => {
  const [cicked, updateClicked] = React.useState(false);
  
  const onClicked = (e) => {
    updateClicked(!clicked);
  };
  
  return <p onClick = {(e) => onClicked(e)}>clicked: {`${clicked}`}</p>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clicker />);
```

- Here is how you can render things:
`ReactDOM.render(<Component />, document.getElemebtById('element'));`

## Vite
- Here is some code to start a vite application
```
npm create vite@latest demoVite -- --template react
cd demoVite
npm install
npm run dev
```

## Routing
- We have the `<BrowserRouter>` element that encompasses all, the `<NavLink>` elements that tell where we can go, and the `<Route>` elements that define the places we go to

## Reactivity
- We want the page to rerender in response to user interaction and server messages
- To do this, we have the shadow DOM. This updates in response to properties changing and states changing and then sends it up to the DOM with a rerender.
- Since rerender takes time, you want to update the whole shadow DOM and then bring it over. 
- This is way easier than just JS coding things to change. You just define the state, then when you change the state, the DOM will update automatically for you
- When parsing the JSX, the program will pay attention to the `prop` and `state` components and then rerender when those change
- These changes are asynchronous, so you can't expect to change the state on one line and access the new state on the next

## Hooks
- This helps you to enable the reactivity
- `useState` - component state
  - You can set the state and make a function to change that so it will rerender every time it changes
- `useEffect` - lifecycle & external events
  - You can set this to rerender every time a component compeltes rerendering

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
- The empty array means it rerender only the first time, if you put something in the array (a variable defined in useState) it will only rerender when those things are changed


