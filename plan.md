1. Edit `app/api/instant-responder/demo/route.ts` to add type and length validation for the `message` and `tone` variables, returning a 400 Bad Request if validation fails.
2. Create a new test file `tests/api-instant-responder-demo.spec.ts` and write tests using `NextRequest` to verify that requests with invalid, missing, or overly long `message` and `tone` payloads return a 400 Bad Request status.
3. Check test file by reading it to verify changes.
4. Run `npm install`, followed by `npm run build` and `npx playwright test` to ensure nothing is broken.
5. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
6. Submit the change with a PR description meeting the security requirements.
