import signUpUser from './4-user-promise.js';
import uploadPhoto from './5-photo-reject.js';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const uploadPhotoPromise = uploadPhoto(fileName);
  const signUpUserPromise = signUpUser(firstName, lastName);

  return Promise.allSettled([signUpUserPromise, uploadPhotoPromise]).then(
    (results) =>
      results.map((result) => {
        if (result.status === 'fulfilled') {
          return { status: 'fulfilled', value: result.value };
        }

        // Tests expect the rejected value as a string like "Error: <message>"
        return { status: 'rejected', value: result.reason.toString() };
      }),
  );
}
