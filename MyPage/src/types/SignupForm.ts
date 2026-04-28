export interface SignupForm {
  email: string;      // Step 1
  password: string;   // Step 2
  passwordConfirm: string; // Step 2 (유효성 검사용)
  name: string;       // Step 3
}