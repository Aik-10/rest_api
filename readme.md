```lua
exports.pp_restapi:RegisterRestApiEvent( 'test_with_args', function(source, a,b) 
    print("test_with_args", source,a,b);
    return source,a,b
end);
```
```
@params test_with_args = test_with_args
@params source = 10
@params a = a
@params b = b
```

Example query with parameters

```curl
curl --location 'http://127.0.0.1:4290/EventHandler/test_with_args/10?arg=1' \
--header 'x-access-key: test'
```

- Header `x-access-key` = ACCESS_TOKEN_KEY


## secret.cfg
```cfg
set api:accessToken "test"
set api:logLevel "info"
set api:enableCors "true"
set api:port "4290"
```
