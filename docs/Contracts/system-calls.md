# System Calls

## Introduction

StarkNet smart contracts are written in Cairo. However, Cairo is (among other things, see the [whitepaper](https://eprint.iacr.org/2021/1063.pdf) for more details) a general purpose language, not necessarily aimed at writing contract language. Thus, some additional capabilities are needed for operations that make sense in a smart contract context but not in a standalone program, e.g. calling another contract or accessing the contract's storage. To this end, we introduce system calls to our smart contract language. System calls are a way for the contract to require services from the StarkNet OS. Using these services, a function inside the contract can obtain information that would otherwise be inaccessible, as it depends on the broader state of StarkNet rather than local variables that appear in the function's scope.

## Supported System Calls

### SendMessageToL1

This system call requests the StarkNet OS to send a message to L1. This is including the messages parameters as part of the proof's output, making them visible to the StarkNet Core contract on L1 once the state update including the transaction is received. For more information, see StarkNet's [messaging mechanism](../L1-L2%20Communication/messaging-mechanism).

The system call expects the receipent address on L1 and the message payload, and can be raised by calling the following function available in [messages.cairo](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/common/messages.cairo):

```js title="send_message_to_l1"
func send_message_to_l1{syscall_ptr : felt*}(
    to_address : felt, payload_size : felt, payload : felt*
)
```
