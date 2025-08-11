-- Drop the database if it exists
DROP DATABASE IF EXISTS tlik_db;

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS tlik_db;

-- Create the user if it doesn't exist and set the password
CREATE USER IF NOT EXISTS 'KayCode'@'localhost' IDENTIFIED BY 'Kar_.702';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON tlik_db.* TO 'KayCode'@'localhost';

-- Grant select privileges on performance_schema to the user
GRANT SELECT ON performance_schema.* TO 'KayCode'@'localhost';

-- Apply the changes
FLUSH PRIVILEGES;
