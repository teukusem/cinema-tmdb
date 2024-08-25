import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

interface ModalAuthProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function ModalAuth({ isOpen, onOpenChange }: ModalAuthProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent className="text-black">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
            <ModalBody>
              <Input isRequired type="email" label="Email" className="max-w" />

              <Input
                isRequired
                type="password"
                label="Password"
                className="max-w"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Login
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
