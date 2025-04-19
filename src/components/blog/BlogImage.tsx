
import { useViewport } from "@/hooks/use-viewport";

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
}

const BlogImage = ({ src, alt, caption }: BlogImageProps) => {
  const { isMobile } = useViewport();
  
  return (
    <figure className="my-8">
      <div className="rounded-lg overflow-hidden shadow-md">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default BlogImage;
