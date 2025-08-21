const minSecretLength: number = 5;
export function validateSecret(secret: string | undefined) {
  const typedSecret: string = validateType(secret);
  validateLength(typedSecret);
  return typedSecret;
}
function validateType(secret: string | undefined): string {
  if (!secret) {
    throw new Error("Secret: not properly set up");
  }
  return secret;
}
function validateLength(secret: string) {
  if (secret && secret.length < minSecretLength) {
    throw new Error(`Secret: incorrect length (min length:
${minSecretLength})`);
  }
}
