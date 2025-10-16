const About = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>About This App</h1>
      <p>
        This car configuration app was created as part of my journey into web development. 
        It allows users to explore different car models, trims, and feature packages in an interactive way.
      </p>

      <h2>💻 Technologies Used</h2>
      <ul>
        <li>React 18 (Frontend Framework)</li>
        <li>React Router DOM (Client-side Routing)</li>
        <li>Supabase (PostgreSQL Database & Backend)</li>
        <li>Vite (Build Tool & Development Server)</li>
        <li>Bootstrap 5 & Custom CSS (Styling)</li>
        <li>ESLint (Code Quality & Linting)</li>
      </ul>

      <h2>🚀 Key Features</h2>
      <ul>
        <li>Interactive Car Builder with step-by-step configuration</li>
        <li>Vehicle browsing with filtering by body type, price, and manufacturer</li>
        <li>Dynamic trim and package selection</li>
        <li>Real-time price calculation based on selected options</li>
        <li>Payment estimation calculator (Lease & Finance options)</li>
        <li>Credit score-based interest rate calculations</li>
        <li>Print build summary functionality</li>
        <li>Responsive carousel with featured vehicles</li>
        <li>Model details page with specifications</li>
        <li>Relational data handling with Supabase</li>
        <li>Mobile-responsive design</li>
      </ul>

      <h2>🎯 Purpose</h2>
      <p>
        This project was built to strengthen my skills in React, backend data handling, state management, 
        and full-stack development. It demonstrates modern web development practices including functional 
        programming patterns, API integration, and responsive design. It also serves as a portfolio piece 
        to showcase my ability to build complete web applications.
      </p>

      <h2>📌 Note</h2>
      <p>
        This project is for educational and demonstration purposes only and is not intended for commercial use.
      </p>
    </div>
  );
};

export default About;