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