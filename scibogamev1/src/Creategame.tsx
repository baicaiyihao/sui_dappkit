import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { SICBOGAME_PACKAGE_ID } from "./constants.ts";

export function Creategame({ onCreated }: { onCreated: (id: string) => void }) {
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
  const currentAccount = useCurrentAccount();
  const client = useSuiClient();

  const executeMoveCall = async (method: "small" | "large") => {
    if (!currentAccount?.address) {
      console.error("No connected account found.");
      return;
    }

    try {
      const tx = new Transaction();

      tx.moveCall({
        arguments: [tx.pure.u64(method === "small" ? 0 : 1)],
        target: `${SICBOGAME_PACKAGE_ID}::sicbogame::create_game`,
      });

      const txResult = await signAndExecute({
        transaction: tx,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const eventsResult = await client.queryEvents({
        query: { Transaction: txResult.digest },
      });

      if (eventsResult.data.length > 0) {
        const firstEvent = eventsResult.data[0]?.parsedJson as { msg?: string };
        const result = firstEvent?.msg || "No events found for the given criteria.";
        onCreated(result);
      } else {
        onCreated("No events found for the given criteria.");
      }
    } catch (error) {
      console.error("Error creating game or querying events:", error);
    }
  };

  return (
    <>
      <Heading size="3">Game Start</Heading>
      <Flex direction="column" gap="2">
        <Flex direction="row" gap="2">
          <Button onClick={() => executeMoveCall("small")}>small</Button>
          <Button onClick={() => executeMoveCall("large")}>large</Button>
        </Flex>
      </Flex>
    </>
  );
}

