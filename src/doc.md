# Overview

### App

The App is the main component. It acts as the frame of all other components. The app cointains mostly of the pages and the menu components.

### Pages

The Pages are the different pages of the application. It contains the home page, the first one showing upon calling the application, and a page for each task. The home page contains some information about how to navigat within the application. The other pages contain the exercises. A page contains several exercises. A page consists of several other components.

### Components

The components give the application functionallity. Each task has several different componetns.

##### Menu

The menu component is used for navigation. It is used to switch betwenn pages. It is a simple drop out menu on the left.

##### ChecksumExample

This component displays an example of numbers and a checksum or a check symbol for the given numbers. It serves as the example for the ChecksumExercise. The checksum or checksymbol is different gitven the function.

##### ChecksumExercise

This component displays an exercise. It diplays several numbers, where the user has to calculate the correct checksum or checksymbol like in the examples. The checksum or checksymbol is different gitven the function. This can either be the sum of the individual digits or some other checksymbol. If the exercise is not correctly solved, then the solution is displayed.

##### MC

This component is used for Yes or No questions, which the user must solve.

##### YN

This component is used for Yes or No questions, which the user must solve.

### Functions

Functions are used for additional modularity for the code. See ChecksumExercise as an example.

##### randomDigits

Returns a random sequence of digits.

##### sumChecksum

Given any sequence of digits, returns the sum of them.

##### nextTenChecksum

Given any sequence of digits, returns (10 - sum % 10)
