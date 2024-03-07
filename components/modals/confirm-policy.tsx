"use client";

import z from "zod";
import { useModal } from "@/utils/hooks/useModalStore";
import {
  Button,
  Input,
  Text,
  TextInput,
  Modal,
  NativeSelect,
  NumberInput,
  Loader,
} from "@mantine/core";

import classes from "./confirmPolicy.module.css";
import { Controller, useForm } from "react-hook-form";
import { DateInput, DateInputProps, DatePicker } from "@mantine/dates";
import { handlePolicyRequest } from "@/api/policy";
import { useRouter } from "next/navigation";

enum DESTINATION {
  EUR = "EUR",
  WORLD = "WORLD",
  PL = "PL",
}

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "Sever name is required",
  }),
  lastName: z.string().min(1, {
    message: "Image URL is required",
  }),
  country: z.enum([DESTINATION.EUR, DESTINATION.PL, DESTINATION.WORLD]),
});

const ConfirmPolicuModal = () => {
  const { data, isOpen, onClose, type, onOpen } = useModal();

  const isModalOpen = isOpen && type === "ConfirmPolicy";

  const { offerNumber } = data;

  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    const { firstName, lastName, taxId, country, zipCode, city, street } = data;

    const formatData = {
      offerNumber: offerNumber,
      policyHolder: { firstName, lastName, taxId },
      policyHolderAddress: { country, zipCode, city, street },
    };
    try {
      const res = await handlePolicyRequest.postPolicy(formatData);
 
      handleClose();
      router.push("/policy");
    } catch (error) {
      console.log(error);
    }
  };
  const isLoading = isSubmitting;

  const handleClose = () => {
    reset();
    onClose();
  };
  return (
    <Modal.Root
      opened={isModalOpen}
      onClose={handleClose}
      centered
      className={classes.modal}
      size={600}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header className={classes.header}>
          <Modal.Title className={classes.title}>CONFIRM</Modal.Title>

          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body className={classes.body}>
          <Text className={classes.description}>description</Text>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4 px-6">
              <div className="flex items-center justify-center text-center"></div>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="First Name"
                    placeholder="Select First Name"
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput {...field} label="Last Name" />
                )}
              />
              <Controller
                name="taxId"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextInput {...field} label="Tax ID" />}
              />

              <Controller
                name="country"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <NativeSelect
                    {...field}
                    label="Country"
                    data={[
                      { label: "WORLD", value: "WORLD" },
                      { label: "EURO", value: "EUR" },
                      { label: "POLAN", value: "PL" },
                    ]}
                  />
                )}
              />
              <Controller
                name="zipCode"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Zip code"
                    placeholder="Select First Name"
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="City"
                    placeholder="Select First Name"
                  />
                )}
              />

              <Controller
                name="street"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Street"
                    placeholder="Select First Name"
                  />
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="mr-6">
                Confirm
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ConfirmPolicuModal;
