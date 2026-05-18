// Initialize programmatic flow by writing to standard output
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Configure the stream to interpret buffers as UTF-8 strings
process.stdin.setEncoding('utf-8');

// Event listener for incoming chunks of data
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`Your name is: ${chunk}`);
  }
});

// Event listener triggered when the stream ends (e.g., via Ctrl+D or UNIX Pipe)
process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
