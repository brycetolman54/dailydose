This is all the stuff about what you can do in the command line, things you can 
include in you scripts as well

pwd - Tells you where you are

ls [options] [location]: lists the files in the directory
	The location can be a path
	The options are: 
		l- makes the long list
		a- means all
		h- makes the space of the file human readable

cd [location]: this moves you to a directory

file [path]: this tells you what type of file the one specified in path is

Things to remember: 
	Linux is case sensitive
	You can use single quotes to include a multiple words in one argument
	You can use double quotes too, and they make it so variables ($var) is the actual variable value instead of the name
	You can use \ to escape characters
	Long hand commands use --, shorthand use -
	~ means your home directory

man [options] [command] or help [command]: this tells you how to use a command
	An option you can use is k to search for a keyword
	/[term] is to look for a term in a manual page
	n moves to the next term in the manual page
	N moves to the previous term in the manual page

mkdir [options] [directory]: makes a directory
	The directory is whatever you are making
	p makes the needed parent directories, if you are making a directory deep down
	v makes it tell you what it is doing

rmdir [options] [directory]: removes a directory, though only if empty
	p and v are the same options

touch [options] [filename]: This can help create blank files

cp [options] [source] [destination]: This is to copy a file
	r means recursive, it will do it for all files in a directory

mv [options] [source] [destination]: this is for renaming or moving files
	
rm [options] [file]: This is to get rid of files
	We can again use r for recursion
	f means to force the files to delete, even if they are protected

cat [file]: This will output the contents of a file (or multiple concatenated) to the terminal screen

less [file]: This shows part of a file at a time
	move forward with space, backwards with b, quit with q

Vim specific:
	arrows move you
	jkhl move you
	^ or 0 moves to beginning of line
	$ moves to end of line
	nG moves to nth line
	G moves to last line
	gg moves to first line
	w moves to beginning of next word
	nw moves to the nth word
	b moves to the beginning of the previous word
	nb moves back to the nth word
	{ moves back one paragraph
	} moves forward one paragraph
	x deletes a character
	nx deletes n characters
	dd deletes current line
	dn deletes n words
	u is undo last change
	U is undo all chanes to that line
	p is to paste (d cuts)
	r is replace (rt replaces the current character with t)
	/word searches for the forward word
	?word searches for the reverse word
	:w file.txt will save the work in this file to a file of the new name
	:r file.txt will append that file's data to the end of the one you work on
	:!command will execute the command while you are in the file
	o instead of i adds a new line below your cursor and enters edit mode
	y is like copy
	v is used to select multiple lines of text

Things for using wildcards:
  * means 0 or more
  ? represents a single 
  [] represents a range of characters
  ^ means not those characters

Binary table:
  0   0 0 0
  1   0 0 1
  2   0 1 0
  3   0 1 1
  4   1 0 0
  5   1 0 1
  6   1 1 0
  7   1 1 1

chmod [permissions] [path]: changes permissions
  permissions are generally written [ugoa][+-][rwx]
  you can also do numbers like those above
    A three digit number will tell you the permissions for each of the groups

head [# lines] [path]: This will print out the first lines of the output
  The default is 10

tail [#lines] [path]: same but the tail end is what is gies

sort [options] [path]: sorts the output, alphabetically by default

nl [options] [path]: numbers the lines of the output
  s followed by a string says what to print after the number
  w followed by a number says how much padding before the number

wc [options] [path]: gives the line, word, and character count
  l gives only line
  w gives only word
  c gives only character

cut [options] [path]: breaks up the data as we want
  f tells which field we want, which column
  d tells us what the delimiter is (tab is default)

sed <expression> [path]: This is to find and replace
    the expression usually looks like s/search/replace/g
    s means substitute
    g means global, if not on only the first example on each line will be replaced

uniq [options] [path]: This gets rid of repetitive data that is consecutive
    
tac [path]: the reverse of cat

diff [file] [file]; shows the differences between two files

egrep [options] <pattern> [path]: regex
    -v means print any that are not this
    Usually just prints those that match
    n gives the line number of each example
    c gives how many lines match
    The syntax
        . means a single character
        ? means the preceding one is 0 or 1 times 
        * means the preceding is 0 or more times
        + means the preceding is 1 time
        {n} means it matches exactly n times
        {n,m} means it matches n to m times
            you can {n,} to get n or more times
        [agd] means its is one of those
        [^agd] means it is not one of those
        [c-f] means a range
        () allows you to group many characters as one
        | is the or operator
        ^ means the preceding one matches the beginning of the line
        $ means the preceding character matches the end of the line

Redirecting and piping:
    > saves the data into a file
    >> appends it to the file
    | passes the output of one command on the left to the one on the right
    < passes data from a file to the command (this lets you not know where the data came from
        wc -l myoutput.txt versus wc -l < myoutput.txt

There are three streams:
    stdin (0)
    stdout (1)
    stderr (2)
    We can redirect to these with $#
    We can redirect a stream by #> for whatever the stream we are redirecting
