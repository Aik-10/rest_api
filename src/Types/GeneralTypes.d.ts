type ConfigValidationResponse =
    | { status: 'success' }
    | { status: 'error'; errors: Array<string> };

type T = any;

type GetServerConvar = {
    type: string,
    default_: T
}
