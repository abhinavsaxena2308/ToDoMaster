-- Create the tasks table
CREATE TABLE tasks (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
    due_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the sub_tasks table
CREATE TABLE sub_tasks (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    task_id BIGINT REFERENCES tasks(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE
);

-- Enable Row Level Security (RLS) for the tables
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for tasks table
CREATE POLICY "Users can view their own tasks" ON tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own tasks" ON tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own tasks" ON tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own tasks" ON tasks FOR DELETE USING (auth.uid() = user_id);

-- Create policies for sub_tasks table
CREATE POLICY "Users can view sub_tasks for their own tasks" ON sub_tasks FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM tasks WHERE id = sub_tasks.task_id)
);
CREATE POLICY "Users can insert sub_tasks for their own tasks" ON sub_tasks FOR INSERT WITH CHECK (
    auth.uid() = (SELECT user_id FROM tasks WHERE id = sub_tasks.task_id)
);
CREATE POLICY "Users can update sub_tasks for their own tasks" ON sub_tasks FOR UPDATE USING (
    auth.uid() = (SELECT user_id FROM tasks WHERE id = sub_tasks.task_id)
);
CREATE POLICY "Users can delete sub_tasks for their own tasks" ON sub_tasks FOR DELETE USING (
    auth.uid() = (SELECT user_id FROM tasks WHERE id = sub_tasks.task_id)
);
