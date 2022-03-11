# Overview

### App

The App is the main component. It acts as the frame of all other components. The app contains mostly of the pages and the menu components.

### Pages

The Pages are the different pages of the application. It contains the home page, the first one showing upon calling the application, and a page for each task. The home page contains some information about how to navigate within the application. The other pages contain the exercises. A page contains several exercises. A page consists of several other components.

### Components

The components give the application functionality. Each task has several different components.

##### ChecksumExample

This component displays an example of numbers and a checksum or a check symbol for the given numbers.

##### ChecksumExercise

This component displays an exercise. It displays several numbers, where the user has to calculate the correct checksum or check symbol like in the examples.

##### CompareExecise

A component used for an exercise. Given a sequence and its checksum, the user has to give an input, which will be compared to the given sequence and checksum.
For example given the sequence 110101 and the check bit 0, change the sequence such that it still fulfills the given check bit.

##### CorrectionBitsExercise / CorrectionBitsExercise2

Given is a bit string with some normal bits and some control bits.
In the exercise, the user is given sequences containing exact one error that must be found. One has more bits than the other, used for different tasks.

##### EncodingDistanceExercise

An exercise type. Given a code, the user must first determine it's hamming distance and then answer some MCs about some properties.

##### GraphTask

This component is used for task number 7. The user is given a graph of strings, where the user has to construct an encoding with certain properties by crossing out nodes step by step.

##### Info

Component is used to show tips, info or theory that might be of help to the student.

##### MC

This component is used for Multiple Choice Yes or No questions, which the user must solve.

##### Menu

The menu component is used for navigation. It is used to switch between pages. It is a simple drop out menu on the left.

##### NextPrevButton

This is used for switching between pages, but only back and forth.

##### ScrollButton

This is used for scrolling back to top, if the user has scrolled a certain distance down.

###### SquareExercise

This component always goes with the component squareExerciseExample. Given is a 4x4 square where each square has a digit 0 or 1. Some squares serve as control bits. The number of ones is always even in each row and column. In the exercise, the user is given squares containing exact one error that must be found.

###### SquareExerciseExample

This component always goes with the component squareExercise as the example to follow.

##### TextExercise

simple text exercise where the answer is of the form of a small input field from the user.

##### YN

This component is a single Yes or No question, which the user must solve.

### Functions

Functions are used for additional modularity for the code. See ChecksumExercise as an example.

##### binaryCheckSymbol1

Given a binary string, returns x, where x is 1, if the number of ones in the string is odd. Else x is 0.

##### binaryCheckSymbol2

Given a binary string, returns a two digit number xy, where x is 1, if the number of ones in the string at every even position is odd, else x is 0, and where y is 1, if the number of ones in the string at every odd position is odd, else y is 0.

##### distance

Calculates the hamming distance between two sequences of equal length.

##### errormaker

Used for MC or YN questions. Changes a sequence depending on the question to solve.

##### hammingDistance

Calculates the hamming distance of an array of sequences of equal length. This can be a code.

##### nDigitComparer

given two sequences of equal length, their checksums and a number x,returns true if the two sequences have a distance of exactly x and their checksums match, else returns false.

##### nextTenChecksum

Given any sequence of digits, returns x, (where x + sum of sequence) % 10 === 0.

##### randomDigits

Returns a random sequence of digits.

##### stringToArray

takes a string of numbers and returns the array of the individual digits

##### sumChecksum

Given any sequence of digits, returns the sum of them.

### graphics

Each graphic is a SVG format. Each one has a TX in the name, which stands for Task number X.
