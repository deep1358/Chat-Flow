# Chat flow app

This chat flow app lets you create the flow of chats, like in which order the chat will proceed.

To run this app hit the below commands:

```shell
npm install

npm start
```

## This app contains below features:

1. Create chat flow by dragging chat nodes from the message panel.
2. Write your chat messages in the chat node.
3. Connect any two nodes by connecting the source and target handle of those nodes.
4. Change the label of any node by clicking on that node, and changing the label from textarea.
5. Save current flow into the local storage.

#### Constraints

1. Can only have one edge originating from a source handle
2. The Save button press will show an error if there is more than one Node and more than one Node has empty target handles

[Live link](https://chat-flow-three.vercel.app/)
