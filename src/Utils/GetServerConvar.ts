export const GetServerConvar = async ({ type, default_ }: GetServerConvar): Promise<T> => {
    const result = GetConvar(type, String(default_));
    return (String(default_) === result) ? default_ : result
};
