"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import { Login as SigninValidation } from "@/lib/validation";
// import { useSignInAccount } from '@/lib/react-query/queries';
// import { useUserContext } from '@/context/AuthContext';

const SigninForm = () => {
	const { toast } = useToast();
	const router = useRouter();
	// const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

	// Query
	// const { mutateAsync: signInAccount, isPending } = useSignInAccount();

	const form = useForm<z.infer<typeof SigninValidation>>({
		resolver: zodResolver(SigninValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
		// const session = await signInAccount(user);
		// if (!session) {
		//   toast({ title: 'Login failed. Please try again.' });
		//   return;
		// }
		// const isLoggedIn = await checkAuthUser();
		// if (isLoggedIn) {
		//   form.reset();
		//   navigate('/');
		// } else {
		//   toast({ title: 'Login failed. Please try again.' });
		//   return;
		// }
	};

	return (
		<Form {...form}>
			<div className="sm:w-420 w-[500px] flex-center flex-col items-start">
				{/* <div className='flex flex-row justify-start'>
          <img src="/assets/images/logo.svg" alt="logo" />
          {/* <h1>Tine</h1>
        </div> */}

				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 flex flex-col items-end">
					ورود به حساب کاربری
				</h2>
				<p className="text-light-3 small-medium md:base-regular mt-2 flex flex-col items-end">
					خوش آمدید! لطفا مشخصات خود را وارد کنید
				</p>
				<form
					onSubmit={form.handleSubmit(handleSignin)}
					className="flex flex-col gap-5 w-full mt-4"
				>
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

					<Button type="submit" className="shad-button_primary">
						{/* {isPending || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : ( */}
						<span>ورود</span>
						{/* )} */}
					</Button>

					<p className="text-small-regular text-light-2 text-center mt-2">
						حساب کاربری ندارید؟{" "}
						<Link
							href="/sign-up"
							className="text-primary-500 text-small-semibold ml-1 text-sky-700"
						>
							ثبت نام کنید
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SigninForm;
