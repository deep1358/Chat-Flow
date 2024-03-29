# Chat flow app

This chat flow app let's you create flow of chats. Like in which order chat will proceed.

To run this app hit below commands:

```shell
npm install

npm start
```

## This app containes below features:

1. Create chat flow by dragging chat nodes from message panel.
2. Write your chat messages in the chat node.
3. Connect any two node by connecting source and target handle of those nodes.
4. Change label of any node by clicking on that node, and changing label from textarea.
5. Save current flow into the localstorage.

#### Constraints

1. Can only have one edge originating from a source handle
2. Save button press will show an error if there are more than one Nodes and more than one Node has empty target handles
