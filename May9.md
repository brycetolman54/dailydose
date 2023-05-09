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


  


