export const SAMPLE_ASSESSMENTS = {
  'Full Stack Developer': {
    title: 'Full Stack Modern Engineering Certification Exam',
    questions: [
      {
        id: 'q1',
        questionText: 'When designing a scalable React 18 component tree, which hook should be preferred to memoize expensive computations between renders without recalculating on every render?',
        codeSnippet: 'const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);',
        options: [
          'useCallback',
          'useMemo',
          'useEffect',
          'useRef'
        ],
        correctOptionIndex: 1,
        explanation: 'useMemo caches the result of an expensive calculation and only recalculates when one of its specified dependencies changes.',
        competencyTag: 'React 18 Performance Optimization',
        difficulty: 'Intermediate'
      },
      {
        id: 'q2',
        questionText: 'In a production Node.js/Express architecture, what is the most secure method to store JWT access tokens on the client to protect against Cross-Site Scripting (XSS)?',
        codeSnippet: `res.cookie('token', jwtToken, {\n  httpOnly: true,\n  secure: true,\n  sameSite: 'strict'\n});`,
        options: [
          'In browser localStorage',
          'In window.sessionStorage',
          'In an HTTP-only, Secure, SameSite Strict cookie',
          'In a global JavaScript window variable'
        ],
        correctOptionIndex: 2,
        explanation: 'HTTP-only cookies cannot be accessed by client-side JavaScript, rendering them immune to extraction via XSS vulnerabilities.',
        competencyTag: 'Web Security & Session Management',
        difficulty: 'Advanced'
      },
      {
        id: 'q3',
        questionText: 'In MongoDB document design, when is it recommended to use referencing (normalized IDs) rather than embedding subdocuments?',
        codeSnippet: 'userSchema = { _id: ObjectId, orders: [{ type: ObjectId, ref: "Order" }] };',
        options: [
          'When data is small and rarely updated',
          'When there is a one-to-squillions or unbounded one-to-many relationship',
          'When you always read parent and child together',
          'When subdocuments are strictly less than 5 items'
        ],
        correctOptionIndex: 1,
        explanation: 'In MongoDB, embedding unbounded arrays risks exceeding the 16MB BSON document size limit and causes performance degradation. Referencing avoids this.',
        competencyTag: 'Database Architecture & Modeling',
        difficulty: 'Intermediate'
      },
      {
        id: 'q4',
        questionText: 'Why are multi-stage Docker builds standard practice for containerizing Node.js and React applications?',
        codeSnippet: `FROM node:20-alpine AS builder\n...\nFROM node:20-alpine AS runner\nCOPY --from=builder /app/dist ./dist`,
        options: [
          'They execute multiple containers simultaneously in parallel',
          'They isolate build tools and devDependencies, drastically reducing final production image size and security surface',
          'They allow using different operating systems in the same container',
          'They bypass Docker layer caching completely'
        ],
        correctOptionIndex: 1,
        explanation: 'Multi-stage builds leave compiler toolchains, devDependencies, and raw source files in earlier stages, resulting in lightweight, secure production images.',
        competencyTag: 'DevOps & Containerization',
        difficulty: 'Intermediate'
      },
      {
        id: 'q5',
        questionText: 'Which HTTP status code is the appropriate semantic response when an authenticated client attempts to access a protected administrative resource without sufficient role permissions?',
        codeSnippet: '// Authenticated user with role "learner" requesting /api/admin/users',
        options: [
          '401 Unauthorized',
          '403 Forbidden',
          '400 Bad Request',
          '404 Not Found'
        ],
        correctOptionIndex: 1,
        explanation: '401 Unauthorized indicates authentication is missing or invalid; 403 Forbidden indicates the server understands the caller identity but refuses authorization.',
        competencyTag: 'RESTful API Standards',
        difficulty: 'Beginner'
      }
    ]
  },
  'AI Engineer': {
    title: 'Generative AI & LLM Systems Competency Exam',
    questions: [
      {
        id: 'ai-q1',
        questionText: 'In a Retrieval-Augmented Generation (RAG) system, why is semantic text chunking with sliding overlap used instead of arbitrary character splitting?',
        codeSnippet: 'chunker = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)',
        options: [
          'To increase embedding latency for accuracy',
          'To preserve syntactic context and prevent semantic sentences from being truncated mid-thought across chunk boundaries',
          'To guarantee chunks match token counts exactly',
          'To avoid generating vector embeddings'
        ],
        correctOptionIndex: 1,
        explanation: 'Sliding overlap ensures that entities and concepts straddling chunk boundaries are retained in both chunks, boosting retrieval precision.',
        competencyTag: 'RAG Architecture',
        difficulty: 'Intermediate'
      },
      {
        id: 'ai-q2',
        questionText: 'Which metric is standard for computing similarity between high-dimensional normalized vector embeddings?',
        codeSnippet: 'similarity = dot(A, B) / (norm(A) * norm(B))',
        options: [
          'Manhattan Distance',
          'Cosine Similarity',
          'Hamming Distance',
          'Jaccard Similarity'
        ],
        correctOptionIndex: 1,
        explanation: 'Cosine similarity measures the angle between vectors independent of their magnitude, making it ideal for normalized semantic text embeddings.',
        competencyTag: 'Vector Embeddings',
        difficulty: 'Intermediate'
      },
      {
        id: 'ai-q3',
        questionText: 'What is the purpose of Tool/Function Calling in modern LLMs?',
        codeSnippet: 'tools = [{"name": "get_stock_price", "parameters": {...}}]',
        options: [
          'Allows the LLM to directly execute Python code in the browser',
          'Enables the model to detect when external APIs must be queried and return structured arguments to invoke them',
          'Forces the model to skip the tokenizer',
          'Trains model weights in real time'
        ],
        correctOptionIndex: 1,
        explanation: 'Function calling allows LLMs to determine when external data or calculations are needed and format a structured call that the host application executes.',
        competencyTag: 'Agentic Systems',
        difficulty: 'Intermediate'
      }
    ]
  },
  'Cloud DevOps Engineer': {
    title: 'Cloud DevOps & Infrastructure Certification Exam',
    questions: [
      {
        id: 'devops-q1',
        questionText: 'In Kubernetes, what is the role of a Readiness Probe compared to a Liveness Probe?',
        codeSnippet: 'readinessProbe:\n  httpGet:\n    path: /healthz\n    port: 8080',
        options: [
          'Readiness restarts the container; Liveness sends traffic to it',
          'Readiness determines whether the container is ready to accept user traffic; Liveness determines whether the container should be restarted',
          'Both probes do the exact same action',
          'Readiness checks the host machine CPU usage'
        ],
        correctOptionIndex: 1,
        explanation: 'A failing readiness probe removes the pod from the service endpoints so it receives no traffic; a failing liveness probe triggers container restart.',
        competencyTag: 'Kubernetes Orchestration',
        difficulty: 'Intermediate'
      },
      {
        id: 'devops-q2',
        questionText: 'Why should Terraform remote state files be protected with state locking (e.g. AWS DynamoDB)?',
        codeSnippet: 'terraform {\n  backend "s3" {\n    dynamodb_table = "terraform-locks"\n  }\n}',
        options: [
          'To compress the state file size',
          'To prevent concurrent pipeline runs from corrupting infrastructure state with race conditions',
          'To avoid encrypting the state file',
          'To speed up terraform plan calculations'
        ],
        correctOptionIndex: 1,
        explanation: 'State locking prevents two engineers or CI pipelines from modifying the same infrastructure state simultaneously, which would cause corruption.',
        competencyTag: 'Infrastructure as Code',
        difficulty: 'Advanced'
      }
    ]
  }
};
