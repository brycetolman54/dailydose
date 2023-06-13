# Security
- This is SO **IMPORTANT**
- **O**pen **W**orldwide **A**pplication **S**ecurity **P**roject Top 10
  1. _Broken Access Control_:
     - Least privilege access violation: they can access stuff they shouldn't have access to with their authentication
     - URL bypass control: you can just change something in the URL in order to access a page you shouldn't be able to
     - Resource ID allows access: you can access something on the server that you weren't supposed to be able to access
  2. _Cryptographic Failures_: 
     - Transmitting Data as clear text
     - Exncrypting only at rest: You need to encrypt on front and back end
     - Weak Cryptography
     - Misused cryptography (no salt, wrong params)
  3. _Injection_:
     - User supplied data is not sanitized
     - User supplied data programatically executed
  4. _Insecure Design:_
     - Unlimited trial accounts
     - Not aware of best practices
     - Customer datan ot segmented
     - Single layer defense
  5. _Security Misconfiguration_:
     - Development info exposed: You let them know what you are using on the backend
     - Using default configurations
     - Unnecessary features installed
     - System not hardened: remove excess functionality 
  6. _Vulnerable Components_:
     - Unnecessary/unused packages imported
     - Untrusted/unverified sources
     - Out of date software
     - Not tracking vulnerability bulletins
     - Package versions not locked
  7. _ID and Auth Failures_:
     - Credential stuffing (compromised list)
     - Brute force attacks (guess a password)
     - Permitting weak passwords
     - Weak credential recovery
     - Credentials in URL
     - Not expiring auth tokens
  8. _Software Integrity Failures_:
     - Unverified CDN usage
     - Unverified packages (npm install)
     - Unverified updates
     - Insecure CD/CI platforms
  9. _Logging Failure_:
     - Not logging critical requests
     - Not monitoring system performance
     - Logs not audited, automatic or manual
     - Logs not stored centrally
     - No real-time response
  10. _Server Side Request Forgery_:
      - They can hack your back end

# Progressive Web Application
- You write one application, and it runs everywhere

# TypeScript
- You make files with this like `file.tsx`
- You can define types now: `function func(param: number)` will only take a number as the parameter
- Interfaces are somewhat like base classes in C++, but you don't have to declare the type of the variable for an interface when you declare it
- If you define an interface, any object you define later that follows that definition, even without explicitly declaring it the type of the interface, it will be classified as under that interface
- When you do a `querySelector`, you have to define what you are looking for with `document.querySelector<HTMLElement>('#id')`
```
inheritance Book {
  title: string;
  id: number;
}

// The function only takes variable book of the type Book
function catalog(book: Book) {
  console.log(book.title, book.id);
}

// Since we have defined myBook with the same definition as Book is, it is a Book, even though it is not explicitly declared
const myBook = {title: 'Hey there', id: 596};
// Only becase myBook is a Book can it be taken into this function
catalog(myBook);
```

# Performance
- 
