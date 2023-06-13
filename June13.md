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
