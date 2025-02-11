# Instructions for Running the Project

## 1. Running as Monorepo
To run the project as a monorepo, follow these steps:
1. Clone the repository.
2. Navigate to the root directory of the project.
3. Rename the `.env.sample` file to `.env` in both `packages/frontend-repo` and `packages/backend-repo`.
    ```sh
    cd packages/frontend-repo && mv .env.sample .env && cd ../backend-repo && mv .env.sample .env
    ```
4. Install the dependencies using the following command:
    ```sh
    yarn install
    ```
5. Start the project using the following command:
    ```sh 
    yarn dev
    ```
6. Access the application in your browser at `http://localhost:3030`.



## 2. Run Firebase Emulator inside packages/backend-repo
To run the Firebase emulator inside the `packages/backend-repo`, follow these steps:
1. Navigate to the `packages/backend-repo` directory:
    ```sh
    cd packages/backend-repo
    ```
2. Start the Firebase emulator using the following command:
    ```sh
    yarn start:emulator
    ```