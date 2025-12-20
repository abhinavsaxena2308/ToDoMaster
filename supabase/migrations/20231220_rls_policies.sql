-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_tasks ENABLE ROW LEVEL SECURITY;

-- Tasks table policies
-- Users can only see their own tasks
CREATE POLICY "Users can view own tasks" ON tasks
    FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own tasks
CREATE POLICY "Users can insert own tasks" ON tasks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own tasks
CREATE POLICY "Users can update own tasks" ON tasks
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can only delete their own tasks
CREATE POLICY "Users can delete own tasks" ON tasks
    FOR DELETE USING (auth.uid() = user_id);

-- Sub_tasks table policies
-- Users can only see subtasks of their own tasks
CREATE POLICY "Users can view own subtasks" ON sub_tasks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM tasks 
            WHERE tasks.id = sub_tasks.task_id 
            AND tasks.user_id = auth.uid()
        )
    );

-- Users can only insert subtasks for their own tasks
CREATE POLICY "Users can insert own subtasks" ON sub_tasks
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM tasks 
            WHERE tasks.id = sub_tasks.task_id 
            AND tasks.user_id = auth.uid()
        )
    );

-- Users can only update subtasks of their own tasks
CREATE POLICY "Users can update own subtasks" ON sub_tasks
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM tasks 
            WHERE tasks.id = sub_tasks.task_id 
            AND tasks.user_id = auth.uid()
        )
    );

-- Users can only delete subtasks of their own tasks
CREATE POLICY "Users can delete own subtasks" ON sub_tasks
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM tasks 
            WHERE tasks.id = sub_tasks.task_id 
            AND tasks.user_id = auth.uid()
        )
    );
