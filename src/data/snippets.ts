import type { Snippets } from '../types';

export const snippets: Snippets = {
  JavaScript: [
    `function calculateSum(numbers) {
  return numbers.reduce((sum, num) => {
    return sum + num;
  }, 0);
}`,

    `const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}`,

    `class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}`,

    `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x <= pivot);
  const right = arr.slice(1).filter(x => x > pivot);
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    `class LinkedList {
  constructor() {
    this.head = null;
  }

  addFirst(value) {
    const node = { value, next: this.head };
    this.head = node;
  }

  removeFirst() {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    return value;
  }
}`
  ],

  Python: [
    `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,

    `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
        self.prev = None
    
    def set_next(self, node):
        self.next = node
        node.prev = self`
  ],

  Go: [
    `func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}`,

    `type Stack struct {
    items []int
}

func (s *Stack) Push(item int) {
    s.items = append(s.items, item)
}

func (s *Stack) Pop() int {
    if len(s.items) == 0 {
        return -1
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item
}`
  ],

  TypeScript: [
    `interface TreeNode<T> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

function inorderTraversal<T>(root?: TreeNode<T>): T[] {
  if (!root) return [];
  return [
    ...inorderTraversal(root.left),
    root.value,
    ...inorderTraversal(root.right)
  ];
}`,
    `class PriorityQueue<T> {
  private heap: T[] = [];
  
  constructor(private compare: (a: T, b: T) => number) {}
  
  push(value: T): void {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }
  
  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const result = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return result;
  }
}`
  ],

  Rust: [
    `fn binary_search<T: Ord>(arr: &[T], target: &T) -> Option<usize> {
    let mut left = 0;
    let mut right = arr.len();

    while left < right {
        let mid = left + (right - left) / 2;
        match arr[mid].cmp(target) {
            Ordering::Equal => return Some(mid),
            Ordering::Less => left = mid + 1,
            Ordering::Greater => right = mid,
        }
    }
    None
}`,
    `impl<T> Stack<T> {
    pub fn new() -> Self {
        Stack { items: Vec::new() }
    }

    pub fn push(&mut self, item: T) {
        self.items.push(item);
    }

    pub fn pop(&mut self) -> Option<T> {
        self.items.pop()
    }

    pub fn is_empty(&self) -> bool {
        self.items.is_empty()
    }
}`
  ],

  Java: [
    `public class BinaryTree<T> {
    private T value;
    private BinaryTree<T> left;
    private BinaryTree<T> right;
    
    public void insert(T value) {
        if (this.value == null) {
            this.value = value;
            return;
        }
        if (compare(value, this.value) < 0) {
            if (left == null) left = new BinaryTree<>();
            left.insert(value);
        } else {
            if (right == null) right = new BinaryTree<>();
            right.insert(value);
        }
    }
}`,
    `public class Trie {
    private TrieNode root;
    
    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        TrieNode current = root;
        for (char c : word.toCharArray()) {
            current.children.putIfAbsent(c, new TrieNode());
            current = current.children.get(c);
        }
        current.isEndOfWord = true;
    }
}`
  ],

  Cpp: [
    `template<typename T>
class Graph {
    map<T, vector<T>> adj;
public:
    void addEdge(T from, T to) {
        adj[from].push_back(to);
    }
    
    vector<T> topologicalSort() {
        map<T, bool> visited;
        stack<T> st;
        
        for (const auto& vertex : adj) {
            if (!visited[vertex.first]) {
                dfs(vertex.first, visited, st);
            }
        }
        
        vector<T> result;
        while (!st.empty()) {
            result.push_back(st.top());
            st.pop();
        }
        return result;
    }
};`,
    `template<typename T>
class RedBlackTree {
    enum Color { RED, BLACK };
    struct Node {
        T data;
        Color color;
        Node *left, *right, *parent;
        
        Node(T data) : data(data), color(RED),
            left(nullptr), right(nullptr), parent(nullptr) {}
    };
    
    Node* root;
    
    void rotateLeft(Node* pt) {
        Node* pt_right = pt->right;
        pt->right = pt_right->left;
        
        if (pt->right != nullptr)
            pt->right->parent = pt;
            
        pt_right->parent = pt->parent;
        
        if (pt->parent == nullptr)
            root = pt_right;
        else if (pt == pt->parent->left)
            pt->parent->left = pt_right;
        else
            pt->parent->right = pt_right;
            
        pt_right->left = pt;
        pt->parent = pt_right;
    }
};`
  ],

  SQL: [
    `SELECT 
  departments.name,
  COUNT(employees.id) as employee_count,
  AVG(employees.salary) as avg_salary
FROM departments
LEFT JOIN employees ON departments.id = employees.department_id
GROUP BY departments.id, departments.name
HAVING COUNT(employees.id) > 5
ORDER BY avg_salary DESC;`,

    `WITH recursive employee_hierarchy AS (
  SELECT id, name, manager_id, 0 as level
  FROM employees
  WHERE manager_id IS NULL
  
  UNION ALL
  
  SELECT e.id, e.name, e.manager_id, h.level + 1
  FROM employees e
  JOIN employee_hierarchy h ON e.manager_id = h.id
)
SELECT name, level
FROM employee_hierarchy
ORDER BY level, name;`,

    `CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  total_amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
    REFERENCES users(id)
    ON DELETE CASCADE
);`
  ],

  HTML: [
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Layout</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="main-header">
    <nav class="nav-container">
      <ul class="nav-list">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
</body>
</html>`,

    `<form class="contact-form" action="/submit" method="POST">
  <div class="form-group">
    <label for="name">Full Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div class="form-group">
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4" required></textarea>
  </div>
  
  <button type="submit" class="submit-btn">Send Message</button>
</form>`,

    `<article class="blog-post">
  <header class="post-header">
    <h1>Understanding Semantic HTML</h1>
    <div class="post-meta">
      <time datetime="2024-02-20">February 20, 2024</time>
      <span class="author">by John Doe</span>
    </div>
  </header>
  
  <section class="post-content">
    <p>First paragraph of content...</p>
    <figure>
      <img src="example.jpg" alt="Descriptive text">
      <figcaption>Image caption here</figcaption>
    </figure>
  </section>
  
  <footer class="post-footer">
    <nav class="post-navigation">
      <a href="#prev" rel="prev">Previous Post</a>
      <a href="#next" rel="next">Next Post</a>
    </nav>
  </footer>
</article>`
  ]
};

export default snippets;
