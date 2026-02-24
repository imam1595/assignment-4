
1. getElementById, getElementsByClassName, and querySelector / querySelectorAll are used to grab elements from html inside JavaScript and help to manipulate elements.

2. To create and insert a new element in html using javascript , got to follow  3 steps , firstly create a element using document.createElement('tagName') , second give it some properties like add text, classes etc , lastly insert the created element into the document using .appendchild().


3.  Event bubbling is a process where an event first occurs on a targeted element and then travels up through its parent, grandparent element and all the way to the document.

It works like,
  imagine we have button inside a div. First my click handler occurs on button , then the event travels up and triggers on the div,then the body and then up to the document.


4. Event delegation is a process that uses event bubbling to handle events on elements.

It is useful,
 because we don't have to use event handler on every element to get desire element.


5.  preventDefault() tells the browser not to perform its default behavior on a targeted element whereas the event bubbles up to the DOM tree.

stopPropagation() stops the event not to bubble up to the DOM tree.