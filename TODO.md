# TODO: Debug and Fix 500 Error on Upload Endpoint

- [x] Edit src/app/api/upload/route.ts to add detailed logging for error capture and env var checks
- [x] Restart the development server if necessary (currently running on port 3002)
- [x] Test the POST endpoint using curl to reproduce the 500 error and observe logs
- [x] Analyze console logs for specific error details (e.g., Cloudinary config issues, file processing errors)
- [x] Fix identified issues (e.g., ensure Cloudinary env vars are set, handle file type/size limits) - Fixed by changing base64 to dataURI format for Cloudinary upload
- [x] Retest the endpoint to confirm the fix - Tested with text file and SVG file, both successful
