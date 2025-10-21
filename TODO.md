# TODO: Implement Admin Redirect on Sign In

## Steps to Complete

- [x] Import `getSession` from 'next-auth/react' in `src/app/(pages)/signin/page.tsx`
- [x] Modify the `handleSubmit` function to retrieve the session after successful sign in
- [x] Add role-based redirection logic: redirect admins to '/admin/dashboard', others to '/'
- [ ] Test the changes by signing in as an admin and verifying redirection
- [ ] Test the changes by signing in as a non-admin and verifying redirection to home page
