# rest_api

A [FiveM](https://fivem.net/) remote api to control trigger events.

## Configs

- Resource configuration is handled using cfx [convars](https://docs.fivem.net/docs/scripting-reference/convars/).
- Example event register script [Aik-10/gists](https://gist.github.com/Aik-10/6d03fc5ad0003c1bbd7d58c55a1e779e).

```cfg
set api:accessToken "change_me" # Authentication string
set api:logLevel "error" # 'debug' | 'info' | 'warn' | 'error'
set api:enableCors "true"
set api:port "4290"
```

## Usage

#### Custom event Register / Trigger
<details>
 <summary><code>POST</code> <code><b>/EventHandler/{event}/{source}</b></code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | event     |  required | string   | N/A  |
> | source    |  optional | string   | N/A  |
> | GET arg   |  optional | string|string[]   | N/A  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                  | `Registered event return values`                                |
> | `400`         | `application/json`                | `{"code":"400","status": "error","message":"Bad Request"}`      |
> | `401`         | `application/json`                | `{"code":"401","status": "error","message":"Unauthorized user"}`|
> | `404`         | `application/json`         | `{"code":"404","status": "error","message":"Exception message"` |

##### Example cURL

> ```curl
>  curl --location 'http://127.0.0.1:4290/EventHandler/test_with_args/10?arg=1' \ --header 'x-access-key: change_me'
> ```

> ```lua
> exports.rest_api:RegisterRestApiEvent( 'test_with_args', function(source, a, b) 
>    print("test_with_args", source,a,b);
>    return source,a,b
> end);
> ```
</details>

#### Run TriggerClientEvent
<details>
 <summary><code>POST</code> <code><b>/TriggerClientEvent/{event}/{source}</b></code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | event     |  required | string   | N/A  |
> | source    |  required | string   | N/A  |
> | GET arg    |  optional | string|string[]   | N/A  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                  | `TriggerClientEvent({event}, {source}) Triggered`        |
> | `400`         | `application/json`                | `{"code":"400","status": "error","message":"Bad Request"}`      |
> | `401`         | `application/json`                | `{"code":"401","status": "error","message":"Unauthorized user"}`|
> | `404`         | `application/json`         | `{"code":"404","status": "error","message":"Exception message"`    |

##### Example cURL

> ```curl
>  curl --location 'http://127.0.0.1:4290/TriggerClientEvent/trigger:client:test/10' \ --header 'x-access-key: change_me'
> ```
</details>

#### Run TriggerServerEvent
<details>
 <summary><code>POST</code> <code><b>/TriggerServerEvent/{event}/{source}</b></code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | event     |  required | string   | N/A  |
> | source    |  optional | string   | N/A  |
> | GET arg    |  optional | string|string[]   | N/A  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                  | `TriggerClientEvent({event}, {source}) Triggered`        |
> | `400`         | `application/json`                | `{"code":"400","status": "error","message":"Bad Request"}`      |
> | `401`         | `application/json`                | `{"code":"401","status": "error","message":"Unauthorized user"}`|
> | `404`         | `application/json`         | `{"code":"404","status": "error","message":"Exception message"`    |

##### Example cURL

> ```curl
>  curl --location 'http://127.0.0.1:4290/TriggerServerEvent/trigger:server:test' \ --header 'x-access-key: change_me'
> ```
</details>