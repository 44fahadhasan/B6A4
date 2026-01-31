import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const PageContentHeader = ({
  title,
  content,
  children,
}: {
  title: string;
  content: string;
  children?: React.ReactNode;
}) => {
  return (
    <Card className="px-3 md:px-5 lg:px-7">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{content}</CardDescription>
      </CardHeader>
      <CardFooter>{children && children}</CardFooter>
    </Card>
  );
};

export default PageContentHeader;
