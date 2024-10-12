import type { ConfirmationResult } from 'firebase/auth';

// Define the return type for the verifyOTP function
type VerifyOTPResult = { success: boolean; user?: any; error?: string };

export const verifyOTP = async (
  otpCode: string,
  confirmationResult: ConfirmationResult
): Promise<VerifyOTPResult> => {
  try {
    const result = await confirmationResult.confirm(otpCode);
    console.log('Phone number verified:', result.user);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return { success: false, error: (error as Error).message };
  }
};
