## Install Virtualbox and Vagrant

Wrote a small GPT for this - These docs are the authority, but this can help.
https://chatgpt.com/g/g-QiaMnK6e4-node-soa-v2

#### `$ vagrant up`


That should be enough for you to start poking around.

Want to see it work?

Try sending some raw JSON to: `localhost:8800/auth`

```JSON
{
  "username":"donsky@email.mail",
  "password":"Abcd1234"
}
```

You should get a response:
```javascript
{
  "token": /[A-Za-z0-9]+\.[A-Za-z0-9]+\.[A-Za-z0-9]+/
}
```
