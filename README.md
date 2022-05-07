Light House Labs - Midterm Project - Schoodle
=========

## Description

Have you ever struggled planning an event with your friends, coworkers, or clients?
Well, struggle no more, because we have the app for you - SCHOODLE!

Schoodle is an event coordination app that allow you to create as many events as you like with your available times.
You can then share the event link with your friends/event attendees, and they can vote on what time works best! 

No user accounts are needed. That being said, the app tracks all users and events, enable for the same user to make multiple events and for votes to be properly calculated.

## Group Members

* Kyril - https://github.com/BreakfastAtKyrils
* Michaela - https://github.com/Michaela-K
* Nika - https://github.com/nikaptushkina

## Final Product

Creat Your Event!
!["Create Page"](https://github.com/BreakfastAtKyrils/Schoodle/blob/master/docs/CreateEvent.gif)

Vote for which time works best!
!["Event Page"](https://github.com/BreakfastAtKyrils/Schoodle/blob/master/docs/EventPage.gif)

Look at all the votes!
!["Event Page"](https://github.com/BreakfastAtKyrils/Schoodle/blob/master/docs/VoteUpdates.gif)

## Dependencies
- Node 10.x or above
- NPM 5.x or above
- PG-format 6.x
- Flatpickr (calendar)
- Express
- Ejs
- Moment
- Morgan
- Node-sass-middleware

## Development Dependencies

- nodemon

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Possible Future Features

- Allow users to update their vote reponses
- Allow event creators to edit and delete their event
- Allow attendees to receive notifications 1 hour/day/week before the event starts
- Enable log-in and log-out 
