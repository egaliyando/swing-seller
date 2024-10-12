'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithCredential,
  signInWithPhoneNumber,
} from 'firebase/auth';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Grid,
  Card,
  List,
  Stack,
  ListItem,
  Typography,
  IconButton,
  CardContent,
  ListItemIcon,
  ListItemText,
  InputAdornment,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import axios from 'src/utils/axios';
import { auth } from 'src/utils/firebase';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';
import { signInWithPassword } from 'src/auth/context/jwt';

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  code: zod.string().min(1, { message: 'Code is required!' }),
  phone: zod.string().min(1, { message: 'Phone is required!' }),
  pin: zod.string().length(6, { message: 'PIN must be 6 digits!' }),
});

export function JwtSignInView() {
  const router = useRouter();
  const { checkUserSession } = useAuthContext();
  const [isPhoneForm, setIsPhoneForm] = useState(true);
  const [isVerificationForm, setIsVerificationForm] = useState(false);
  const [phoneCodes, setPhoneCodes] = useState<{ value: string; label: string }[]>([]);
  const [pinVisible, setPinVisible] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);

  const defaultValues = {
    code: '+62',
    phone: '5252525252',
    pin: '525252',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  useEffect(() => {
    const getPhoneCode = async () => {
      try {
        const res = await axios.get(`/v1/public/region/countries`);
        const countryData = res.data.data.map((country: any) => ({
          value: country.dial_code,
          label: `${country.code} (${country.dial_code})`,
        }));
        setPhoneCodes(countryData);
      } catch (error) {
        console.error('Error fetching phone codes:', error);
      }
    };
    getPhoneCode();
  }, []);

  const handleSendOtp = async () => {
    let recaptchaVerifier: any;

    try {
      recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
      const phoneNumber = `${methods.getValues('code')}${methods.getValues('phone')}`;

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      console.log('OTP sent, confirmation result:', confirmationResult);
      setVerificationId(confirmationResult.verificationId);
      setIsVerificationForm(false);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    if (isPhoneForm) {
      setIsPhoneForm(false);
      setIsVerificationForm(true);
    } else {
      if (!verificationId) return;

      try {
        const credential = PhoneAuthProvider.credential(verificationId, data.pin);
        const userCredential = await signInWithCredential(auth, credential);
        console.log('User signed in:', userCredential.user);
        const session_token = await (await userCredential.user.getIdTokenResult()).token;
        await signInWithPassword({
          provider: 'SMS',
          phone_number: data.phone,
          session_token,
        });
        await checkUserSession?.();
        router.refresh();
      } catch (error) {
        console.error('Error verifying OTP:', error);
      }
    }
  });

  const handleMethodSelect = async (method: string) => {
    console.log(`Selected method: ${method}`);
    await handleSendOtp();
  };

  return (
    <>
      <Stack spacing={1.5} sx={{ mb: 5 }}>
        <Typography variant="h5">Log in to Swing for seller</Typography>
      </Stack>
      <Form methods={methods} onSubmit={onSubmit}>
        {isPhoneForm && !isVerificationForm && (
          <Stack spacing={3}>
            <Typography>Phone number</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Field.Autocomplete options={phoneCodes} name="code" label="Country Code" />
              </Grid>
              <Grid item xs={8}>
                <Field.Text name="phone" InputLabelProps={{ shrink: true }} />
              </Grid>
            </Grid>

            <LoadingButton
              fullWidth
              color="inherit"
              type="submit"
              variant="contained"
              loading={methods.formState.isSubmitting}
              loadingIndicator="Continue..."
            >
              Continue
            </LoadingButton>
          </Stack>
        )}

        {isVerificationForm && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
            <Card sx={{ maxWidth: 400, width: '100%', p: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div" align="center" sx={{ mb: 2 }}>
                  Select verification method
                </Typography>

                <List>
                  <ListItem button onClick={() => handleMethodSelect('SMS')} id="send-code-button">
                    <ListItemIcon>
                      <Iconify icon="mdi:message-text" />
                    </ListItemIcon>
                    <ListItemText primary="SMS" secondary="Standard message and data rates apply" />
                    <IconButton edge="end">
                      <Iconify icon="mdi:arrow-right" />
                    </IconButton>
                  </ListItem>

                  <ListItem button onClick={() => handleMethodSelect('WhatsApp')}>
                    <ListItemIcon>
                      <Iconify icon="mdi:whatsapp" />
                    </ListItemIcon>
                    <ListItemText primary="WhatsApp" />
                    <IconButton edge="end">
                      <Iconify icon="mdi:arrow-right" />
                    </IconButton>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        )}

        {!isPhoneForm && !isVerificationForm && (
          <Stack spacing={3}>
            <Typography>Enter 6-digit PIN</Typography>
            <Field.Text
              name="pin"
              label="PIN"
              placeholder="6 digits"
              type={pinVisible ? 'text' : 'password'}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setPinVisible(!pinVisible)} edge="end">
                      <Iconify icon={pinVisible ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              fullWidth
              color="inherit"
              type="submit"
              variant="contained"
              loading={methods.formState.isSubmitting}
              loadingIndicator="Verify..."
            >
              Verify
            </LoadingButton>
          </Stack>
        )}
      </Form>
      <div id="recaptcha-container" /> {/* Recaptcha container */}
    </>
  );
}
