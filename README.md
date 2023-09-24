# Ordinacija_WebApp_2023
- Final project of Web Application course
- year 2023
- MEAN stack
- Theme was clinic with 4 type of users (administartor, patients and doctors) providing functionalities like:
    - making appointment for patients
    - writing reports by doctors for each examination
    - user management for administrator
    - and others...
- needed packages: bootsrap, jspdf, multer, nodemailer, qr-image
- ---------------------------------------------------------------------------
Follow these steps to run the app:
1. download projekat.7z from https://drive.google.com/file/d/1LNOEF-65funuM7nrxe0V1UO1jNIZA_t9/view?usp=sharing and unzip it, that is a project base with partially set up backend
2. make folder named "frontend" in same folder where is extracted `projekat.7z`
3. copy content of git folder "frontend" to local folder
4. copy content of git folder "backend" to local folder
5. open local frontend folder in cmd and install needed packages (use commmand "npm i `package`" for each package where `package` is "bootstrap" and "jspdf")
6. open local backend folder in cmd and install needed packages (use commmand "npm i `package`" for each package where `package` is "multer", "nodemailer" and "qr-image")
7. make mongo database named `ordinacija` and import files from github folder `baze` and each name as it`s coresponding file
8. in backend cmd run command `tsc` and then command `npm run serve`
9. in frontend cmd run command `ng serve`
10. in your browser go to address `http://localhost:4200/` and there you have it
