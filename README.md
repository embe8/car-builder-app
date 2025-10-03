# Car Configuration App

A modern React-based web application for browsing, configuring, and customizing vehicles with real-time pricing and payment estimation features.

## Features

- **Vehicle Browsing**: Browse available car models with filtering by body type, price range, and manufacturer
- **Interactive Car Builder**: Step-by-step vehicle configuration with trim selection, features, and packages
- **Real-time Pricing**: Dynamic price calculation based on selected options
- **Payment Estimation**: Lease and finance payment calculators with credit score considerations
- **Responsive Design**: Modern UI built with Bootstrap 5 and custom CSS
- **Database Integration**: PostgreSQL database with Supabase for real-time data management

## Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Bootstrap 5, Custom CSS
- **Database**: PostgreSQL with Supabase
- **Build Tool**: Vite
- **Development**: ESLint for code quality

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Supabase account and project

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/car-configuration-app.git
   cd car-configuration-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Update Supabase configuration**
   Replace the Supabase URL and key in `src/supabaseClient.js` with your project credentials.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to localhost

## Database Schema

The application uses the following main database tables. This was a project for Database Fundamentals class.

- **manufacturers**: Car manufacturer information
- **models**: Vehicle models with specifications
- **trims**: Model trim levels and pricing
- **features**: Available features for each model
- **packages**: Optional packages and add-ons
- **model_bodies**: Body type classifications (SUV, Sedan, etc.)
- **trim_packages**: Relationship between trims and available packages
- **automobiles**: Individual vehicle instances
