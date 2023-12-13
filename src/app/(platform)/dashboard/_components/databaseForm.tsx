"use client";

import React, { useRef } from "react";
import { CreateDatabase as createDatabaseValidation } from "@/lib/validation";
import * as z from "zod";

import StepperComponent from "./Stepper";
import { InformationForm } from "@/components/modals/database-modal";

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
