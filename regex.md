[xyz] - This means to look for **any** of these characters

[a-z] - This is for a **range** of characters

[\^a-c] - This means **not** one of those

. - This means **any** character

\d - This matches a **digit**

\D - This matches anything that is **not** a digit

\w - This matches any **alphanumeric** character and _ as well

\W - This matches any characters that are **not** alphanumeric or _

\s - This matches **whitespace** like spaces and tab

\S - This matches **not** those

\t - This matches **tab**

x|y - This matches **one or the other**

x$ - This matches the character if it is at the **end** of the word or line

x(?=y) - This matches x only if it is **followed by** y

x(?!y) - This matches x only if it is **not followed by** y

x\* - This matches x **0 or more** times

x+ - This matches x **1 or more** times

x? - This matches x **0 or 1** times

x{n} - This matches x **exaclty n** times

x{n,m} or x{n,} - These match x **n to m** or **n or more** times

