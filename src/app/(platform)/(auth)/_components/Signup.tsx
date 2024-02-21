'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '@/components/shared/Loader'
import { useToast } from '@/components/ui/use-toast'

// import {
//   useCreateUserAccount,
//   useSignInAccount,
// } from '@/lib/react-query/queries';
import { Signup as SignupValidation } from '@/lib/validation'
// import { useUserContext } from '@/context/AuthContext';

const SignupForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  // const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })

  // Queries
  // const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
  //   useCreateUserAccount();
  // const { mutateAsync: signInAccount, isPending: isSigningInUser } =
  //   useSignInAccount();

  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    // try {
    //   const newUser = await createUserAccount(user);
    //   if (!newUser) {
    //     toast({ title: 'Sign up failed. Please try again.' });
    //     return;
    //   }
    //   const session = await signInAccount({
    //     email: user.email,
    //     password: user.password,
    //   });
    //   if (!session) {
    //     toast({ title: 'Something went wrong. Please login your new account' });
    //     navigate('/sign-in');
    //     return;
    //   }
    //   const isLoggedIn = await checkAuthUser();
    //   if (isLoggedIn) {
    //     form.reset();
    //     navigate('/');
    //   } else {
    //     toast({ title: 'Login failed. Please try again.' });
    //     return;
    //   }
    // } catch (error) {
    //   console.log({ error });
    // }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 w-[500px] flex-center flex-col items-end">
        {/* <div>
          <img src="/assets/images/logo.svg" alt="logo" />
          {/* <h1>Tine</h1>
        </div> */}

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 flex flex-col items-end">
          ساخت اکانت
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2 flex flex-col items-end">
          لطفا مشخصات خود را وارد کنید
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col items-end">
                <FormLabel className="shad-form_label">نام</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col items-end">
                <FormLabel className="shad-form_label">نام کاربری</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col items-end">
                <FormLabel className="shad-form_label">ایمیل</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col items-end">
                <FormLabel className="shad-form_label">رمز عبور</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem className="flex flex-col items-end">
                <FormLabel className="shad-form_label">
                  تایید رمز عبور
                </FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            ثبت نام
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            حساب کاربری دارید؟{' '}
            <Link
              href="/sign-in"
              className="text-primary-500 text-small-semibold ml-1 text-sky-700"
            >
              ورود
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm
