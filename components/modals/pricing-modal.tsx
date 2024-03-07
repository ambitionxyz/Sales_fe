"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useState } from "react";
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
import { useModal } from "@/utils/hooks/useModalStore";
import { useRouter } from "next/navigation";

import classes from "./pricingModal.module.css";
import { DateInput, DateInputProps, DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { formatDate } from "@/utils/functions/partDay";
import { handlePolicyRequest } from "@/api/policy";
import { useQuery } from "@tanstack/react-query";

type FormData = {
  from: Date;
  to: Date;
  destination: DESTINATION;
  adults: number;
  children: number;
};

enum DESTINATION {
  EUR = "EUR",
  WORLD = "WORLD",
  PL = "PL",
}

const formSchema: z.ZodType<FormData> = z
  .object({
    from: z.date().min(new Date()),
    to: z.date().min(new Date()),
    destination: z.enum([DESTINATION.EUR, DESTINATION.PL, DESTINATION.WORLD]),
    adults: z.number().min(1),
    children: z.number().min(1),
  })
  .refine((data) => data.to > data.from, {
    message: "Ngày kết thúc phải lớn hơn ngày bắt đầu",
  });

const PricingModal = () => {
  const [offer, setOffer] = useState<any>();

  const { data, isOpen, onClose, type, onOpen } = useModal();

  const isModalOpen = isOpen && type === "PricingModal";

  const { code, name, image, covers, description } = data;

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
    const { from, to, destination, adults = 0, chidlrens = 0 } = data;
    const questions = [];
    if (destination)
      questions.push({
        questionCode: "DESTINATION",
        questionType: "Choice",
        answer: destination,
      });
    if (adults)
      questions.push({
        questionCode: "NUM_OF_ADULTS",
        questionType: "Numeric",
        answer: adults,
      });

    if (chidlrens)
      questions.push({
        questionCode: "NUM_OF_CHILDREN",
        questionType: "Numeric",
        answer: chidlrens,
      });

    const formatData = {
      productCode: code,
      policyFrom: formatDate(from),
      policyTo: formatDate(to),
      selectedCovers: covers.map((c: any) => c.code),
      answers: questions,
    };
    try {
      const res = await handlePolicyRequest.postOffer(formatData, {
        AgentLogin: "",
      });

      if (res) {
        setOffer(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onBuy = () => {
    handleClose();
    onOpen("ConfirmPolicy", offer);
  };

  const isLoading = isSubmitting;
  const handleClose = () => {
    reset();
    onClose();
  };

  const dateParser: DateInputProps["dateParser"] = (input) => {
    return dayjs(input, "DD/MM/YYYY").toDate();
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
          <Modal.Title className={classes.title}>{name}</Modal.Title>

          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body className={classes.body}>
          <Text className={classes.description}>{description}</Text>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4 px-6">
              <div className="flex items-center justify-center text-center">
                <img src={image} className="w-full h-[370px]" />
              </div>

              <Controller
                name="from"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DateInput
                    {...field}
                    valueFormat="YYYY-MM-DD"
                    label="Policy from"
                    placeholder="Select Policy from"
                    // error={
                    //   errors.dateOfBirth ? errors.dateOfBirth.message : null
                    // }
                  />
                )}
              />

              <Controller
                name="to"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DateInput
                    {...field}
                    dateParser={dateParser}
                    valueFormat="YYYY-MM-DD"
                    label="Policy to"
                    placeholder="Select Policy to"
                    // error={
                    //   errors.dateOfBirth ? errors.dateOfBirth.message : null
                    // }
                  />
                )}
              />

              <Controller
                name="destination"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <NativeSelect
                    {...field}
                    label="Policy to"
                    data={[
                      { label: "WORLD", value: "WORLD" },
                      { label: "EURO", value: "EUR" },
                      { label: "POLAN", value: "PL" },
                    ]}
                    // error={
                    //   errors.dateOfBirth ? errors.dateOfBirth.message : null
                    // }
                  />
                )}
              />

              <Controller
                name="adults"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    defaultValue={0}
                    label="Number of adults"
                    min={0}
                    max={100}
                  />
                )}
              />

              <Controller
                name="chidlrens"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    defaultValue={0}
                    label="Number of chidlrens"
                    min={0}
                    max={100}
                  />
                )}
              />
            </div>
            <div className="flex justify-between">
              {isLoading && !offer && <Loader color="blue" className="ml-6" />}
              <Input
                className="ml-6"
                disabled
                value={offer?.totalPrice}
                placeholder="NOT PRICE"
              />
              <div>
                <Button disabled={isLoading} color="gray" className="mr-6">
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  color={offer ? "gray" : "blue"}
                  className="mr-6"
                >
                  Pricing
                </Button>
                {offer && (
                  <Button className="mr-6" onClick={onBuy}>
                    Buy
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default PricingModal;
