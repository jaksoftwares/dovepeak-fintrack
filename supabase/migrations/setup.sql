-- =================================================================================
-- Dovepeak-Fintrack (DFT) - Complete Database Schema & Supabase Migration
-- =================================================================================
-- This script handles all core functionalities: Tracking, Budgets, Goals,
-- Debt Management, Notifications, and automated Trigger Logic.
-- =================================================================================

-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =================================================================================
-- 2. TABLE DEFINITIONS
-- =================================================================================

-- 2.1 Profiles (Extends auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    currency TEXT DEFAULT 'USD',
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2.2 Categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
    icon TEXT, -- Lucide icon name fallback
    color TEXT, -- Hex color representation
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2.3 Transactions (Core Ledger)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
    description TEXT,
    transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
    receipt_url TEXT,
    is_recurring BOOLEAN DEFAULT FALSE,
    recurring_interval TEXT CHECK (recurring_interval IN ('daily', 'weekly', 'monthly', 'yearly')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2.4 Budgets
CREATE TABLE budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE, -- NULL means overall budget
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    period TEXT CHECK (period IN ('weekly', 'monthly', 'yearly')) DEFAULT 'monthly',
    notify_threshold NUMERIC(5,2) DEFAULT 80.00, -- e.g., send notification at 80% usage
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2.5 Goals
CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    target_amount NUMERIC(12,2) NOT NULL CHECK (target_amount > 0),
    current_amount NUMERIC(12,2) DEFAULT 0 CHECK (current_amount >= 0),
    deadline DATE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'halted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2.6 Debts
CREATE TABLE debts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT CHECK (type IN ('owed', 'borrowed')) NOT NULL, -- Owed TO user vs Borrowed BY user
    total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount > 0),
    remaining_amount NUMERIC(12,2) NOT NULL CHECK (remaining_amount >= 0),
    interest_rate NUMERIC(5,2) DEFAULT 0,
    due_date DATE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paid', 'defaulted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2.7 Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('budget_alert', 'goal_reached', 'debt_due', 'system')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- =================================================================================
-- 3. AUTOMATED TRIGGERS & BUSINESS LOGIC
-- =================================================================================

-- 3.1 Handle New User Signups -> Auto Profile & Default Categories
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');

  -- Insert default categories for tracking
  INSERT INTO public.categories (user_id, name, type, icon, color) VALUES
    (NEW.id, 'Salary', 'income', 'Briefcase', '#16A34A'),
    (NEW.id, 'Investments', 'income', 'TrendingUp', '#3B82F6'),
    (NEW.id, 'Housing', 'expense', 'Home', '#0F172A'),
    (NEW.id, 'Food & Dining', 'expense', 'Utensils', '#F59E0B'),
    (NEW.id, 'Transport', 'expense', 'Car', '#8B5CF6'),
    (NEW.id, 'Entertainment', 'expense', 'Film', '#EC4899'),
    (NEW.id, 'Utilities', 'expense', 'Zap', '#06B6D4');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 3.2 Automated Goal & Debt Status Updates
CREATE OR REPLACE FUNCTION public.check_financial_milestones()
RETURNS TRIGGER AS $$
BEGIN
  -- Goal Logic: Mark completed if target reached
  IF TG_TABLE_NAME = 'goals' THEN
    IF NEW.current_amount >= NEW.target_amount AND OLD.status != 'completed' THEN
      NEW.status := 'completed';
      -- Create notification
      INSERT INTO public.notifications (user_id, type, title, message)
      VALUES (NEW.user_id, 'goal_reached', 'Goal Reached!', 'Congratulations, you have fully funded your goal: ' || NEW.title);
    END IF;
    NEW.updated_at := NOW();
  END IF;

  -- Debt Logic: Mark paid if remaining amount hits 0
  IF TG_TABLE_NAME = 'debts' THEN
    IF NEW.remaining_amount <= 0 AND OLD.status != 'paid' THEN
      NEW.status := 'paid';
      NEW.remaining_amount := 0;
      INSERT INTO public.notifications (user_id, type, title, message)
      VALUES (NEW.user_id, 'system', 'Debt Cleared', 'You have successfully settled the debt: ' || NEW.name);
    END IF;
    NEW.updated_at := NOW();
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER goals_check_status
  BEFORE UPDATE ON goals
  FOR EACH ROW EXECUTE FUNCTION public.check_financial_milestones();

CREATE OR REPLACE TRIGGER debts_check_status
  BEFORE UPDATE ON debts
  FOR EACH ROW EXECUTE FUNCTION public.check_financial_milestones();


-- 3.3 Budget Overuse Warning (Alert when inserting an expense)
CREATE OR REPLACE FUNCTION public.check_budget_limits()
RETURNS TRIGGER AS $$
DECLARE
  v_budget RECORD;
  v_spent NUMERIC;
BEGIN
  -- Only track expenses against budgets
  IF NEW.type = 'expense' THEN
    -- Find if there is an active budget for this category running right now
    FOR v_budget IN 
      SELECT * FROM budgets 
      WHERE user_id = NEW.user_id 
        AND category_id = NEW.category_id 
        AND is_active = TRUE
    LOOP
      -- Calculate total spent so far this month (assuming monthly period for this logic)
      SELECT COALESCE(SUM(amount), 0) INTO v_spent
      FROM transactions
      WHERE user_id = NEW.user_id 
        AND category_id = NEW.category_id 
        AND type = 'expense'
        AND date_trunc('month', transaction_date) = date_trunc('month', NEW.transaction_date);
        
      -- Note: v_spent already includes NEW.amount because this should be an AFTER INSERT trigger.
      -- If they crossed the threshold:
      IF v_spent >= (v_budget.amount * (v_budget.notify_threshold / 100.0)) THEN
        -- Check if we already warned them this month to prevent spam (Optional refinement, skipping for brevity here)
        INSERT INTO notifications (user_id, type, title, message)
        VALUES (
          NEW.user_id, 'budget_alert', 'Budget Warning', 
          'You have reached ' || ROUND((v_spent / v_budget.amount) * 100, 1) || '% of your budget limit for this category.'
        );
      END IF;
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER transactions_check_budget
  AFTER INSERT ON transactions
  FOR EACH ROW EXECUTE FUNCTION public.check_budget_limits();


-- =================================================================================
-- 4. ANALYTICS VIEWS
-- =================================================================================

-- 4.1 Cash Flow Overview
CREATE OR REPLACE VIEW user_cash_flow AS
SELECT 
  user_id,
  date_trunc('month', transaction_date) AS month,
  SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
  SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expenses,
  (SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)) AS net_balance
