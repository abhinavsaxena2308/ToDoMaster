-- Add priority column to tasks table
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS priority TEXT NOT NULL DEFAULT 'Medium' 
CHECK (priority IN ('Low', 'Medium', 'High'));

-- Update existing tasks to have the default priority value
UPDATE tasks 
SET priority = 'Medium' 
WHERE priority IS NULL;