"use client";

import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { CreateDatabase as createDatabaseValidation } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import StepperComponent from "./Stepper";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import InformationBox from "@/components/shared/InformationBox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { InformationForm } from "@/components/modals/database-modal";

export const InformationForm = forwardRef(
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
      <div className=" flex flex-col space-y-4">
        <InformationBox> توضیحات مربوط به این بخش... </InformationBox>
        <div>
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
      </div>
    );
  }
);

InformationForm.displayName = "InformationForm";

type Props = {};

const DummyComponent = () => {
  return <div>placeholder</div>;
};

const DatabaseForm = (props: Props) => {
  const formRef = useRef<{ submitForm: () => void } | null>(null);

  const onSubmit = async (values: z.infer<typeof createDatabaseValidation>) => {
    console.log(values);
  };

  return (
    <StepperComponent
      steps={[
        {
          stepNum: 0,
          title: "مشخصات اولیه",
          description: "description...",
          isOptional: false,
          content: <InformationForm ref={formRef} onSubmit={onSubmit} />,
          onSubmit: () => {
            const result = formRef.current?.submitForm();
            console.log("result: ", result);
          },
          isNextActivated: true,
        },
        {
          stepNum: 1,
          title: "سرچ مقالات",
          description: "idk...",
          isOptional: false,
          content: <DummyComponent />,
          onSubmit: () => {
            console.log("step2");
          },
          isNextActivated: true,
          additionalActions: [
            {
              title: "اسکن",
              action: () => {
                console.log("action triggeredd");
              },
              isActivate: true,
            },
          ],
        },
        {
          stepNum: 2,
          title: "تایید نهایی",
          description: "idk...2",
          isOptional: false,
          content: <DummyComponent />,
          onSubmit: () => {
            console.log("step3");
          },
          isNextActivated: true,
        },
      ]}
    />
  );
};

export default DatabaseForm;
