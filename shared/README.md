# About `ai-daily` Library

Various utilities of use to both the front-end and back-end modules by AI-DAILY Team for AI-DAILY Team

# Breakdown of the Library

### Method
A type that defines `HTTP` request methods, including:
* `get`
* `post`, 
* `put`,
* `delete`.

Usage:
```typescript
import { Method } from 'ai-daily';

const method: Method = 'get';
```

---

### ErrorType
A type that defines the types of errors that can be returned from a query, such as:
* `QueryError`
* `ServerError`
* `DatabaseError` 
* `UnhandledError`
* `TokenError`

Usage:
```typescript
import { ErrorType } from 'ai-daily';

// Simulating the error
const errorType: ErrorType = 'ServerError';

switch (errorType) {
    case "QueryError":
        console.error("Query error: Your query is malformed or invalid");
        break;
    case "ServerError":
        console.error("Server error: The server is down or unreachable");
        break;
    // rest of the errors
    default:
        console.error("Unhandled error: Oops, something went wrong");
        break;
}
```

---

### ResultError
A type that represents an error returned from a query, including a message and error type

Usage:
```typescript
import { ResultError } from 'ai-daily';

const error: ResultError = {
  message: 'Oops, something went wrong!',
  type: 'QueryError'
};
```

---

### ListQueryParams
A type that defines parameters for list or get queries, including:
* `filter`, 
* `for`, 
* `sort`,
* order (`asc` or `desc`),

Usage:
```typescript
import { ResultError } from 'ai-daily';

const queryParameters: ListQueryParams = {
  filter: 'keyword',
  for: 'user',
  sort: 'name',
  order: 'asc',
};
```

---

### Result<T>
A type that represents the result of a query of type `T`. It includes:
* `data` 
* `error`
* `success` properties

Usage:
```typescript
import { ResultError } from 'ai-daily';

const result: Result<number> = {
  data: 69,
  error: null,
  success: true
};
```

---

### Article
A type that defines a full article scrapped from the news outlets (we use BBC), including various properties like: 
* `id`
* `name`
* `author`
* `category`
* `body`
* `source_url`
* `cover_url`
* `retrieved_date`
* `publication_date`
* `image_gen`

Usage:
```typescript
import { Article } from 'ai-daily';

const article: Article = {
  id: 1,
  name: 'Can music help to deal with depression?',
  author: 'Mr Cat',
  category: 'Health',
  body: ['Music is a great way to deal with depression!'],
  source_url: 'https://youtu.be/fMLGmcv7ALI?si=1Qt61N6uPzWJBGf6',
  cover_url: 'https://external-preview.redd.it/xgJatj45MR6abvnjnpstnOp5XUDcsEd8D3R_zOLuAVc.jpg?width=640&crop=smart&auto=webp&s=c64edcde5c4384279a53d9b7afdfe75fc27f2230',
  retrieved_date: '2023-10-23T04:31:18Z',
  publication_date: '2023-10-23T04:31:18Z',
  image_gen: true
};
```
---

### ArticleResult
A type that represents the result of a full article query, including: 
* `data`
* `error`
* `success` properties.

Usage:
```typescript
import { ArticleResult } from 'ai-daily';

const articleResult: ArticleResult = {
  data: article,
  error: null,
  success: true
};
```

---

### ListedArticle
A type that defines an article returned in a list query, omitting the body property.

```typescript
import { ListedArticle } from 'ai-daily';

const listedArticle: ListedArticle = {
  id: 1,
  name: 'Ia d-aici ca n-ai servici',
  author: 'Sandu Ciorba',
  category: 'Music',
  source_url: 'https://youtu.be/A3g-lPWvXDI?si=s4AScrEiLz7AOa1k',
  retrieved_date: '2023-10-23T04:31:18Z',
  image_gen: true
};
```

---

### ListedArticleResult
A type that represents the result of a listed article query, including:
* `data`
* `error`
* `success` properties.

```typescript
import { ListedArticleResult } from 'ai-daily';

const listedArticleResult: ListedArticleResult = {
  data: listedArticle,
  error: null,
  success: true
};
```

---

### ArticleSummary
A type that defines a summary of the latest articles in each category.

```typescript
import { ArticleSummary } from 'ai-daily';

const articleSummary: ArticleSummary = {
  Technology: [article], 
  Science: [article]
};
```

---

### ArticleSummaryResult
A type that represents the result of an article summary query, including: 
* `data` 
* `error`
* `success` properties.

```typescript
import { ArticleSummary } from 'ai-daily';

const articleSummaryResult: ArticleSummaryResult = {
  data: articleSummary,
  error: null,
  success: true
};
```

---

### Category
A type that defines a category of articles, including: 
* category's `name` 
* `description`

### CategoryResult
A type that represents the result of a category query, including:
`data`
`error`
`success` properties.

Usage:
```typescript
import { Category, CategoryResult } from 'ai-daily';

const technologyCategory: Category = {
  category: 'Technology',
  description: 'News about technologies'
};

const successCategoryResult: CategoryResult = {
  data: technologyCategory,
  error: null,
  success: true
};

const errorCategoryResult: CategoryResult = {
  data: null,
  error: {
    message: 'Oops, category not found!',
    type: 'QueryError'
  },
  success: false
};
```
---

### fromSnakeCase

Converts a string from snake_case to readable format

Usage:
```typescript
import { fromSnakeCase } from 'ai-daily';

const readableString = fromSnakeCase('hello_world_this_is_a_test_string');

console.log(readableString); // hello world this is a test string
```

---

### toSentenceCase

Just capitalizes the first letter of a string

Usage:
```typescript
import { toSentenceCase } from 'ai-daily';

const sentence = toSentenceCase('hello world');

console.log(sentence); // Hello world
```

---

### timestamp

It returns `timestamp` in "ISO 8601" format ("YYYY-MM-DDTHH:mm:ss.sssZ")

Usage:
```typescript
import { timestamp } from 'ai-daily';

const currentTimestamp = timestamp();

console.log('Current Timestamp:', currentTimestamp); // 2023-10-23T12:34:56.789Z
```