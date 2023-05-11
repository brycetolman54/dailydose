# CSS: All about that style
- The formatting you do on a parent applies to all children. The children, if they have the same format element with a different value, will show their own value and not their inherited value.

## How to Inject CSS into your HTML
1. Inline style: We don't use this much
```
<body>
  <p style="color:red">CSS</p>
</body>
```
2. Rule set: We also don't use this much
```
p {
  color:green;
}
```
- The p is a selector, color is the property, green is the value, the last two combined are a declaration, the whole thing is a rule
3. Style sheet: This is really what we use
- Make a file that has the CSS style info
- Link to it on the HTML file in the head element:

  `<link rel="stylesheet" href="file.css">`
  
  ``` 
  div, p {
    color:green;
  }
  ```
  - This gets both `div` and `p` elements in the style
  
## Attributes
| attribute | what it does | values |
| :---: | :---: | :---: |
| color | chooses color of the font | red, green, blue, #000000
| font-family | chooses the font style | can include multiple fonts por si acaso (Comma separated) |
| font-size | chooses the size of the font | #px, #em, #rem |
| font-weight | makes text change | bold, bolder |
| text-align | chooses where the text is located | start, center, end |
| padding | chooses padding size |#em, #px, #rem | 
| transform | changes the text position | rotate(+/-##deg), rotate(#turn), scale(##, ##), skew(##deg, ##deg), scale(##), translate(##%, ##%) |

- For translate, the % are 0%, 0% is in the center, -% goes up and to the left, first % is left/right, second % is up.down

| Property           | Value                              | Example             | Discussion                                                                     |
| ------------------ | ---------------------------------- | ------------------- | ------------------------------------------------------------------------------ |
| background-color   | color                              | `red`               | Fill the background color                                                      |
| border             | color width style                  | `#fad solid medium` | Sets the border using shorthand where any or all of the values may be provided |
| border-radius      | unit                               | `50%`               | The size of the border radius                                                  |
| box-shadow         | x-offset y-offset blu-radius color | `2px 2px 2px gray`  | Creates a shadow                                                               |
| columns            | number                             | `3`                 | Number of textual columns                                                      |
| column-rule        | color width style                  | `solid thin black`  | Sets the border used between columns using border shorthand                    |
| color              | color                              | `rgb(128, 0, 0)`    | Sets the text color                                                            |
| cursor             | type                               | `grab`              | Sets the cursor to display when hovering over the element                      |
| display            | type                               | `none`              | Defines how to display the element and its children                            |
| filter             | filter-function                    | `grayscale(30%)`    | Applies a visual filter                                                        |
| float              | direction                          | `right`             | Places the element to the left or right in the flow                            |
| flex               |                                    |                     | Flex layout. Used for responsive design                                        |
| font               | family size style                  | `Arial 1.2em bold`  | Defines the text font using shorthand                                          |
| grid               |                                    |                     | Grid layout. Used for responsive design                                        |
| height             | unit                               | `.25em`             | Sets the height of the box                                                     |
| margin             | unit                               | `5px 5px 0 0`       | Sets the margin spacing                                                        |
| max-[width/height] | unit                               | `20%`               | Restricts the width or height to no more than the unit                         |
| min-[width/height] | unit                               | `10vh`              | Restricts the width or height to no less than the unit                         |
| opacity            | number                             | `.9`                | Sets how opaque the element is                                                 |
| overflow           | [visible/hidden/scroll/auto]       | `scroll`            | Defines what happens when the content does not fix in its box                  |
| position           | [static/relative/absolute/sticky]  | `absolute`          | Defines how the element is positioned in the document                          |
| padding            | unit                               | `1em 2em`           | Sets the padding spacing                                                       |
| left               | unit                               | `10rem`             | The horizontal value of a positioned element                                   |
| text-align         | [start/end/center/justify]         | `end`               | Defines how the text is aligned in the element                                 |
| top                | unit                               | `50px`              | The vertical value of a positioned element                                     |
| transform          | transform-function                 | `rotate(0.5turn)`   | Applies a transformation to the element                                        |
| width              | unit                               | `25vmin`            | Sets the width of the box                                                      |
| z-index            | number                             | `100`               | Controls the positioning of the element on the z axis                          |

## More about Selectors
| Selector | Meaning | Example |
| :---: | :---: | :---: |
| element | all elements of a specific name | p, div, body |
| id | the element with the given ID | #idvalue |
| class | all elements with the given class | .highlight |
| element class | any elements with the name and class | p.highlight |
- You specify a class with `class='classname'`

## What things mean
| Unit | Description                                                      |
| ---- | ---------------------------------------------------------------- |
| px   | The number of pixels                                             |
| pt   | The number of points (1/72 of an inch)                           |
| in   | The number of inches                                             |
| cm   | The number of centimeters                                        |
| %    | A percentage of the parent element                               |
| em   | A multiplier of the width of the letter `m` in the parent's font |
| rem  | A multiplier of the width of the letter `m` in the root's font   |
| ex   | A multiplier of the height of the element's font                 |
| vw   | A percentage of the viewport's width                             |
| vh   | A percentage of the viewport's height                            |
| vmin | A percentage of the viewport's smaller dimension                 |
| vmax | A percentage of the viewport's larger dimension                  |

## The Box Model
You have to think about your content as sitting in these boxes in order to format your website well, to know the CSS elements to alter.

Here it is:

![CSS Box model](https://raw.githubusercontent.com/webprogramming260/.github/main/profile/css/introduction/cssBoxModel.jpg)

- The margin is non-editable, it just tells how far away everything else will be
- 
