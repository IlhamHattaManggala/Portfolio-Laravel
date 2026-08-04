
import { useEffect } from "react";

interface BlogViewCounterProps {
  slug: string;
}

export default function BlogViewCounter({ slug }: BlogViewCounterProps) {
  useEffect(() => {
    const incrementView = async () => {
      try {
        await fetch(`/api/blogs/${slug}/view`, {
          method: "POST",
        });
      } catch (error) {
        console.error("Failed to increment view:", error);
      }
    };

    incrementView();
  }, [slug]);

  return null; // This component doesn't render anything
}
