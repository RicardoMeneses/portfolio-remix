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
  Skeleton,
  Flex,
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
    hour: new Date().getHours() + ':' + new Date().getMinutes(),
  },
  {
    id: '2',
    type: 'bot',
    text: 'Puedes hacerme cualquier pregunta sobre mi para conocerme.',
    hour: new Date().getHours() + ':' + new Date().getMinutes(),
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
              <Text fontSize='14px'>RicardoBot</Text>
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
            <Text
              margin='0 auto'
              bg='gray.500'
              w='fit-content'
              color='gray.900'
              p='2px 8px'
              borderRadius='full'
            >
              Hoy
            </Text>
            {messages.map((message) => (
              <Box key={message.id}>
                <Flex gap={3} justifyContent={message.type === 'user' ? 'flex-end' : 'flex-start'}>
                  <Avatar
                    src={message.type === 'user' ? '' : '/img/me.webp'}
                    order={message.type === 'user' ? 2 : 0}
                  />
                  <Box>
                    <Box
                      mt={4}
                      bg={message.type === 'user' ? '#58e32a' : bgColorMessage}
                      textColor={colorMessage}
                      w='48'
                      p={2}
                      borderTopRightRadius={message.type === 'user' ? 0 : 10}
                      borderBottomRightRadius={10}
                      borderTopLeftRadius={message.type === 'user' ? 10 : 0}
                      borderBottomLeftRadius={10}
                    >
                      <Text fontSize='14px'>{message.text}</Text>
                    </Box>
                    <Text fontSize='2xs' float={message.type === 'user' ? 'right' : 'left'}>
                      {message.hour}
                    </Text>
                  </Box>
                </Flex>
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
              style={{ width: '100%', display: 'flex' }}
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const message = formData.get('prompt') as string;

                setMessages((messages) =>
                  messages.concat({
                    id: String(Date.now()),
                    type: 'user',
                    text: message,
                    hour: new Date().getHours() + ':' + new Date().getMinutes(),
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

                setMessages((messages) =>
                  messages.concat({
                    ...data,
                    hour: new Date().getHours() + ':' + new Date().getMinutes(),
                  })
                );
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
              </InputGroup>
              <IconButton
                type='submit'
                aria-label='ChatGpt'
                bg={bgColor}
                color={color}
                colorScheme='white'
                onClick={onOpen}
                icon={<FiSend />}
              />
            </Form>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Chat;
