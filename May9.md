# HTML
- You want to label your main, head file for html "index.html"
- You need to have `<!DOCTYPE html>` for the document to be seen as an html doc
- You need to have an opening and closing tag for each element (pretty much)
- `<html lang="en">`, this is `<opentag attribute=value>`
- The attributes can be in _any order_ you want
- You don't have to have an end tag if there are no children in the tag
  - You would write this as `<html lang="en"/>`
- You can write comments: `<!-- Here is a comment -->`
  - These can be multiline too, just put the `-->` at the end of the lines
- The escape character for html is &
- The **Document Object Model** (DOM) is the memory of the tree that represents our document
- Here is a tag for an image: `<img alt="beach" src="https://images.pexels.jpg" />`
  - src: This tells you the link to get the image
  - alt: This is what is read if somebody can't see the image
  - width: This modifies the width, it auto adjusts the height as well if you don't 
  - height: This adjusts the height
  - The reference can be absolute (the full URL) or it can be relative (able to access by a path, close in directory)

## Elements
| element   | meaning                                                                |
| --------- | ---------------------------------------------------------------------- |
| `html`    | The page container                                                     |
| `head`    | Header information                                                     |
| `title`   | Title of the page                                                      |
| `meta`    | Metadata for the page such as character set or viewport settings       |
| `script`  | JavaScript reference. Either a external reference, or inline           |
| `include` | External content reference                                             |
| `body`    | The entire content body of the page                                    |
| `header`  | Header of the main content                                             |
| `footer`  | Footer of the main content                                             |
| `nav`     | Navigational inputs                                                    |
| `main`    | Main content of the page                                               |
| `section` | A section of the main content                                          |
| `aside`   | Aside content from the main content                                    |
| `div`     | A block division of content                                            |
| `span`    | An inline span of content                                              |
| `h<1-9>`  | Text heading. From h1, the highest level, down to h9, the lowest level |
| `p`       | A paragraph of text                                                    |
| `b`       | Bring attention                                                        |
| `table`   | Table                                                                  |
| `tr`      | Table row                                                              |
| `th`      | Table header                                                           |
| `td`      | Table data                                                             |
| `ol,ul`   | Ordered or unordered list                                              |
| `li`      | List item                                                              |
| `a`       | Anchor the text to a hyperlink                                         |
| `img`     | Graphical image reference                                              |
| `dialog`  | Interactive component such as a confirmation                           |
| `form`    | A collection of user input                                             |
| `input`   | User input field                                                       |
| `audio`   | Audio content                                                          |
| `video`   | Video content                                                          |
| `svg`     | Scalable vector graphic content                                        |
| `iframe`  | Inline frame of another HTML page                                      |


## Input

| Element    | Meaning                          | Example                                        |
| ---------- | -------------------------------- | ---------------------------------------------- |
| `form`     | Input container and submission   | `<form action="form.html" method="post">`      |
| `fieldset` | Labeled input grouping           | `<fieldset> ... </fieldset>`                   |
| `input`    | Multiple types of user input     | `<input type="" />`                            |
| `select`   | Selection dropdown               | `<select><option>1</option></select>`          |
| `optgroup` | Grouped selection dropdown       | `<optgroup><option>1</option></optgroup>`      |
| `option`   | Selection option                 | `<option selected>option2</option>`            |
| `textarea` | Multiline text input             | `<textarea></textarea>`                        |
| `label`    | Individual input label           | `<label for="range">Range: </label>`           |
| `output`   | Output of input                  | `<output for="range">0</output>`               |
| `meter`    | Display value with a known range | `<meter min="0" max="100" value="50"></meter>` |

| Type           | Meaning                           |
| -------------- | --------------------------------- |
| text           | Single line textual value         |
| password       | Obscured password                 |
| email          | Email address                     |
| tel            | Telephone number                  |
| url            | URL address                       |
| number         | Numerical value                   |
| checkbox       | Inclusive selection               |
| radio          | Exclusive selection               |
| range          | Range limited number              |
| date           | Year, month, day                  |
| datetime-local | Date and time                     |
| month          | Year, month                       |
| week           | Week of year                      |
| color          | Color                             |
| file           | Local file                        |
| submit         | button to trigger form submission |


### Some common attributes
| Attribute | Meaning                                                                             |
| --------- | ----------------------------------------------------------------------------------- |
| name      | The name of the input. This is submitted as the name of the input if used in a form |
| disabled  | Disables the ability for the user to interact with the input                        |
| value     | The initial value of the input                                                      |
| required  | Signifies that a value is required in order to be valid   

### Structure
- Tables: 
  - You can use the th element to add the headers of the table
  - You use the td element for the data in the table
  - You use tr (this holds the th and td) to make a row in the table
- Anchors: do `<a href="URL">Text that has the link</a>` to make the linked text
  - Do `<a href="#idvalue">Value</a>` if you want to reference in the same page


### Input
- We can use the `form` element to make forms for user input, though it is not necessary
- When we submit the form, it carries data as `variableName=variablevalue
- `input` is the element, and you specify the `type` as an attribute
-  The value of `for` in the `label` element appears to just be what ever you want to name the label: `<label for="literally whatever">Lit whatevs:</label>`
- You can use the `pattern` attribute to give a regex that the input has to follow for:
 1. `text`
 2. `search`
 3. `URL`
 4. `tel`
 5. `email`
 6. `password`
- Form:
  - you use `action` to say which website will process the data of the form
  - the `method` attribute is either get or post
   - Get carries the request in the URL, post carries it in a text body
- Text: 
  - You can use `placeholder` to put something in the box before people type
- Select and Checkbox and Radio:
  - You use `fieldset` to set this apart
  - You can use the `legend` attribute to give a name to that field
  - You can used `checked` or `selected` to make one of the options in these fields the default one
- File:
  - You can accept only certain files by the `accept` attribute
  - You can use the `multiple` attribute to make it so you can attach multiple files
- Number:
  - This element allows you to specify a range with `min` and `max` and `step`
- Range:
  - This displays a bar
  - You can specify the `min` and `max`, and the `step` size and the default `value`
  - There is JavaScript involved that allows you to change the output at the end of the bar
- Progress: 
  - You can set a `max` and actual `value`
- Meter:
  - You can specify `min`, `max`, and `value`
  - You can also specify `low`, `high` and `optimum` and this will change the color of the bar to reflect what you put
- Color:
  - You can specify the default color by using the `value` attribute

### Media
- You can use either absolute or relative references for these
- Audio:
  - `autoplay` makes it start playing when it loads
  - `loop` makes it loop
- Video is like audio, but you have to include a child `source` element with the `src` attribute
- SVG and Canvas can be pretty cool
- SVG:
  - Cool
