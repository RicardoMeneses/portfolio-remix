import {
  Avatar,
  AvatarBadge,
  Box,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Skeleton,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { AiFillMessage } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';

const DEFAULT_CONVERSATION = [
  {
    id: '1',
    type: 'bot',
    text: 'Hola, soy RicardoBot y estoy hecho con ChatGPT, un placer hablar contigo 👋',
  },
  {
    id: '2',
    type: 'bot',
    text: 'Puedes hacerme cualquier pregunta sobre mi para conocerme.',
  },
];

const Chat = () => {
  const [messages, setMessages] = useState(DEFAULT_CONVERSATION);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const container = useRef<HTMLDivElement>(null);
  const bgColor = useColorModeValue('#051139', '#fff');
  const color = useColorModeValue('#fff', '#051139');
  const bgColorMessage = useColorModeValue('#fff', '#051139');
  const colorMessage = useColorModeValue('#051139', '#fff');

  useEffect(() => {
    const div = container.current;
    if (div) {
      div.scrollTo(0, div.scrollHeight);
    }
  }, [messages]);
  return (
    <Box position='fixed' bottom={10} right={10}>
      <IconButton
        aria-label='ChatGpt'
        bg={bgColor}
        color={color}
        colorScheme='white'
        onClick={onOpen}
        icon={<AiFillMessage />}
      />

      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent
          position='absolute'
          bottom={10}
          right={{ base: 0, md: 10 }}
          bg={bgColor}
          textColor={color}
        >
          <ModalHeader display='flex' alignItems='center' gap={3}>
            <Avatar name='Ricardo Meneses Morales' src='/img/me.webp'>
              <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
            <Box>
              <Text fontSize='14px'>Ricardo Meneses Morales</Text>
              <Text fontSize='2xs'>En línea</Text>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            maxH={400}
            overflow='scroll'
            borderBottom='1px solid'
            borderTop='1px solid'
            ref={container}
          >
            {messages.map((message) => (
              <Box
                mt={2}
                key={message.id}
                bg={message.type === 'user' ? '#58e32a' : bgColorMessage}
                textColor={colorMessage}
                w='48'
                p={2}
                borderRightRadius={10}
                borderTopLeftRadius={10}
                marginLeft={message.type === 'user' ? 'auto' : 0}
              >
                <Text fontSize='14px'>{message.text}</Text>
              </Box>
            ))}
            {loading && (
              <Skeleton
                isLoaded={false}
                mt={2}
                bg={bgColorMessage}
                textColor={colorMessage}
                w='48'
                height={20}
                p={2}
                borderRightRadius={10}
                borderTopLeftRadius={10}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Form
              style={{ width: '100%' }}
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const message = formData.get('prompt') as string;

                setMessages((messages) =>
                  messages.concat({
                    id: String(Date.now()),
                    type: 'user',
                    text: message,
                  })
                );
                setLoading(true);

                // limpiar el input
                const input = document.getElementById('prompt') as HTMLInputElement;
                input.value = '';

                const res = await fetch('/api/chat', {
                  method: 'post',
                  body: formData,
                });
                const data = await res.json();
                setLoading(false);

                setMessages((messages) => messages.concat(data));
              }}
            >
              <InputGroup>
                <Input
                  border='1px solid'
                  _placeholder={{ color: 'gray.500' }}
                  id='prompt'
                  name='prompt'
                  placeholder='Escribe tu mensaje'
                  required
                />
                <InputRightElement children={<FiSend />} />
              </InputGroup>
            </Form>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Chat;
