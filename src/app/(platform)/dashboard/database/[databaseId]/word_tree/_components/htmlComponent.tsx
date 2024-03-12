"use client";
import { useEffect } from "react";

type htmlCompProps = {
	html: any;
};

const HtmlComp: React.FC<htmlCompProps> = ({ html }) => {
	useEffect(() => {
    // Check if the page has been refreshed before
    const isFirstVisit = localStorage.getItem('isFirstVisit');

    if (!isFirstVisit) {
      // If it's the first visit, refresh the page
      window.location.reload();

      // Set the flag in localStorage to indicate that the page has been refreshed
      localStorage.setItem('isFirstVisit', 'true');
    }
  }, []); // Empty dependency array ensures the effect runs only once on component mount

	
	return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default HtmlComp;
