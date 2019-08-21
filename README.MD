# The Full-Stack Apprenticeship
> Transition from consumer to creator, and learn to build.

We believe every city in America needs a hub for community-driven technical education. The Full-Stack Apprenticeship is a focused, repeatable educational program to teach full-stack development. Build skills through open-source projects. Mentorship for developers of all stripes & skill levels. Pairing would-be entrepreneurs with technical cofounders and teammates. Community structure, accountability & leadership at the local level. 

## Installation

Download on Expo: https://expo.io/@pareto/paretoapprenticeship
View online: https://companion.pareto.education

## Current Functionality

The FSA Mobile application offers a way to access the gamified experience system, the FSA Knowledge Base & an ebook called 'The Blueprint' to lay out the journey for somebody looking to become a full-stack developer.

## Release History
* 0.1
    * Blueprint Edition Versioned & Released
* 0.2
    * New UI released, Experience Preview
* 0.3/4
    * Experience system, profile directory released.

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
Syncing your forked repository to the original repository is an important step before submitting any pull request to the original repository for the changes in your forked repository. Even if you are not going to submit a pull request to the original repository, there are times that you want the additional features and/or bug fixes that have been done since you forked the original repository. (Sync a fork of a repository to keep it up-to-date with the upstream repository. https://help.github.com/en/articles/syncing-a-fork)
2. Please use yarn for installing and adding dependencies.
3. Create your feature branch (`git checkout -b feature/fooBar`)
4. Commit your changes (`git commit -am 'Add some fooBar'`)
5. Push to the branch (`git push origin feature/fooBar`)
6. Create a new Pull Request

# Branching
The default branch is develop, while production releases are merged to master.
All new work should start as a new branch from develop, with merge requests created roughly 1:1 to ticket #s
We're following the git-flow model:

feature/TICKET_OR_ISSUE_NUMBER (feature/#43)
bug/TICKET_OR_ISSUE_NUMBER (bug/#102)
release/VERSION_NUMBER (release/0.1.2)

## Community Sprint Planning, Standup & Retrospectives

The FSA believes that people generally learn best by hopping in & contributing useful code. Reading books is great, but you can get stuck in 'tutorial hell' and not actually make any progress. The key towards developing competence (and mastery) is time spent on your craft in a useful, professional capacity. That is why we hold the opportunity for community members to participate in a sprint planning (and retrospective) meeting for our open-source project called #thehub - to simulate the experience of working on an engineering team, to give you practice estimating your ticket items, and giving you a structured timebox to achieve your goals.

Requirements are simple:
- Only pick the GitHub tickets you believe you can reasonably accomplish in the duration of the weekly sprint.
- You must commit to attending the sprint retrospective that following Friday, sometime between 4-8pm for 30 minutes (will work out schedule amongst the group). This is to compare your initial estimates against the actual time taken, and to talk about what we can do from a workflow and process perspective to improve as a development team.
- You must commit to attending sprint 'stand-up' meetings on Tuesday & Thursday sometime between 5-8pm (or in the am if that works best) - like a real stand-up meeting, it should only last 10 minutes and is an opportunity for professional counsel & accountability. Blocked on something? Stay on the call after the meeting to talk it over.

We will be meeting on Google Hangouts, the link will be refreshed on the Slack channel or Meetup page.

# Directory Structure
## fsa-cms
This is where our Sanity.io powered Content-Management System lives.

## react-web
This is where our React application lives.

## react-native-expo
Where our React-Native application lives, built to work together with the React-Web repository.

## fsa-db
Where our Mongo & serverless Dynamo functions live.

## git troubleshooting
Had trouble pulling from github, had to do the following commands to pull

git remote add upstream https://github.com/fsapprenticeship/fsa-hub
git fetch upstream
git pull upstream develop
