import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

interface AuthPageProps {
	children: React.ReactNode;
}

const AuthLayout: React.FC<AuthPageProps> = ({ children }) => {
	// const currentUser = useCurrentUser()
	// const router = useRouter()
	// if (currentUser) router.push("/")

	return (
		<div className="flex flex-row justify-stretch items-stretch">
			<Image
				width={1000}
				height={1000}
				src="/assets/images/authWallpaper.jpg"
				alt="logo"
				className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
			/>
			<section className="flex flex-1 justify-center items-center flex-col py-4">
				{children}
			</section>
		</div>
	);
};

export default AuthLayout;
