-- =========================================
-- EXTENSIONS
-- =========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================
-- PROFILES TABLE (linked to auth.users)
-- =========================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    avatar_url TEXT,
    currency TEXT DEFAULT 'KES',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =========================================
-- CATEGORIES TABLE
-- =========================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT CHECK (type IN ('income', 'expense')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- TRANSACTIONS TABLE (CORE)
-- =========================================
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

    amount NUMERIC(12,2) NOT NULL,
    type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,

    category_id UUID REFERENCES categories(id),
    description TEXT,
    receipt_url TEXT,

    transaction_date DATE NOT NULL,
    is_recurring BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- BUDGETS TABLE
-- =========================================
CREATE TABLE budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

    category_id UUID REFERENCES categories(id),
    amount NUMERIC(12,2) NOT NULL,

    period TEXT CHECK (period IN ('weekly', 'monthly')) DEFAULT 'monthly',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,

    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- GOALS TABLE
-- =========================================
CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

    title TEXT NOT NULL,
    target_amount NUMERIC(12,2) NOT NULL,
    current_amount NUMERIC(12,2) DEFAULT 0,

    deadline DATE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed')),

    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- DEBTS TABLE
-- =========================================
CREATE TABLE debts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

    name TEXT NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    remaining_amount NUMERIC(12,2),

    interest_rate NUMERIC(5,2),
    due_date DATE,

    type TEXT CHECK (type IN ('owed', 'lent')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paid')),

    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- NOTIFICATIONS TABLE
-- =========================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

    title TEXT,
    message TEXT,

    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- INDEXES (PERFORMANCE)
-- =========================================
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_budgets_user ON budgets(user_id);
CREATE INDEX idx_goals_user ON goals(user_id);
CREATE INDEX idx_debts_user ON debts(user_id);

-- =========================================
-- FUNCTIONS
-- =========================================

-- Calculate total expenses for a category within a period
CREATE OR REPLACE FUNCTION get_total_expenses(
    uid UUID,
    cat_id UUID,
    start_d DATE,
    end_d DATE
)
RETURNS NUMERIC AS $$
BEGIN
    RETURN COALESCE((
        SELECT SUM(amount)
        FROM transactions
        WHERE user_id = uid
        AND category_id = cat_id
        AND type = 'expense'
        AND transaction_date BETWEEN start_d AND end_d
    ), 0);
END;
$$ LANGUAGE plpgsql;

-- =========================================
-- ROW LEVEL SECURITY (RLS)
-- =========================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE debts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- =========================================
-- POLICIES
-- =========================================

-- PROFILES
CREATE POLICY "Users can view their profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- GENERIC USER-OWNED TABLE POLICY TEMPLATE

-- Categories
CREATE POLICY "Users manage their categories"
ON categories FOR ALL
USING (auth.uid() = user_id);

-- Transactions
CREATE POLICY "Users manage their transactions"
ON transactions FOR ALL
USING (auth.uid() = user_id);

-- Budgets
CREATE POLICY "Users manage their budgets"
ON budgets FOR ALL
USING (auth.uid() = user_id);

-- Goals
CREATE POLICY "Users manage their goals"
ON goals FOR ALL
USING (auth.uid() = user_id);

-- Debts
CREATE POLICY "Users manage their debts"
ON debts FOR ALL
USING (auth.uid() = user_id);

-- Notifications
CREATE POLICY "Users manage their notifications"
ON notifications FOR ALL
USING (auth.uid() = user_id);

-- =========================================
-- OPTIONAL: DEFAULT CATEGORIES (SEED)
-- =========================================

INSERT INTO categories (user_id, name, type)
SELECT id, 'Food', 'expense' FROM profiles;

INSERT INTO categories (user_id, name, type)
SELECT id, 'Transport', 'expense' FROM profiles;

INSERT INTO categories (user_id, name, type)
SELECT id, 'Salary', 'income' FROM profiles;