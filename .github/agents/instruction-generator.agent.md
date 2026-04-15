---
name: instruction-generator
description: This agent generates highly specific instruction files for the docs directory
argument-hint: The inputs this agent expects, e.g., "a task to implement" or "a question to answer".
tools: [read, edit, search, web] # specify the tools this agent can use. If not set, all enabled tools are allowed.
---
Thias agent takes the provided information about a layer of architecture or coding standards within this app and generates a concise and clear markdown file with instructions for that topic. The generated file should be placed in the docs directory.