FROM transactions
GROUP BY user_id, date_trunc('month', transaction_date);


-- =================================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- =================================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE debts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can deeply read/update their own profile
CREATE POLICY "Users can manage their profile" ON profiles
  FOR ALL USING (auth.uid() = id);

-- Categories: Users can manage their own
CREATE POLICY "Users manage their categories" ON categories
  FOR ALL USING (auth.uid() = user_id);

-- Transactions: Strict Isolation
CREATE POLICY "Users manage their transactions" ON transactions
  FOR ALL USING (auth.uid() = user_id);

-- Budgets
CREATE POLICY "Users manage their budgets" ON budgets
  FOR ALL USING (auth.uid() = user_id);

-- Goals
CREATE POLICY "Users manage their goals" ON goals
  FOR ALL USING (auth.uid() = user_id);

-- Debts
CREATE POLICY "Users manage their debts" ON debts
  FOR ALL USING (auth.uid() = user_id);

-- Notifications
CREATE POLICY "Users manage their notifications" ON notifications
  FOR ALL USING (auth.uid() = user_id);

-- =================================================================================
-- 6. PERFORMANCE INDEXES
-- =================================================================================

CREATE INDEX idx_txn_user_date ON transactions(user_id, transaction_date);
CREATE INDEX idx_txn_category ON transactions(category_id);
CREATE INDEX idx_budget_user ON budgets(user_id);
CREATE INDEX idx_goals_user_status ON goals(user_id, status);
CREATE INDEX idx_debts_user_status ON debts(user_id, status);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;