"use client";

import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import { CreateDatabase as createDatabaseValidation } from "@/lib/validation";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useDatabaseModal } from "@/hooks/use-database-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import InformationBox from "../shared/InformationBox";
import StepModal from "../shared/StepperModal";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];
// import { useCreateDatabase } from '@/lib/react-query/queries';
// import console from 'console'

// (values: z.infer<typeof createDatabaseValidation>) => void
// React.Ref<{ submitForm: () => void }>

const InformationForm = forwardRef(
  (
    {
      onSubmit,
    }: { onSubmit: (values: z.infer<typeof createDatabaseValidation>) => void },
    ref: React.Ref<{ submitForm: () => void }>
  ) => {
    const form = useForm<z.infer<typeof createDatabaseValidation>>({
      resolver: zodResolver(createDatabaseValidation),
      defaultValues: {
        name: "",
      },
    });

    useImperativeHandle(ref, () => ({
      submitForm: () => form.handleSubmit(onSubmit)(),
    }));

    return (
      <div className="w-full space-y-4 py-2 pb-4">
        <InformationBox> توضیحات مربوط به این بخش... </InformationBox>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-stretch justify-start gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col items-end">
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={loading}
                      placeholder="Database"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="flex flex-col items-end">
                  <FormLabel>کوئری</FormLabel>
                  <FormControl>
                    <Textarea
                      // disabled={loading}
                      placeholder="Database"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  }
);

InformationForm.displayName = "InformationForm";

const DummyComponent = () => {
  return <div>placeholder</div>;
};

const DatabaseModal = () => {
  const databaseModal = useDatabaseModal();
  const formRef = useRef<{ submitForm: () => void } | null>(null);

  const onSubmit = async (values: z.infer<typeof createDatabaseValidation>) => {
    console.log(values);
    // const updatedDatabase = await createDatabase(values);

    // if(!isSuccess) {
    //   toast({ title: 'Something went wrong.', variant: 'destructive' });
    // }
    // if (isSuccess) {
    //   window.location.assign('/');
    // } else {
    // }
    // setLoading(false);
  };

  // const [loading, setLoading] = useState(false);
  // const { mutate: createDatabase, isSuccess, isPending } = useCreateDatabase();
  return (
    <StepModal
      isOpen={databaseModal.isOpen}
      onClose={databaseModal.onClose}
      steps={[
        {
          stepNum: 0,
          title: "مشخصات اولیه",
          description: "description...",
          isOptional: false,
          content: <InformationForm ref={formRef} onSubmit={onSubmit} />,
          onSubmit: () => formRef.current?.submitForm(),
        },
        {
          stepNum: 1,
          title: "سرچ مقالات",
          description: "idk...",
          isOptional: false,
          content: <DummyComponent />,
          onSubmit: () => {console.log("step2")},
        },
        {
          stepNum: 2,
          title: "تایید نهایی",
          description: "idk...2",
          isOptional: false,
          content: <DummyComponent />,
          onSubmit: () => {console.log("step3")},
        },
      ]}
    />
  );
};

export default DatabaseModal;
