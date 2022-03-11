# Assignment 4: So You Think Ants Can Dance

**Due: Monday, March 28, 11:59pm CDT**

Animated characters are an important part of computer games and other interactive graphics. In this assignment, you will learn how to animate computer graphics characters using data from motion capture systems. You will be working with data from the [Carnegie Mellon motion capture database]([http://mocap.cs.cmu.edu/), a great resource of free "mocap" data. The data will be formatted as text files, but with your programming and math skills, you will bring this data to life on the dance floor!

The CMU motion capture data is typical of all the skeleton-based motion capture data found in games and movies. So, gaining some experience with this type of animation is one of the most important goals of the assignment. There are several important learning goals, including:

In completing this assignment, your goal should be to learn:

- How transformations can be composed in a hierarchy to create a scene graph and/or, in this case, an animated character within a scene.
- How transformations can be used to scale, rotate, and translate basic shapes (unit cubes, spheres, cylinders, and cones) into more complex scenes and characters.
- How mocap data can be used and manipulated in multiple ways to create different types of animations. For example:
  - How to create a looping animation that smoothly interpolates between the beginning of the motion clip and the end to avoid any discontinuities.
  - How to overlay new motion clips onto a character at runtime, for example, making your character jump in a game when you press a button, or in our case, perform one of a series of cool ballet moves.
- How to read and extend some fairly sophisticated computer graphics code.

The amount of code you will need to write to complete this assignment is less than in the previous assignments. The support code provides quite a bit of infrastructure to deal with reading and playing back the mocap data. So, the key challenges will come in reading through and understanding the existing code as well as really thinking about the code that you do write. You will probably need to work out some of the structure on paper before sitting down at the keyboard to program.

You can try out the [instructor's implementation](https://csci-4611-spring-2022.github.io/Builds/Assignment-4) in the Builds repository on the course GitHub.

## Submission Information

You should fill out this information before submitting your assignment. Make sure to document the name and source of any third party assets that you added, such as models, images, sounds, or any other content used that was not solely written by you. 

Name:

Third Party Assets:

Wizard Bonus Functionality:

## Prerequisites

To work with this code, you will first need to install [Node.js](https://nodejs.org/en/) and [Visual Studio Code](https://code.visualstudio.com/). 

## Getting Started

The starter code implements the general structure that we reviewed in lecture.  After cloning your repository, you will need to set up the initial project by pulling the dependencies from the node package manager with:

```
npm install
```

This will create a `node_modules` folder in your directory and download all the dependencies needed to run the project.  Note that this folder is `.gitignore` file and should not be committed to your repository.  After that, you can compile and run a server with:

```
npm run start
```

The build system should launch your program in a web browser automatically.  If not, you can run it by pointing your browser at `http://localhost:8080`.

## Data

The CMU Mocap database contains 2,605 different motions, most recorded at 120Hz, but some recorded at 60Hz or other speeds. These motions range from the simple (person walking straight forward), to the complicated (directing traffic), to the silly (someone doing the "I'm a little teapot" dance).

The motions in the CMU database use skeletons specified in .asf files and separate motions specified in .amc files. The .asf files specify bone names, directions, lengths, and the skeleton hierarchy for one specific human subject who came to the mocap lab. That person likely performed several motions during the capture session, so there is typically one .asf file for multiple .amc files. The subjects are numbered (e.g., subject #50). and the skeleton files are named accordingly (e.g., 50.asf). Motion filenames start with the subject ID, then have an underscore, then the number of the motion (e.g., 50_01.amc is the first motion captured for subject 50). The support code comes with the data files we used in our solution to the assignment, but it can be fun to swap in other motions, and you are encouraged to experiment with this by downloading other .asf and corresponding .amc files from the [CMU database](http://mocap.cs.cmu.edu/).  (This is a great opportunity for a wizard bonus!)

If you are interested, you can also read more about the [Acclaim Motion Capture](http://graphics.cs.cmu.edu/nsp/course/cs229/info/ACCLAIMdef.html) data format used by the mocap files.

## Requirements

Working from the support code, which is significant for this assignment, you will be required to write the code to meet the following specifications:

1. Draw one (or more) animated characters that perform a motion in a continuous loop. The support code starts you down this path by loading mocap data for the lead and follow parts of a salsa dance.
2. Draw one (or more) animated characters that loop through a small motion clip when "at rest" and seamlessly transition to perform new motions when buttons are clicked, similar to how a character in a game would perform an action whenever you press a button on your controller.
3. We suggesting starting #1 and #2 with a very simple character, like a stick figure, the final requirement is to make this character more interesting. Use transformation matrices to construct a more interesting character out of scaled spheres, cubes, cones, cylinders, or other simple shapes you can draw using Three.js.

To accomplish these tasks, you will need to add code to the places marked "TO DO" in the `Bone`, `AnimatedCharacter`, and `DanceApp` classes. You will probably not need to add any new classes to the project in this assignment unless you are doing something more complex for the wizard bonus challenge.

**Important Note:** Three.js includes an animation system that is meant for controlling rigged models prepared by an animator. You may notice that there are classes with identical names to the ones defined in the support code (`Skeleton`, `Bone`, etc.). Although these follow the same core graphics concepts, the full content development pipeline is more complicated, so we will not be using any of the animation classes provided by Three.js in this assignment.

## Useful Math

Refer to the notes in class in the next couple of weeks. We will be talking about rendering hierarchical models and about blending poses together via linear interpolation and how to interpolate angles smoothly.

## Rubric

Graded out of 20 points.  Partial credit is possible for each step.

**Part 1: Bone Class** (6 points total)

1. Extend the `update()` method to define the transformation matrix for the current pose that will be used to draw each bone. (4 points)
2. Call the `update()` method for each of the bone's children to propagate through the entire skeleton. (2 points)

When this part is finished, you will be rewarded by seeing a pair a figures dancing the salsa!  At this point, they will only appear as coordinate axes helpers drawn at the position and orientation for each joint of their bodies 

**Part 2: AnimatedCharacter Class** (8 points total)

3. Extend the `createMeshesRecursive()` method to (at least) a stick figure representation for the each bone so that your dancing coordinate frames now turn into a dancing stick figure. (4 points)
4. Further extend this method to draw a more interesting character. You can use Three.js to draw simple mesh geometries like spheres, cubes, cylinders, cones, etc.  You can then apply scales, translation, and rotations to the meshes to create an interesting looking character. For example, notice how the "butts" of the ants that we have created are drawn using spheres that are scaled to create ellipsoids and then rotated by about 60 degrees. You should adjust colors and use several geometries to make a convincing character. You are free to make the same ant character that we did, but you are also free to create your own unique character. Just make sure that it includes a few examples of applying transformation matrices before drawing simple shapes so that we can be sure that you have learned that skill.  (4 points)

**Part 3: DanceApp** (6 points total)

5. Follow the pattern demonstrated with `balletDanceMotions` to define four additional special motions.  You will need to load motion clips from the .amc files, trim uninteresting frames from the front and back of the clips, and then play them when the "Motion X" buttons in the GUI are pressed.  You should visually verify that the motion smoothly transitions from the ballet dancer's base loop motion into all of these special motions whenever a new motion is played.  You are free to use the same motions we did, or look through the .amc files for other interesting animations to play.  (3 points for the first animation, 1 point for each additional one)

## Wizard Bonus Challenge

All of the assignments in the course will include great opportunities for students to go beyond the requirements of the assignment and do cool extra work. On each assignment, you can earn **one bonus point** for implementing a meaningful new feature to your program. This should involve some original new programming, and should not just be something that can be quickly implemented by copying and slightly modifying existing code.  

There are great opportunities for extra work in this assignment. For example:

- You could add more characters or change the characters and put them in a different scene. 
- You could pick different motion clips to use from the CMU database. 
- You might consider turning the ballet character into a character that can be controlled with the mouse and keyboard rather than just buttons on the screen.
- You could try to make a character than can walk around the screen using mocap data, but rather than following a pre-defined path, make it go wherever you command it with keyboard or mouse input.
- You could extend the animation system with your own unique idea. Creativity is encouraged!

## Submission

When you commit and push your assignment to GitHub, an automated script will build and deploy the production code to the `gh-pages` branch of your repository.  However, your submission is not complete until you do the following:

1. Open your repository on GitHub and go to Settings->Pages.
2. Change the source to the `gh-pages` branch, then save.

You will need to wait a few minutes for the website to deploy.  After that, make sure to test everything by pointing your web browser at the link generated for your build:

```
https://csci-4611-spring-2022.github.io/your-repo-name-here
```

If your program runs correctly, then you are finished!  The published build will indicate to the TAs that your assignment is ready for grading.  If you change your mind and want to make further changes to your code, then just delete the `gh-pages` branch and set the GitHub pages source back to `None`, and it will unpublish the website.

Note that the published JavaScript bundle code generated by the TypeScript compiler has been minified so that it is not human-readable. So, you can feel free to send this link to other students, friends, and family to show off your work!

## Acknowledgments

This assignment was based on content from CSCI 4611 Fall 2021 by [Daniel Keefe](https://www.danielkeefe.net/).

## License

Material for [CSCI 4611 Spring 2022](https://canvas.umn.edu/courses/290928/assignments/syllabus) by [Evan Suma Rosenberg](https://illusioneering.umn.edu/) is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).
