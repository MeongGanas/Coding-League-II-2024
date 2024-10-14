Berikut adalah template README untuk tutorial menjalankan proyek Laravel 11 dengan Breeze dan React setelah melakukan _git clone_:

---

# APLIKASI PELAPORAN DAN PEMANTAUAN CSR PERUSAHAAN

## Introduction

This project is a Laravel 11 application integrated with Breeze for authentication and React as the frontend. Below are the steps to set up the project on your local machine after cloning the repository.

## Prerequisites

Before setting up the project, ensure you have the following installed on your machine:

-   PHP ^8.2
-   Composer
-   Node.js (with npm or yarn)
-   MySQL (or any other database supported by Laravel)
-   Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/MeongGanas/Coding-League-II-2024.git
```

Navigate into the project directory:

```bash
cd Coding-League-II-2024
```

### 2. Install PHP Dependencies

Run the following command to install the PHP dependencies using Composer:

```bash
composer install
```

### 3. Install JavaScript Dependencies

Install the necessary frontend dependencies with npm or yarn:

```bash
npm install
```

Or if you're using Yarn:

```bash
yarn install
```

### 4. Configure the Environment

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Update the `.env` file to match your local environment settings, especially the following variables:

-   `DB_CONNECTION`
-   `DB_HOST`
-   `DB_PORT`
-   `DB_DATABASE`
-   `DB_USERNAME`
-   `DB_PASSWORD`

### 5. Generate Application Key

Run the following command to generate an application key:

```bash
php artisan key:generate
```

### 6. Run Database Migrations

Migrate the database using:

```bash
php artisan migrate --seed
```

### 7. Build Frontend Assets

Compile the frontend assets:

```bash
npm run build
```

Or for development:

```bash
npm run dev
```

### 8. Start the Laravel Development Server

Finally, start the Laravel development server:

```bash
php artisan serve
```

Your project should now be running at `http://localhost:8000`.

## Additional Commands

-   **Running Tests:**

    ```bash
    php artisan test
    ```

-   **Running Laravel Scheduler:**

    ```bash
    php artisan schedule:run
    ```

-   **Compiling Assets in Production:**
    ```bash
    npm run build
    ```

## Troubleshooting

-   Ensure that your `.env` file is properly configured for the database.
-   Clear cache if you encounter any issues:
    ```bash
    php artisan config:clear
    php artisan route:clear
    php artisan cache:clear
    ```

---

This README provides a clear setup process for running the Laravel Breeze React project after cloning the repository. You can customize the GitHub repository URL and any project-specific details as needed.
