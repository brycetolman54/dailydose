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

## More about Selectors
| Selector | Meaning | Example |
| :---: | :---: | :---: |
| element | all elements of a specific name | p, div, body |
| id | the element with the given ID | #idvalue |
| class | all elements with the given class | .highlight |
| element class | any elements with the name and class | p.highlight |
- You specify a class with `class='classname'`

## What things mean
| abbreviation | meaning | use |
| :---: | :---: | :---: |
|px | pixels | size of text, border, etc |
| em | size based on width of m character | determines the size relative to the width of the m in the font you are using |
| rem | relative m | makes the size relative to the document itself, not the m |

## The Box Model
You have to think about your content as sitting in these boxes in order to format your website well, to know the CSS elements to alter.

Here it is:

![CSS Box model](https://raw.githubusercontent.com/webprogramming260/.github/main/profile/css/introduction/cssBoxModel.jpg)

- The margin is non-editable, it just tells how far away everything else will be
- 
