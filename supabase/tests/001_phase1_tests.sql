-- ============================================================
-- PHASE 1 SECURITY TESTS
-- Run AFTER 001_phase1_foundation.sql
-- All tests should return the result described in the comment.
-- ============================================================

-- TEST 1: Tables exist
-- Expected: 2 rows — 'admin_users' and 'clippers'
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('admin_users', 'clippers')
ORDER BY table_name;

-- TEST 2: RLS is enabled on both tables
-- Expected: 2 rows, both showing rowsecurity = true
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('admin_users', 'clippers');

-- TEST 3: All RLS policies exist
-- Expected: 6 rows (all our policies)
SELECT policyname, tablename, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('admin_users', 'clippers')
ORDER BY tablename, policyname;

-- TEST 4: Helper functions exist
-- Expected: 3 rows
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public'
  AND routine_name IN ('get_my_role', 'is_admin', 'is_super_admin', 'update_updated_at_column')
ORDER BY routine_name;

-- TEST 5: No DELETE policy exists on clippers (hard delete blocked)
-- Expected: 0 rows
SELECT policyname FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'clippers'
  AND cmd = 'DELETE';

-- TEST 6: Indexes exist
-- Expected: 4 rows
SELECT indexname FROM pg_indexes
WHERE tablename = 'clippers'
  AND schemaname = 'public'
  AND indexname LIKE 'idx_%'
ORDER BY indexname;

-- TEST 7: CHECK constraints on tier and status columns
-- Expected: rows showing tier and status constraints
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'clippers'::regclass
  AND contype = 'c'
ORDER BY conname;
