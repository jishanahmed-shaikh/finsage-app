
interface BlogSectionHeaderProps {
  title: string;
  subtitle?: string;
}

const BlogSectionHeader = ({ title, subtitle }: BlogSectionHeaderProps) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      )}
      <div className="h-1 w-20 bg-primary-500 mt-3"></div>
    </div>
  );
};

export default BlogSectionHeader;
