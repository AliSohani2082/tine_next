"use client";

import { Button } from "@/components/ui/button";
import React from "react";

type RedirectLinkProps = {
	link: string;
	children?: React.ReactNode;
};

const RedirectLink: React.FC<RedirectLinkProps> = ({ link, children }) => {
	const handleClick = async () => {
		try {
      const response = await fetch(link);
      if (!response.ok) {
        throw new Error(`Failed to fetch HTML file: ${response.statusText}`);
      }
      const textContent = await response.text();
      const url = window.URL.createObjectURL(new Blob([textContent]));
      window.open(link, '_blank');
    } catch (error) {
      console.error('Error opening HTML file:', error);
    }
  };
	return (
		<Button variant="outline" onClick={handleClick}>
			{children}
		</Button>
	);
};

export default RedirectLink;
