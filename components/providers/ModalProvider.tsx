import ConfirmPolicuModal from "../modals/confirm-policy";
import PricingModal from "../modals/pricing-modal";

export const ModalProvider = () => {
  return (
    <>
      <PricingModal />
      <ConfirmPolicuModal />
    </>
  );
};
