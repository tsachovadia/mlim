---
description:
globs:
alwaysApply: false
---
# TEST-DRIVEN DEVELOPMENT (TDD) METHODOLOGY

**MANDATORY:** All development work in this project MUST follow TDD methodology and frequent commit practices.

## 🔄 TDD Red-Green-Refactor Cycle

### **1. RED Phase: Write Failing Tests First**
- **Always start with tests** - Never write production code without tests first
- Write comprehensive test cases that cover:
  - ✅ Happy path scenarios
  - ✅ Edge cases and error conditions  
  - ✅ Input validation
  - ✅ API response formats
  - ✅ Database interactions
- Tests should **FAIL initially** - this confirms they're actually testing something
- Use descriptive test names: `should return 404 for non-existent user`
- Include both positive and negative test cases

```typescript
// ✅ DO: Write failing tests first
describe('User API', () => {
  it('should return user profile with all required fields', async () => {
    const response = await request(app).get('/api/users/123');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: '123',
      name: expect.any(String),
      email: expect.any(String)
    });
  });

  it('should return 404 for non-existent user', async () => {
    const response = await request(app).get('/api/users/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });
});
```

### **2. GREEN Phase: Minimal Code to Pass Tests**
- Write **minimal production code** to make tests pass
- Don't over-engineer - just make tests green
- Focus on functionality, not optimization
- One failing test at a time

```typescript
// ✅ DO: Minimal implementation to pass tests
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (id === 'nonexistent') {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Minimal implementation to pass tests
  return res.json({
    id,
    name: 'Test User',
    email: 'test@example.com'
  });
};
```

### **3. REFACTOR Phase: Improve Code Quality**
- Improve code structure while keeping tests green
- Extract common patterns
- Optimize performance
- Enhance readability
- **Tests must remain green throughout refactoring**

## 🚀 Frequent Commit Strategy

### **Commit After Each TDD Phase**
1. **RED Commit**: `git commit -m "test: add failing tests for user profile API"`
2. **GREEN Commit**: `git commit -m "feat: implement minimal user profile endpoint"`  
3. **REFACTOR Commit**: `git commit -m "refactor: extract user validation logic"`

### **Commit Frequency Rules**
- ✅ **Every new test file**: Immediate commit
- ✅ **Every test passing**: Commit when moving from RED to GREEN
- ✅ **Every refactor**: Commit after successful refactoring
- ✅ **Every bug fix**: Commit with test that reproduces the bug, then fix
- ✅ **Every feature addition**: Multiple commits throughout TDD cycle

### **Commit Message Format**
```bash
# ✅ DO: Descriptive TDD-focused commit messages
git commit -m "test: add comprehensive validation tests for institution search_files API"
git commit -m "feat: implement institution search_files with SQLite compatibility"
git commit -m "fix: resolve pagination logic for search_files results"
git commit -m "refactor: extract common database query patterns"
git commit -m "test: add integration tests for program matching algorithm"
```

## 📝 TDD Implementation Checklist

### Before Writing ANY Production Code:
- [ ] **Write failing test first**
- [ ] **Confirm test fails** (RED phase)
- [ ] **Commit failing test**: `git commit -m "test: add failing test for X"`

### For Each Feature/Function:
- [ ] **Write comprehensive test cases**
- [ ] **Include error scenarios**
- [ ] **Test edge cases**
- [ ] **Verify API contracts**
- [ ] **Test database interactions**

### During Implementation:
- [ ] **Write minimal code to pass**
- [ ] **Run tests frequently**
- [ ] **Commit when tests pass**: `git commit -m "feat: implement X"`
- [ ] **Refactor if needed**: `git commit -m "refactor: improve X"`

### Quality Gates:
- [ ] **All tests passing**
- [ ] **Code coverage targets met**
- [ ] **No console errors**
- [ ] **TypeScript compilation clean**

## 🧪 Testing Standards

### **Test File Organization**
```
tests/
├── api/                 # API endpoint tests
│   ├── institutions.test.ts
│   ├── programs.test.ts
│   └── users.test.ts
├── unit/               # Unit tests for functions
│   ├── validation.test.ts
│   └── utils.test.ts
├── integration/        # Integration tests
│   └── database.test.ts
└── setup.ts           # Test configuration
```

### **Test Categories Required**
1. **Unit Tests**: Individual functions and methods
2. **Integration Tests**: API endpoints with database
3. **Edge Case Tests**: Error conditions and validation
4. **Performance Tests**: Response times and load handling

### **Database Testing**
- **Clean state**: Reset database before each test
- **Isolated data**: Each test creates its own test data
- **Realistic data**: Use actual data structures and formats

```typescript
// ✅ DO: Clean database state
beforeEach(async () => {
  await prisma.programRequirement.deleteMany();
  await prisma.program.deleteMany();
  await prisma.faculty.deleteMany();
  await prisma.institution.deleteMany();
});
```

## 🔄 TDD Workflow Integration

### **With Task Master Integration**
1. **Get task**: `task-master show <id>`
2. **Write tests first**: Create comprehensive test suite
3. **Commit tests**: `git commit -m "test: add tests for task <id>"`
4. **Implement minimal solution**
5. **Commit implementation**: `git commit -m "feat: complete task <id>"`
6. **Update task status**: `task-master set-status --id=<id> --status=done`

### **With Memory Bank Integration**
- **Document TDD progress** in `memory-bank/progress.md`
- **Record patterns discovered** during TDD cycles
- **Note test strategies** that work well for similar features

## ❌ Anti-Patterns to Avoid

### **Never Do:**
- ❌ Write production code before tests
- ❌ Skip tests because "it's simple"
- ❌ Write tests after implementation
- ❌ Large commits with multiple features
- ❌ Incomplete test coverage
- ❌ Tests that don't actually test the feature

### **Red Flags:**
- ❌ Tests passing on first run (may not be testing correctly)
- ❌ Skipping edge cases or error scenarios
- ❌ Mock-heavy tests that don't test real behavior
- ❌ Tests that depend on external services
- ❌ Flaky tests that sometimes pass/fail

## 🎯 Success Metrics

### **TDD Success Indicators:**
- ✅ **100% test coverage** for critical paths
- ✅ **Fast test suite** (< 30 seconds for full run)
- ✅ **Frequent commits** (multiple per hour during active development)
- ✅ **Clear commit history** showing TDD progression
- ✅ **Confident refactoring** enabled by comprehensive tests

---
*This TDD methodology is mandatory for all development work. No exceptions.*

