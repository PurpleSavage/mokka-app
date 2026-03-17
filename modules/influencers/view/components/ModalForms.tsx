"use client";

import ModalLookDataWrapper, { ModalsId } from "@/modules/shared/common/view/wrappers/ModalLookDataWrapper";
import { RootState } from "@/store/boundStore";
import GenerateSceneForm from "./GenerateSceneForm";
import GenerateSnapshotForm from "./GenerateSnapshotForm";
import { useSelector } from "react-redux";
import CreateInfluencerForm from "./CreateInfluencerForm";

export default function ModalForms() {
  const { formType } = useSelector(
    (state: RootState) => state.modals.modalWrapper,
  );
  return (
    <ModalLookDataWrapper size="max-w-[60%]" modalId={ModalsId.INFLUENCER_FORM}>
      {formType === "SCENE" && <GenerateSceneForm key="form-scene" />}
      {formType === "SNAPSHOT" && <GenerateSnapshotForm key="form-snap" />}
      {formType === "INFLUENCER" && <CreateInfluencerForm />}
    </ModalLookDataWrapper>
  );
}
