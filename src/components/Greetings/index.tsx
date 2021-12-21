import { Button, Text, Flex, Image } from '@chakra-ui/react'

export function Greetings () {
  function handleSayHello () {
    window.Main.sendMessage('Hello World')

    console.log('Message sent! Check main process log in terminal.')
  }

  return (
    <Flex w="full" h="100vh" align="center" justify="center" direction="column">
      <Image
        src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
        alt="ReactJS logo"
      />
      <Text>An Electron boilerplate including TypeScript, React, Jest and ESLint.</Text>
      <Button onClick={handleSayHello}>Send message to main process</Button>
    </Flex>
  )
}
