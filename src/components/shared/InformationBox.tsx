import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

type informationBoxProps = {
  children: React.ReactNode;
  classname?: string;
};

const InformationBox: React.FC<informationBoxProps> = ({
  children,
  classname,
}) => {
  return (
    <Card
      className={cn("border-yellow-500 shadow-yellow-500 shadow-md", classname)}
    >
      <CardHeader className="flex flex-col items-end space-y-0">
        <AlertCircle color="#FFA500" />
      </CardHeader>
      <CardContent>
        <p className="flex flex-col items-end">{children}</p>
      </CardContent>
    </Card>
  );
};

export default InformationBox;
