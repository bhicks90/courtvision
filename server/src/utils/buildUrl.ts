// server/src/utils/buildUrl.ts
export const buildUrl = (
    base: string,
    path: string,
    params?: Record<string, string | number | (string | number)[]>,
): string => {
    const url = new URL(path, base);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v) => url.searchParams.append(key, v.toString()));
            } else {
                url.searchParams.append(key, value.toString());
            }
        });
    }

    return url.toString();
};
