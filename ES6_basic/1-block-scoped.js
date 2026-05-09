export default function taskBlock(trueOrFalse) {
  const task = false;
  const job = true;

  if (trueOrFalse) {
    const task = true;
    const job = false;
  }

  return [task, job];
}
