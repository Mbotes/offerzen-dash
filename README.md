# Offerzen Dashboard Tech Assessment

## Approach

The aim of this assignment is to evaluate the basic technical competence you’ll require for this
position.

- For the frontend implementation you need to use React or an equivalent library.
- Feel free to make use of your preferred styling approach (regular CSS, CSS-in-JS, Sass
  etc.), but do ensure that you make use of custom styles.
- There’s no need to create a fake backend for the data, you can just copy-paste the JSON
  data and import it directly.
- Your work must be your own, and should be completed unassisted. Feel free, though, to
  search the internet to look up any content.
- Communicate your thinking as much as possible. Add a README to communicate how to
  run your solutions and any relevant notes, for example, any extra thoughts on the tasks or
  how you structured your submissions.
- If you are stuck or are taking too much time, use your discretion to implement what is
  important to the task at hand, and write out your challenges in the README.

## Installation

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

## Thoughts

I created this app using a Vite starter template and tried to stay away from using any plugins and libraries and instead challenged myself to recreate components and functionality from scratch

## Findings

### Known Issues

- There is an issue when you are filtering the list with the search functionality and attempt to Archive/Unarchive a chat that it resets the state of the list and clears out the filtering.
- Archiving can sometimes behave weirdly in general with the lack of ID's on the Json Data and having to rely on using an index to find and manipulate the data.
- Did not manage to sort out the date formatting depending on how long ago the message was last sent, I started running out of time and didn't want to reach for a date library to help manage things like "within 24 hours, yesterday and beyond".
- I did not include the correct Font/Typography, when I spent a small amount of time to find it, the first few results came back as a paid for Font, so I opted to skip it and priotise functionality.
- The styling is not an issue per say but definitely could use a lot more love.

## Task D - Questions

### How long did this assignment take you and where did you spend your time?

Realistically I think this task took me roughly 6 hours, I originally planned to just get the core functionality of the tasks working and leaving it at that, but decided to stretch my CSS muscles and try and adapt the screen to the design.
This defintiely made me realise how rusty I was with CSS and how long it took me to do pretty basic things.

### What would you do differently or improve in your solution?

- The Idea I had was to do everything from scratch, If I had to do things over I would use a framework like ant-design or material-ui to do a lot of the heavy lifting of the UI/base styling and spend more time on controlling the data flow and logic.
- Also add something to help me sort out the data logic and presentation layer for the last_communication, for a message received that day, yesterday and beyond, I think it is a really cool challenge.

### Do you have any feedback on this assignment? For example: What did you enjoy? What could be better? Which aspects were unclear?

- I think this was a fantastic assignment, it looked so simple on the surface level but had these interesting curve balls the closer you looked at the assignment and requirements.
- The only thing that I was unsure of is when you sort the table ASC/DESC on communication, should the unread rows be kept as the latest and the rest of the data is sorted accordingly.
