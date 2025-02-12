# Quest Platform Client

Web client for a questing platform.

## Deploy
You can visit the platform by clicking this [link](https://quest-platform-client.vercel.app).

## Run Locally

Clone the project:

```bash
git clone https://github.com/vladkvlchk/quest-platform-client.git
```  

Install dependencies:

```bash
npm install
```  

Add the backend server link to `.env`:

```
NEXT_PUBLIC_API_URL={server link}
NEXTAUTH_SECRET=$(openssl rand -base64 32)  # Generate a secure key using this command
```  

Start the application:

```bash
npm run start
```  

## Features

The application consists of 7 pages:

#### 1. Login/SignUp
User registration and authentication page.
- Register a new user with an email.
- Log in with an email and password.

#### 2. Profile
Personal user page.
- Contains name, bio, avatar, quest history, and email (visible only on your own profile).
- View other users' profiles.
- Change your avatar, name, and bio.

#### 3. Create Quest
Create a new quest.
- Set an image, title, description, time limit, and difficulty.
- Add levels with input-based or quiz-type answers.
- Each level contains an image, question, options, and the correct answer.

#### 4. Explore Quests
Browse available quests.
- Display all quests with their image, title, description, rating, location, difficulty, and time limit.

#### 5. My Quests
List of quests created by or related to the user.
- Display created quests with their image, title, description, rating, location, difficulty, and time limit.

#### 6. Quest
Quest interface.
- Display the title, description, rating, reviews, location, difficulty, and number of levels.
- Start the quest.

## Team

The frontend team consists of two developers:
- **Leader:** [Vladyslav Kovalchuk](https://github.com/vladkvlchk)
- **Developer:** [Bogdan Makarevych](https://github.com/ReGeNss)
