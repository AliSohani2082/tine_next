"use client";

import React from "react";

type BackgroundProps = {
	children: React.ReactNode;
};

const Background: React.FC<BackgroundProps> = ({ children }) => {
	return (
		<div>
			<div className="fixed top-[-100px] left-[-100px] rounded-full bg-blue-400 z-0 w-[600px] h-[600px] blur-3xl opacity-40"></div>
			{children}
		</div>
	);
};

export default Background;
