import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { useState } from "react";
import { Creategame } from "./Creategame";

function App() {
  const [ gameMessage, setGameMessage ] = useState<string>("");

  const handleGameCreated = (message: string) => {
    setGameMessage(message);
  };
  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>dApp Starter Template</Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
        <Container>
          <div>
            <h1>Sic Bo Game</h1>
            <Creategame onCreated={handleGameCreated}/>
            {gameMessage && (
                <div>
                    <h2>Game Result</h2>
                    <p>{gameMessage}</p>
                </div>
            )}
          </div>
        </Container>
    </>
  );
}

export default App;
