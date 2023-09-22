type ConfigValidationResponse =
    | { status: 'success' }
    | { status: 'error'; errors: Error };

type T = any;

type GetServerConvar = {
    type: string,
    default_: T
}
