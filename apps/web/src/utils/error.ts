export const errorMessage = (err: any) => {
  const message = err instanceof Error ? err.message : 'Something went wrong!';
  console.error(err);
  return message;
};
