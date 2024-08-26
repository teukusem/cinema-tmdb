import { setActionModalAuth, setSessionUserId } from "@/redux/action/session";
import {
  createSession,
  requestToken,
  validateToken,
} from "@/utils/api/services/home";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface ModalAuthProps {
  isOpen: boolean;
  onOpenChange?: () => void;
}

export default function ModalAuth({ isOpen, onOpenChange }: ModalAuthProps) {
  const dispatch = useDispatch();
  const { tokenUser } = useSelector((state: any) => state.userAuth);

  const [fieldForms, setFieldForm] = useState({
    username: "",
    password: "",
  });

  const handleRequestToken = async () => {
    try {
      await requestToken();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    dispatch(setActionModalAuth(false));
  };

  const handleSubmitData = async () => {
    try {
      const payload = {
        username: fieldForms.username,
        password: fieldForms.password,
        request_token: tokenUser,
      };

      const isValidToken = await validateToken(payload);
      const isSessionCreated = await createSession({
        request_token: isValidToken?.request_token,
      });
      if (isSessionCreated?.success) {
        dispatch(setSessionUserId(isSessionCreated?.session_id));
        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent className="text-black">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
            <ModalBody>
              {tokenUser ? (
                <>
                  <Input
                    isRequired
                    type="email"
                    label="Email"
                    className="max-w"
                    onChange={(e) => {
                      const { value } = e.target;
                      setFieldForm((valuePrev) => ({
                        ...valuePrev,
                        username: value,
                      }));
                    }}
                  />

                  <Input
                    isRequired
                    type="password"
                    label="Password"
                    className="max-w"
                    onChange={(e) => {
                      const { value } = e.target;
                      setFieldForm((valuePrev) => ({
                        ...valuePrev,
                        password: value,
                      }));
                    }}
                  />
                </>
              ) : (
                <Button color="primary" onPress={handleRequestToken}>
                  Request Token Authentication
                </Button>
              )}
            </ModalBody>
            <ModalFooter>
              {tokenUser && (
                <>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={handleCloseModal}
                  >
                    Close
                  </Button>
                  <Button color="primary" onPress={handleSubmitData}>
                    Login
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
