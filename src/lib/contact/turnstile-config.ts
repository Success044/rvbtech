type TurnstileEnvironment = {
  NODE_ENV?: string;
  NEXT_PUBLIC_TURNSTILE_SITE_KEY?: string;
  NEXT_PUBLIC_TURNSTILE_TEST_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_TEST_SECRET_KEY?: string;
};

function isDevelopment(env: TurnstileEnvironment): boolean {
  return env.NODE_ENV === "development";
}

export function getTurnstileSiteKey(
  env: TurnstileEnvironment,
): string | undefined {
  return isDevelopment(env)
    ? env.NEXT_PUBLIC_TURNSTILE_TEST_SITE_KEY
    : env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
}

export function getTurnstileSecretKey(
  env: TurnstileEnvironment,
): string | undefined {
  return isDevelopment(env)
    ? env.TURNSTILE_TEST_SECRET_KEY
    : env.TURNSTILE_SECRET_KEY;
}
