import {
    useSignAndExecuteTransactionBlock,
    useSuiClient,
  } from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { SICBOGAME_PACKAGE_ID } from "./constants";  
  
export function Creategame({ 
    onCreated,
}:{
    onCreated: (id: string) => void;
 }) {
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
    const client = useSuiClient();

    const executeMoveCall = (method: "small" | "large") => {
        const txb = new TransactionBlock();

        if (method === "small") {
        txb.moveCall({
            arguments: [txb.pure.u64(0)],
            target: `${SICBOGAME_PACKAGE_ID}::sicbogame::create_game`,
        });
        } else {
        txb.moveCall({
            arguments: [txb.pure.u64(1)],
            target: `${SICBOGAME_PACKAGE_ID}::sicbogame::create_game`,
        });
        }

        signAndExecute(
        {
            transactionBlock: txb,
            options: {
            showEffects: true,
            showObjectChanges: true,
            },
        },
        {
            onSuccess: (tx) => {
                client.subscribeEvent({
                    filter:{Sender:"0x772b31a5738f0ceb70d313c7f1361bb1a9fa9732f9f1c9255cb191a592cbf988"},onMessage(event) {
                        onCreated("tx")
                    }
                });

                    
                // client.
                //     queryEvents({
                //         query:{Transaction:tx.digest}
                //     }).then(PaginatedEvents=> {
                //         const events = JSON.stringify(PaginatedEvents.data[0].parsedJson);
                //         const result = JSON.parse(events)['msg'];
                    
                //         if (result.length > 0) {
                //           onCreated(result)
                //         } else {
                //           onCreated('No events found for the given criteria.');
                //         }
                //       })
                //       .catch(error => { 
                //         console.error('Error querying events:', error);
                //       });
            },
        },
        );
    };

    

    return (
        <>
        <Heading size="3">Game Start</Heading>

        <Flex direction="column" gap="2">
            <Flex direction="row" gap="2">
            <Button onClick={() => executeMoveCall("small")}>
                猜小
            </Button>
            <Button onClick={() => executeMoveCall("large")}>
                猜大
            </Button>
            </Flex>
        </Flex>
        </>
    );
}
