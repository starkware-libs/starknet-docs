# Contract Classes

Taking inspiration from object-oriented programming, we distinguish between a contract and its implementation by separating contracts into classes and instances. A contract class is the definition of the contract: its Cairo byte code, hint information, entry point names, and everything needed to define its semantics unambiguously. Each class is identified by its class hash (analogous to a class name from OOP languages). A contract instance, or simply a contract, is a deployed contract corresponding to some class. Note that only contract instances behave as contracts, i.e., have their own storage and are callable by transactions/other contracts. A contract class does not necessarily have a deployed instance in StarkNet.

## Using Classes

New classes can be added to the state of StarkNet with the [`declare`](../Blocks/transactions#declare-transaction) transaction. New instances of a previously declared class may be deployed via the `deploy` system call. Finally, to use the functionality of a declared class, without deploying an instance of that class, we can use the `library_call` system call, which is an analogue of Ethereum's delegate call in the world of classes (instead of having a dummy contract deployed, which is used only for its code, we can use a class code directly).
