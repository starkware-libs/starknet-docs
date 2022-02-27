# StarkNet Events

A contract may emit events throughout its execution. Each event contains the following fields:

- `from_address`: address of the contract emitting the events
- `keys`: a list of field elements
- `data`: a list of field elements

The keys can be used for indexing the events, while the data may contain any information that we wish to log (note that we are dealing with two separate lists of possibly varying size, rather than a list of key-value pairs).

## Emitting events

Events can be defined in a contract using the `@event` decorator. Once an event $E$ has been defined, the compiler automatically adds the function `E.emit()`. The following example illustrates how an event is defined and then emitted:

```js
@event
func message_received(a : felt, b: felt):
end
```

```js
message_received.emit(1, 2);
```

The emit function emits an event with a single key, which is an identifier of the event, given by $\text{sn\_keccak(event\_name)}$, where $\text{event\_name}$ is the ASCII encoding of the event’s name and $\text{sn\_keccak}$ is defined [here](../Hashing/hash-functions#starknet-keccak). To emit custom keys, one should use the low level `emit_event` [system call](https://github.com/starkware-libs/cairo-lang/blob/ed6cf8d6cec50a6ad95fa36d1eb4a7f48538019e/src/starkware/starknet/common/syscalls.cairo#L301), which takes an array of keys and an array of data as input.

Note that the emit function may take structs or arrays (with an adjacent parameter indicating the array’s length) as arguments, which will be flattened into a single array of felts.

The emitted events are part of the [transaction receipt](../Blocks/transaction-life-cycle#transaction-receipt).

## Event ABI

The event definition appears in the contract’s ABI. It contains the list of data fields (name and type) and the list of the custom keys (that is, all keys except the event identifier discussed above). Below is an example of an event inside the ABI:

```json
{
  "data": [
    {
      "name": "a",
      "type": "felt"
    },
    {
      "name": "b",
      "type": "felt"
    }
  ],
  "keys": [],
  "name": "message_received",
  "type": "event"
}
```

## Event hash

The event hash is given by:

$$
h(h(h(h(0,\text{from\_address}),\text{keys\_hash}),\text{data\_hash}),3)
$$

Where:

- $\text{keys\_hash}$, $\text{data\_hash}$ are the hashes of the keys list and data list correspondingly (see [array hashing](../Hashing/hash-functions#array-hashing)).
- $h$ is the [pedersen](../Hashing/hash-functions#pedersen-hash) hash function

The event hashes are eventually included in the [event_commitment](../Blocks/header#event_commitment) field of a block.
