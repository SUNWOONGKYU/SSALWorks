"use client";

import { useUI } from "@/context/UIContext";
import ServiceIntroModal from "@/components/features/ServiceIntroModal";

export default function ModalContainer() {
    const { isServiceIntroOpen, closeServiceIntro } = useUI();

    return (
        <>
            <ServiceIntroModal isOpen={isServiceIntroOpen} onClose={closeServiceIntro} />
        </>
    );
}
