Dovepeak-Fintrack (DFT) – Functional Documentation
 1. System Overview

Dovepeak-Fintrack (DFT) is a personal finance management system that enables users to:

Record financial activities
Monitor financial position
Plan and control spending
Track obligations and goals
Generate insights for decision-making

The system operates on a user-centric, transaction-driven model, where all financial data originates from recorded transactions.

 2. Core Functional Objectives

The system must:

Capture financial data accurately
Organize data into meaningful categories
Provide real-time financial status
Support planning (budgets & goals)
Enable tracking of obligations (debts)
Generate actionable insights
 3. User Functional Capabilities
 3.1 Authentication & Account Management
Functional Requirements:
User can register an account
User can log in securely
User can log out
User session must persist across requests
User can update profile information
System Behavior:
On signup → profile is automatically created
On login → user is redirected to dashboard
Unauthorized users → blocked from protected routes
 3.2 Income Management
Functional Requirements:
User can add income entries
User can categorize income sources
User can mark income as recurring
User can view income history
System Behavior:
Each income entry is stored as a transaction (type = income)
Recurring income may trigger future entries (optional automation)
Income contributes to total balance
 3.3 Expense Management
Functional Requirements:
User can add expenses
User can assign categories
User can attach receipts (optional)
User can edit/delete expenses
User can view expenses over time
System Behavior:
Each expense is stored as a transaction (type = expense)
Expense reduces available balance
If linked to a budget → triggers budget evaluation
 3.4 Transactions Management (Core Engine)
Functional Requirements:
System maintains a unified transaction log
User can filter by:
date
category
type (income/expense)
User can search transactions
System Behavior:
All financial activities are reflected here
This module feeds:
Dashboard
Reports
Budgets
Cash flow analysis
 3.5 Budget Management
Functional Requirements:
User can create budgets
Budgets can be:
category-based
time-based (weekly/monthly)
User can monitor budget usage
System Behavior:

System calculates:

total expenses in category within period
If spending exceeds threshold:
Trigger alert
Budget status:
Under budget
Near limit
Exceeded
 3.6 Cash Flow Management
Functional Requirements:
User can view:
total income
total expenses
net balance
System Behavior:

Net Cash Flow:

Net = Total Income - Total Expenses
Display:
daily trends
monthly summaries
3.7 Goals Management
Functional Requirements:
User can create financial goals
Define:
target amount
deadline
Track progress
System Behavior:

Progress:

progress = current_amount / target_amount
Status:
Active
Completed (auto when target reached)
 3.8 Debt Management
Functional Requirements:
User can record debts:
money owed
money lent
Track repayments
View outstanding balances
System Behavior:
Debt has:
original amount
remaining amount
When payments are recorded:
remaining amount decreases
Status updates:
Active → Paid
 3.9 Notifications & Alerts
Functional Requirements:
Notify users of:
budget overuse
upcoming debt deadlines
goal deadlines
System Behavior:
Notifications stored in database
Triggered by:
transactions
time-based checks
User can mark as read
 3.10 Insights & Reporting
Functional Requirements:
Provide analytics:
spending by category
monthly trends
top expenses
System Behavior:
System aggregates transaction data
Generates summaries dynamically
Helps user identify patterns
 3.11 Settings & Preferences
Functional Requirements:
User can:
update profile
set preferred currency
manage preferences
 4. System Workflows
 4.1 Add Expense Workflow
User inputs expense details
Data validated
Stored in transactions table
Budget recalculated
If exceeded → notification created
Dashboard updates
➤ 4.2 Add Income Workflow
User inputs income
Stored as transaction
Balance updated
Dashboard reflects change
➤ 4.3 Budget Monitoring Workflow
System checks expenses per category
Compares with budget
If threshold reached:
Trigger alert
➤ 4.4 Goal Tracking Workflow
User sets goal
User contributes funds
System updates progress
If target reached:
Mark goal completed
➤ 4.5 Debt Repayment Workflow
User records payment
Remaining balance updated
If zero:
Status → Paid
🧠 5. Business Logic Rules
Every financial record must belong to a user
Transactions are immutable records (prefer edit over delete logs later)
Expenses must reduce net balance
Income must increase net balance
Budgets apply only to expenses
Goals cannot exceed target once completed
Debts must always track remaining balance
🔐 6. Security & Access Control
Each user accesses only their data
All database operations respect Row Level Security
Authenticated access required for all financial operations
⚡ 7. Performance Expectations
Fast transaction queries (indexed)
Real-time updates (Supabase capability)
Minimal API latency (serverless functions)
🧱 8. Constraints & Assumptions
Single-user per account (no shared accounts initially)
Manual data entry (no bank integration yet)
Internet connection required (no offline mode yet)
🚀 9. Success Criteria

The system is successful if:

Users can consistently track finances
Users can understand where money goes
Users can control spending via budgets
Users can achieve financial goals