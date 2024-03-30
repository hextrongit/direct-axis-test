# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

first for installation of vite we used

1. npm create vite@latest
2. npm i
3. npm run dev

for installation of Bootstrap and SASS we used

4. npm i --save bootstrap @popperjs/core
5. npm i --save-dev sass
6. npm install react-bootstrap bootstrap

for Routing we use react router dom

7. npm install react-router-dom

for Form and Form validation we use Formik and yup

8. npm install formik yup

for API calls we use Axios

9. npm i axios

Project build completed

- Code pushed to Github
- repository - direct-axis-test

For cloning --

Install Git: Get Git from https://git-scm.com/downloads.
Open Terminal:
Windows: Search for "cmd" and press Enter.
macOS/Linux: Open your terminal app.
Navigate to Folder: Use cd to go to your desired location (e.g., cd Desktop).
Clone Repository: Run git clone <URL>, replacing <URL> with the repository's URL from GitHub (found under "Clone or download").
Success! You'll have a new folder with the project files.

After cloning --

Install the necessary packages

10. npm install

After installing need to run the Project

11. npm run dev

ALL DONE!

# Application go through

In initial render because we are not login, login is required. while logging in if we are not a registered user, page will show that _ User not found. so we need to register with a minimum data holding username and password. after successful registering, it we redirect to the login page. we need to enter the correct username and password, or it will show _ Invalid username or password. after successful login, it redirect to the home page. /home. There you can see list of the product, We can select individual products to see their more information. From there and in from the product list we can add products to Cart. In the nav bar we can see Home, Cart, Profile and Logout options. from home we can select the required products, it will be available in the Cart page for Placing the order. in the profile page we can see the Logged user's details. then there is Logout option in the Nav bar and profile for logging out. while clicking it will show a popup for confirming the logout. this is the flow.
