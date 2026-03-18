import pool from './database.js';

const createTables = async () => {
  const connection = await pool.getConnection();

  try {
    console.log('Creating database tables...');

    // Users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        date_of_birth DATE,
        gender ENUM('male', 'female', 'other'),
        fitness_goal VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Programs/Services table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS programs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        goal VARCHAR(100),
        level VARCHAR(50),
        duration VARCHAR(50),
        image_url VARCHAR(500),
        price DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_goal (goal),
        INDEX idx_level (level)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Trainers table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS trainers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        title VARCHAR(100),
        specialization VARCHAR(255),
        bio TEXT,
        image_url VARCHAR(500),
        years_experience INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Membership Plans table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS membership_plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        monthly_price DECIMAL(10, 2) NOT NULL,
        yearly_price DECIMAL(10, 2) NOT NULL,
        features JSON,
        is_popular BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // User Memberships table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_memberships (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        plan_id INT NOT NULL,
        billing_cycle ENUM('monthly', 'yearly') NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (plan_id) REFERENCES membership_plans(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Contact form submissions table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status ENUM('new', 'read', 'replied') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Testimonials table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        name VARCHAR(100) NOT NULL,
        image_url VARCHAR(500),
        rating INT DEFAULT 5,
        comment TEXT NOT NULL,
        is_approved BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_approved (is_approved)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('✅ All tables created successfully');

    // Insert sample data
    await insertSampleData(connection);

  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    throw error;
  } finally {
    connection.release();
  }
};

const insertSampleData = async (connection) => {
  try {
    // Check if programs already exist
    const [programs] = await connection.query('SELECT COUNT(*) as count FROM programs');
    
    if (programs[0].count === 0) {
      console.log('Inserting sample programs...');
      await connection.query(`
        INSERT INTO programs (name, description, goal, level, duration, price, image_url) VALUES
        ('Weight Loss Program', 'Intensive cardio and strength training to help you lose weight effectively', 'Weight Loss', 'Beginner', '3 months', 199.99, 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop'),
        ('Muscle Building', 'Advanced strength training program focused on muscle hypertrophy', 'Muscle Gain', 'Advanced', '6 months', 299.99, 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop'),
        ('CrossFit Training', 'High-intensity functional fitness program', 'General Fitness', 'Intermediate', '3 months', 249.99, 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop'),
        ('Yoga & Flexibility', 'Improve flexibility, balance and mindfulness', 'Flexibility', 'Beginner', '2 months', 149.99, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'),
        ('HIIT Bootcamp', 'High-intensity interval training for maximum results', 'Weight Loss', 'Intermediate', '2 months', 179.99, 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&h=600&fit=crop'),
        ('Personal Training', 'One-on-one customized training sessions', 'Custom', 'All Levels', 'Flexible', 399.99, 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop')
      `);
    }

    // Check if trainers already exist
    const [trainers] = await connection.query('SELECT COUNT(*) as count FROM trainers');
    
    if (trainers[0].count === 0) {
      console.log('Inserting sample trainers...');
      await connection.query(`
        INSERT INTO trainers (name, title, specialization, bio, years_experience, image_url) VALUES
        ('John Smith', 'Head Coach', 'Strength & Conditioning', 'Certified personal trainer with over 10 years of experience in strength training and athletic performance.', 10, 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop'),
        ('Sarah Johnson', 'Yoga Instructor', 'Yoga & Mindfulness', 'Specialized in Hatha and Vinyasa yoga with focus on flexibility and stress relief.', 8, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'),
        ('Mike Williams', 'CrossFit Coach', 'CrossFit & HIIT', 'Former competitive athlete, passionate about functional fitness and community building.', 6, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'),
        ('Emily Davis', 'Nutrition Expert', 'Weight Loss & Nutrition', 'Certified nutritionist helping clients achieve their weight loss goals through balanced diet plans.', 7, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop')
      `);
    }

    // Check if membership plans already exist
    const [plans] = await connection.query('SELECT COUNT(*) as count FROM membership_plans');
    
    if (plans[0].count === 0) {
      console.log('Inserting sample membership plans...');
      await connection.query(`
        INSERT INTO membership_plans (name, description, monthly_price, yearly_price, features, is_popular) VALUES
        (
          'Basic',
          'Perfect for getting started with your fitness journey',
          29.99,
          299.99,
          JSON_ARRAY('Access to gym equipment', '1 group class per week', 'Locker room access', 'Free WiFi'),
          FALSE
        ),
        (
          'Premium',
          'Our most popular plan with great value',
          59.99,
          599.99,
          JSON_ARRAY('Unlimited gym access', 'Unlimited group classes', 'Free guest passes (2/month)', 'Locker room & showers', 'Nutrition consultation', 'Free parking'),
          TRUE
        ),
        (
          'Elite',
          'Ultimate fitness experience with all benefits',
          99.99,
          999.99,
          JSON_ARRAY('All Premium benefits', 'Personal training sessions (4/month)', 'Spa & sauna access', 'Towel service', 'Priority class booking', 'Supplements discount', 'Private locker'),
          FALSE
        )
      `);
    }

    // Check if testimonials already exist
    const [testimonials] = await connection.query('SELECT COUNT(*) as count FROM testimonials');
    
    if (testimonials[0].count === 0) {
      console.log('Inserting sample testimonials...');
      await connection.query(`
        INSERT INTO testimonials (name, rating, comment, is_approved, image_url) VALUES
        ('David Brown', 5, 'Amazing gym with top-notch equipment and friendly staff. Lost 20 pounds in 3 months!', TRUE, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'),
        ('Lisa Anderson', 5, 'The trainers here are incredibly knowledgeable and supportive. Best decision I ever made!', TRUE, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'),
        ('Robert Wilson', 5, 'Great atmosphere and community. The group classes are challenging and fun!', TRUE, 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop'),
        ('Jennifer Martinez', 5, 'Achieved my fitness goals faster than expected. Highly recommend this gym!', TRUE, 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop')
      `);
    }

    console.log('✅ Sample data inserted successfully');

  } catch (error) {
    console.error('Error inserting sample data:', error.message);
    // Don't throw error here, just log it
  }
};

// Run the initialization
createTables().catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});

export default createTables;